import React, { useContext, useEffect, useState } from 'react'
import assets from '../../assets/assets'
import { db } from '../../../../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../../context/AmyTalkContext'
import { uploadImage } from '../../utils/uploadImage'

const ProfileUpdate = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [prevImage, setPrevImage] = useState('')
  // userData comes from the context (the login is handled by ARMY HUB).
  const { userData, setUserData } = useContext(AppContext)
  const uid = userData?.id

  const profileUpdate = async (event) => {
    event.preventDefault()
    try {
      if (!prevImage && !image) {
        return toast.error('Upload profile picture')
      }
      const docRef = doc(db, 'users', uid)
      if (image) {
        // the user selected a new image: upload it to Cloudinary first
        const imgUrl = await uploadImage(image)
        setPrevImage(imgUrl)
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: bio,
          name: name.trim(),
          nameLower: name.trim().toLowerCase(), // used by the search by name
        })
      } else {
        // no new image: update only the name and bio
        await updateDoc(docRef, {
          bio: bio,
          name: name.trim(),
          nameLower: name.trim().toLowerCase(),
        })
      }
      const snap = await getDoc(docRef)
      setUserData(snap.data())
      navigate('/amytalk')
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  // Fill the form once, when the profile is loaded.
  useEffect(() => {
    if (!userData) return
    setName(userData.name || '')
    setBio(userData.bio || '')
    setPrevImage(userData.avatar || '')
  }, [userData?.id])

  // All hooks are above this line, so this early return is safe.
  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-purple-900 via-violet-900 to-purple-900 flex items-center justify-center p-4'>   {/* profile */}

      <div className='bg-violet-100 text-gray-600 w-full max-w-3xl flex items-center justify-between rounded-lg shadow-2xl max-sm:flex-col-reverse'>  {/* profile details*/}

        <form onSubmit={profileUpdate} className='flex flex-col gap-5 p-10 flex-1 w-full'>
          <h3 className='m-0 text-2xl font-semibold text-gray-800'>Profile Details</h3>

          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt=""
              className='w-14 h-14 rounded-full object-cover shrink-0'
            />
            upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder='Your name'
            required
            className='p-3 placeholder:text-gray-500 border border-gray-500 rounded-md outline-none focus:border-violet-500'
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder='Write profile bio'
            rows={2}
            className='p-3 placeholder:text-gray-500 border border-gray-500 rounded-md outline-none resize-none focus:border-violet-500'
          ></textarea>

          <button
            type="submit"
            className='bg-gradient-to-r from-purple-500 to-violet-600 text-white py-3 rounded-md text-lg cursor-pointer hover:opacity-90'
          >
            Save
          </button>
        </form>

        <img
          src={image ? URL.createObjectURL(image) : prevImage ? prevImage : assets.logo_icon}
          alt=""
          className='w-40 h-40 rounded-full object-cover shrink-0 mx-10 max-sm:mt-10 shadow-md'
        />
      </div>
    </div>
  )
}

export default ProfileUpdate