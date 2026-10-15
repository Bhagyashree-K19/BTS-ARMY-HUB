import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AmyTalkContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { uploadImage } from "../../utils/uploadImage";
import { isOnline, getStatusText, useNow } from "../../utils/presence";
import { toast } from "react-toastify";

const ChatBox = () => {
  const {
    userData,
    messagesId,
    chatUser,
    setChatUser,
    messages,
    setMessages,
    setChatVisible,
    setProfileVisible,
  } = useContext(AppContext);
  const [input, setInput] = useState("");
  const now = useNow(); // refreshes every 30 seconds for the online status

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });

        const userIDs = [chatUser.rId, userData.id];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId,
            );
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
    setInput("");
  };

  const sendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const fileUrl = await uploadImage(file);

      if (fileUrl && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: new Date(),
          }),
        });

        const userIDs = [chatUser.rId, userData.id];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId,
            );
            userChatData.chatsData[chatIndex].lastMessage = "Image";
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
    e.target.value = "";
  };

  const convertTimestamp = (timestamp) => {
    let date = timestamp.toDate();
    let hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, "0");
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return hour + ":" + minute + " " + period;
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  // Watch the friend's profile live, so "Online" and "Last seen" stay fresh.
  useEffect(() => {
    if (!chatUser?.rId) return;
    const unSub = onSnapshot(doc(db, "users", chatUser.rId), (snap) => {
      if (snap.exists()) {
        setChatUser((prev) =>
          prev ? { ...prev, userData: snap.data() } : prev,
        );
      }
    });
    return () => unSub();
  }, [chatUser?.rId]);

  const online = isOnline(chatUser?.userData?.lastSeen, now);

  return chatUser ? (
    <div className="bg-[#ececff] h-full min-h-0 flex flex-col">
      {/* Chat Box */}
      <div className="flex items-center gap-3 py-4 px-4 md:px-6 border-b border-gray-300">
        {/* Chat User */}
        <img
          onClick={() => setChatVisible(false)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden w-6 cursor-pointer"
        />
        {/* back button, mobile only */}
        <div
          onClick={() => setProfileVisible(true)}
          className="flex flex-1 min-w-0 items-center gap-3 cursor-pointer md:cursor-default"
        >
          {/* click area: photo + name + status */}
          <img
            src={chatUser.userData.avatar || assets.profile_img}
            alt=""
            className="w-10 aspect-square rounded-full object-cover"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-lg text-gray-800 font-medium leading-tight">
              {chatUser.userData.name || chatUser.userData.username}
              {online ? (
                <img src={assets.green_dot} alt="" className="w-2.5" />
              ) : null}
            </div>
            <div
              className={`text-xs ${online ? "text-green-600" : "text-gray-500"}`}
            >
              {getStatusText(chatUser.userData.lastSeen, now)}
            </div>
          </div>
        </div>
        <img
          src={assets.help_icon}
          alt=""
          className="w-5 cursor-pointer max-md:hidden"
        />
      </div>
      <div className="flex-1 min-h-0 overflow-y-scroll no-scrollbar px-3 md:px-6 py-4 flex flex-col-reverse gap-3">
        {/* Chat messages area */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sId === userData.id
                ? "flex items-end gap-1 max-w-[85%] self-end"
                : "flex items-end gap-1 max-w-[85%] self-start"
            }
          >
            {/* sender's message */}
            {msg["image"] ? (
              <img
                src={msg.image}
                alt=""
                className={`max-w-56 max-h-72 object-cover rounded-lg mb-8 ${msg.sId === userData.id ? "rounded-br-none" : "rounded-bl-none"}`}
              />
            ) : (
              <p
                className={`bg-violet-600 text-white p-3 rounded-lg text-sm mb-8 break-words ${msg.sId === userData.id ? "rounded-br-none" : "rounded-bl-none"}`}
              >
                {msg.text}
              </p>
            )}
            <div
              className={`flex flex-col items-center gap-1 shrink-0 mt-6 ${msg.sId === userData.id ? "" : "order-first"}`}
            >
              <img
                src={
                  (msg.sId === userData.id
                    ? userData.avatar
                    : chatUser.userData.avatar) || assets.profile_img
                }
                alt=""
                className="w-6 aspect-square rounded-full object-cover"
              />
              <p className="m-0 text-xs text-gray-500 whitespace-nowrap">
                {convertTimestamp(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 px-4 py-3 mx-3 md:mx-4 mb-3 md:mb-4 bg-white rounded-full border border-gray-600">
        {/* Chat Box input */}
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Send a message"
          className="flex-1 min-w-0 text-base md:text-sm text-gray-800 outline-none focus-visible:outline-none border-none bg-transparent placeholder-gray-600"
        />
        <input
          onChange={sendImage}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          hidden
        />
        <label htmlFor="image">
          <img
            src={assets.gallery_icon}
            alt=""
            className="w-6 cursor-pointer"
          />
        </label>
        <img
          onClick={sendMessage}
          src={assets.send_button}
          alt=""
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="bg-gradient-to-b from-violet-600 to-purple-800 h-full min-h-0 flex flex-col items-center justify-center gap-3 max-md:hidden">
      <img src={assets.logo_icon} alt="" className="w-16" />
      <p className="m-0 text-xl font-medium text-gray-100">
        Talk to your beloved ones circle 💟
      </p>
    </div>
  );
};

export default ChatBox;