import React, { useContext, useEffect, useState } from 'react'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AmyTalkContext'
import { isOnline, getStatusText, useNow } from '../../utils/presence'

const RightSidebar = () => {

  const {chatUser, messages, logout} = useContext(AppContext);
  const [msgImages, setMsgImages] = useState([])
  const now = useNow() // refreshes every 30 seconds for the online status

  useEffect(()=>{
     let tempVar = []
     messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image)
      }
     })
     setMsgImages(tempVar);
     
  },[messages])

  const online = isOnline(chatUser?.userData?.lastSeen, now)

  return chatUser ? (
    <div className='bg-[#1a0a2e] h-full min-h-0 text-gray-800 flex flex-col'> {/* Right Sidebar*/}

       <div className='flex flex-col items-center gap-2 pt-10 pb-5 px-4'>  {/* Right Sidebar Profile */}
          <img src={chatUser.userData.avatar || assets.profile_img} alt="" className='w-20 aspect-square rounded-full object-cover' />
          <h3 className='m-0 text-white flex items-center gap-2 text-lg font-medium'>
            {online ? <img src={assets.green_dot} alt="" className='w-2.5' /> : null}
            {chatUser.userData.name || chatUser.userData.username}
          </h3>
          <div className={`text-xs ${online ? 'text-green-400' : 'text-gray-400'}`}>
            {getStatusText(chatUser.userData.lastSeen, now)}
          </div>
          <p className='m-0 text-sm text-gray-100 text-center'>{chatUser.userData.bio}</p>
       </div>

       <hr className='border-gray-300 mx-4' />

       <div className='flex-1 min-h-0 overflow-y-scroll no-scrollbar px-4 py-5'>   {/* Right Sidebar media*/}
          <p className='text-white text-sm font-medium mb-3'>Media</p>
          <div className='grid grid-cols-3 gap-2'>
            {msgImages.map((url,index) => (<img onClick={()=>window.open(url)} key={index} src={url} className='rounded-md cursor-pointer aspect-square object-cover'/>))}
          </div>
       </div>

       <button onClick={()=>logout()} className='bg-violet-600 text-white mx-4 mb-5 py-2.5 rounded-full text-sm hover:opacity-90 cursor-pointer'>
         Logout
       </button>

    </div>
  )
  : (
    <div className='bg-[#1a0a2e] h-full min-h-0 flex flex-col'>
      <button onClick={()=>logout()} className='mt-auto mx-4 mb-5 bg-gradient-to-r from-purple-500 to-violet-600 text-white py-2.5 rounded-full text-sm font-medium shadow-md hover:opacity-90 active:scale-95 transition cursor-pointer'>Logout</button>
    </div>
  )
}

export default RightSidebar