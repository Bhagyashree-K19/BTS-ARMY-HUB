import { createContext, useCallback, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";

export const AmyTalkContext = createContext();

// Old name. Your copied files import { AppContext }, so this keeps them working.
export const AppContext = AmyTalkContext;

const AmyTalkContextProvider = ({ children }) => {
  // The login now comes from ARMY HUB's AuthContext (not from this file).
  const { currentUser, authReady } = useAuth();
  const uid = currentUser?.uid;

  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [messagesId, setMessagesId] = useState(null); // id of the chat we opened
  const [messages, setMessages] = useState([]); // messages of that chat
  const [chatUser, setChatUser] = useState(null); // the friend we are chatting with
  const [chatVisible, setChatVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  // Loads this user's profile. If the documents are missing
  // (old accounts), it creates them first.
  const loadUserData = useCallback(async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      let userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const email = auth.currentUser?.email || "";
        await setDoc(userRef, {
          id: userId,
          username: email.split("@")[0].toLowerCase(),
          email,
          name: auth.currentUser?.displayName || "",
          nameLower: (auth.currentUser?.displayName || "").toLowerCase(),
          avatar: "",
          bio: "Hey, there i am using app",
          lastSeen: Date.now(),
        });
        userSnap = await getDoc(userRef);
      }

      const chatRef = doc(db, "chats", userId);
      const chatSnap = await getDoc(chatRef);
      if (!chatSnap.exists()) {
        await setDoc(chatRef, { chatsData: [] });
      }

      const profile = userSnap.data();
      const updates = { lastSeen: Date.now() };
      // Older profiles have no "nameLower" yet. Add it, so name search works.
      if (
        profile.name &&
        profile.nameLower !== profile.name.trim().toLowerCase()
      ) {
        updates.nameLower = profile.name.trim().toLowerCase();
      }
      setUserData({ ...profile, ...updates });
      await updateDoc(userRef, updates);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // When the login is ready, load the profile. On logout, clear everything.
  useEffect(() => {
    if (!authReady) return;
    if (uid) {
      loadUserData(uid);
    } else {
      setUserData(null);
      setChatData(null);
      setMessagesId(null);
      setMessages([]);
      setChatUser(null);
      setChatVisible(false);
      setProfileVisible(false);
    }
  }, [authReady, uid, loadUserData]);

  // Update "last seen" every minute. The cleanup stops the timer.
  useEffect(() => {
    if (!userData?.id) return;
    const userRef = doc(db, "users", userData.id);
    const timer = setInterval(() => {
      if (auth.currentUser) {
        updateDoc(userRef, { lastSeen: Date.now() }).catch(console.error);
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [userData?.id]);

  // Listen to my chats list (live updates).
  useEffect(() => {
    if (!userData?.id) return;
    let cancelled = false;
    const chatRef = doc(db, "chats", userData.id);

    const unSub = onSnapshot(chatRef, async (res) => {
      const chatItems = res.data()?.chatsData;
      if (!Array.isArray(chatItems)) {
        setChatData([]);
        return;
      }
      const tempData = [];
      for (const item of chatItems) {
        if (!item.rId) continue;
        const friendSnap = await getDoc(doc(db, "users", item.rId));
        tempData.push({ ...item, userData: friendSnap.data() });
      }
      if (!cancelled) {
        setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    });

    return () => {
      cancelled = true;
      unSub();
    };
  }, [userData?.id]);

   const logout = async () => {
    try {
      // Mark the user as offline BEFORE signing out.
      // After signOut, Firestore would refuse the write, so the order matters.
      if (userData?.id) {
        await updateDoc(doc(db, 'users', userData.id), {
          lastSeen: Date.now() - 100000, // 100 seconds ago = not online any more
        })
      }
    } catch (error) {
      console.error(error)
    }
    await signOut(auth)
  }

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    messages,
    setMessages,
    messagesId,
    setMessagesId,
    chatUser,
    setChatUser,
    chatVisible,
    setChatVisible,
    profileVisible,
    setProfileVisible,
    logout,
  };

  return (
    <AmyTalkContext.Provider value={value}>{children}</AmyTalkContext.Provider>
  );
};

export default AmyTalkContextProvider;
