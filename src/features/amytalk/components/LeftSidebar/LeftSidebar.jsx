import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { AppContext } from "../../context/AmyTalkContext";
import { toast } from "react-toastify";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const {
    userData,
    chatData,
    chatUser,
    setChatUser,
    setMessagesId,
    messagesId,
    setChatVisible,
    setProfileVisible,
    logout,
  } = useContext(AppContext);
  const [foundUsers, setFoundUsers] = useState([]); // people that match the search
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const timer = useRef(null); // timer holds the id of the running timeout. Changing it does not re-render the page

  const inputHandler = async (e) => {
    try {
      // what the user typed: no extra spaces, lowercase
      // (every profile has a "nameLower" field, the name in lowercase)
      const input = e.target.value.trim().toLowerCase();

      if (input) {
        // find names that START with the typed text
        // ">= input" and "<= input + \uf8ff" together mean "starts with input"
        const q = query(
          collection(db, "users"),
          where("nameLower", ">=", input),
          where("nameLower", "<=", input + "\uf8ff"),
        );

        const querySnap = await getDocs(q);
        const results = querySnap.docs.map((d) => d.data());

        // leave out myself and anyone I already chat with, show at most 5
               // leave out only myself, show at most 5.
        // People I already chat with stay in the list: clicking them opens that chat.
        const found = results.filter((u) => u.id !== userData.id).slice(0, 5);

        setFoundUsers(found);
        setShowSearch(true);
      } else {
        setShowSearch(false);
        setFoundUsers([]);
      }
    } catch (error) {
      // show any error in the console instead of hiding it
      console.error(error);
    }
  };

  const handleChange = (e) => {
    clearTimeout(timer.current); // cancel the previous timer, so only the last keystroke counts
    timer.current = setTimeout(() => inputHandler(e), 1000); // start a new timer: after 1000ms of no typing, run the search
  };

  // start a chat with the person the user clicked in the search results
  const addChat = async (friend) => {
    if (!friend) return;

    // already chatting with this person, do nothing
    if ((chatData || []).some((c) => c.rId === friend.id)) return;

    // hide the search results right away so they can't be clicked twice
    setShowSearch(false);
    setFoundUsers([]);

    const messagesRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");
    try {
      const newMessageRef = doc(messagesRef);

      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(chatsRef, friend.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });

      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: friend.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });
      const uSnap = await getDoc(doc(db, "users", friend.id));
      const uData = uSnap.data();
      setChat({
        messageId: newMessageRef.id,
        lastMessage: "",
        rId: friend.id,
        updatedAt: Date.now(),
        messageSeen: true,
        userData: uData,
      });
      setShowSearch(false);
      setChatVisible(true);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  // open a chat and mark it as seen
  const setChat = async (item) => {
    setMessagesId(item.messageId);
    setChatUser(item);
    setChatVisible(true); // open the chat screen right away on mobile
    setProfileVisible(false); // close the profile panel when another chat is opened

    try {
      const userChatsRef = doc(db, "chats", userData.id);
      const snap = await getDoc(userChatsRef);
      const data = snap.data();
      const i = data.chatsData.findIndex((c) => c.messageId === item.messageId);
      if (i !== -1 && !data.chatsData[i].messageSeen) {
        data.chatsData[i].messageSeen = true;
        await updateDoc(userChatsRef, { chatsData: data.chatsData });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const updateChatUserData = async () => {
      if (chatUser) {
        const userRef = doc(db, "users", chatUser.rId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        setChatUser((prev) => ({ ...prev, userData: userData }));
      }
    };
    updateChatUserData();
  }, [chatData]);

  return (
    <div className="bg-[#1a0a2e] h-full min-h-0 p-5 text-white flex flex-col">
      {/* Left sidebar */}
      <div className="pb-5">
        {/* Left sidebar top*/}
        <div className="flex justify-between items-center">
          {/* Left sidebar navbar */}
          <div className="flex items-center gap-2">
            <img src={assets.logo_icon} alt="" className="w-12" />
            <p className="m-0 text-xl font-bold text-white tracking-wide">
              AmyTalk
            </p>
          </div>
          <div className="relative py-2 group">
            {/* Left sidebar menu*/}
            <img
              onClick={() => setMenuOpen((prev) => !prev)}
              src={assets.menu_icon}
              alt=""
              className="max-h-5 cursor-pointer"
            />
            <div
              className={`absolute top-full right-0 z-20 w-44 bg-[#282142] rounded-md shadow-lg hidden md:group-hover:block ${menuOpen ? "max-md:block" : ""}`}
            >
              {/* Left sidebar menu options*/}
              <p
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/community");
                }}
                className="m-0 text-white px-4 py-2 text-sm hover:bg-[#3a2d5c] cursor-pointer rounded-t-md"
              >
                Back to ARMY HUB
              </p>
              <hr className="border-gray-600" />
              <p
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/amytalk/profile");
                }}
                className="m-0 text-white px-4 py-2 text-sm hover:bg-[#3a2d5c] cursor-pointer"
              >
                Edit profile
              </p>
              <hr className="border-gray-600" />
              <p
                onClick={() => logout()}
                className="m-0 text-white px-4 py-2 text-sm hover:bg-[#3a2d5c] cursor-pointer rounded-b-md"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          {/* Left sidebar search*/}
          <img src={assets.search_icon} alt="" className="w-3" />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Search by name..."
            className="bg-transparent border-none outline-none focus-visible:outline-none text-white text-base md:text-sm placeholder-[#c8c8c8] flex-1 min-w-0"
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-scroll no-scrollbar flex flex-col">
        {showSearch ? (
          foundUsers.length > 0 ? (
            foundUsers.map((u) => (
              <div
                key={u.id}
                onClick={() => addChat(u)}
                className="flex items-center gap-3 p-2 pl-4 rounded cursor-pointer max-sm:text-sm hover:bg-[#282142]/50"
              >
                {/* Left sidebar search result*/}
                <img
                  src={u.avatar || assets.profile_img}
                  alt=""
                  className="w-10 aspect-square rounded-full object-cover"
                />
                <p className="m-0 text-base font-medium text-white">
                  {u.name || u.username}
                </p>
              </div>
            ))
          ) : (
            <p className="m-0 px-4 py-2 text-sm text-gray-400">
              No users found
            </p>
          )
        ) : (
          (chatData || []).map((item, index) => (
            <div
              onClick={() => setChat(item)}
              key={index}
              className={`flex items-center gap-3 p-2 pl-4 rounded cursor-pointer max-sm:text-sm hover:bg-[#282142]/50 border-l-4 ${item.messageSeen || item.messageId === messagesId ? "border-transparent" : "bg-blue-500/5 border-blue-300"}`}
            >
              {/* Left sidebar friends*/}
              <img
                src={item.userData?.avatar || assets.profile_img}
                alt=""
                className="w-10 aspect-square rounded-full object-cover"
              />
              <div>
                <p className="m-0 text-base font-medium text-white">
                  {item.userData?.name || item.userData?.username}
                </p>
                <span
                  className={`text-sm ${item.messageSeen || item.messageId === messagesId ? "text-[#c8c8c8]" : "text-blue-300 font-semibold"}`}
                >
                  {item.lastMessage}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;