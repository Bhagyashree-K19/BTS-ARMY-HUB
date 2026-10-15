import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PlayerBar from './components/PlayerBar.jsx'
import { PlayerProvider, usePlayer } from './context/PlayerContext.jsx'
import AmyTalkRoutes from './features/amytalk/AmyTalkRoutes.jsx' // NEW

import Home from './pages/Home.jsx'
import Members from './pages/Members.jsx'
import MemberDetail from './pages/MemberDetail.jsx'
import Albums from './pages/Albums.jsx'
import AlbumDetail from './pages/AlbumDetail.jsx'
import Songs from './pages/Songs.jsx'
import Search from './pages/Search.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Community from './pages/Community.jsx'
import Profile from './pages/Profile.jsx'
import Favorites from './pages/Favorites.jsx'
import NotFound from './pages/NotFound.jsx'

// Split out so it can live *inside* PlayerProvider and safely call
// usePlayer() -- App() itself renders the provider, so it can't consume it.
function AppLayout() {
  const { currentSong } = usePlayer()

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* pb-20 only applied when a song is actually loaded */}
      <div className={`flex flex-col min-h-screen min-[861px]:ml-60 ${currentSong ? 'pb-20' : ''}`}>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/members/:memberId" element={<MemberDetail />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:albumId" element={<AlbumDetail />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <div id="yt-hidden-player" style={{ display: 'none' }} />

      <PlayerBar />
    </div>
  )
}

function App() {
  return (
    <>
      <ToastContainer /> {/* NEW: shows AmyTalk's messages */}
      <Routes>
        {/* NEW: AmyTalk is full screen, outside the sidebar layout */}
        <Route path="/amytalk/*" element={<AmyTalkRoutes />} />
        {/* Everything else works exactly as before */}
        <Route
          path="/*"
          element={
            <PlayerProvider>
              <AppLayout />
            </PlayerProvider>
          }
        />
      </Routes>
    </>
  )
}

export default App