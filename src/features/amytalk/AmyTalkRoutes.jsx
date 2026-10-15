import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AmyTalkContextProvider from './context/AmyTalkContext'
import Chat from './pages/Chat/Chat'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'

const AmyTalkRoutes = () => {
  const { isLoggedIn, authReady } = useAuth()

  // Firebase is still checking if you are logged in. Wait, do not redirect yet.
  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  // Not logged in: go to the login page.
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="amytalk-scope">
      <AmyTalkContextProvider>
        <Routes>
          <Route index element={<Chat />} />
          <Route path="profile" element={<ProfileUpdate />} />
          <Route path="*" element={<Navigate to="/amytalk" replace />} />
        </Routes>
      </AmyTalkContextProvider>
    </div>
  )
}

export default AmyTalkRoutes