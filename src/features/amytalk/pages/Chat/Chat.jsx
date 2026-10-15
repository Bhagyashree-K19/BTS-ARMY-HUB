import React, { useContext, useEffect, useState } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import ChatBox from "../../components/ChatBox/ChatBox";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { AppContext } from "../../context/AmyTalkContext";

const Chat = () => {
  const { chatData, userData, chatVisible, profileVisible, setProfileVisible } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      if (chatData && userData) {
        setLoading(false)
      }
  },[chatData,userData])

  return (
    <div className="bg-linear-to-r from-purple-900 via-violet-900 to-purple-900 w-full h-dvh flex items-center justify-center">
      <div className="h-full w-full md:h-[80%] md:w-[90%] max-w-7xl grid grid-cols-1 md:grid-cols-[1.3fr_2fr_1.3fr] overflow-hidden shadow-2xl">
        {loading ? (
          <p className="text-3xl text-white col-span-full m-auto">Loading...</p>
        ) : (
          <>
            {/* mobile: show only the chat list OR the chat, never both */}
            <div className={`h-full min-h-0 ${chatVisible ? "max-md:hidden" : ""}`}>
              <LeftSidebar />
            </div>
            <div className={`h-full min-h-0 ${chatVisible ? "" : "max-md:hidden"}`}>
              <ChatBox />
            </div>

            {/* right sidebar: a normal column on desktop, a full-screen panel on mobile when opened */}
            <div className={`h-full min-h-0 ${profileVisible ? "max-md:fixed max-md:inset-0 max-md:z-30" : "max-md:hidden"}`}>
              <button
                onClick={() => setProfileVisible(false)}
                className="md:hidden absolute top-3 right-3 z-40 text-white text-2xl cursor-pointer"
              >
                ✕
              </button>
              <RightSidebar />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;