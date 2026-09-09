import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ref, onValue } from 'firebase/database'
import { database } from '../firebase.js'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/Button.jsx'
import Modal from '../components/Modal.jsx'
import PlaceholderCover from '../components/PlaceholderCover.jsx'

function Profile() {
  const { isLoggedIn, currentUser, logout } = useAuth()
  const [comments, setComments] = useState([])
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const navigate = useNavigate()

  // Same live subscription as Community.jsx -- this page just filters
  // the shared list down to the current user's own comments.
  useEffect(() => {
    const commentsRef = ref(database, 'comments')
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val() || {}
      const commentList = Object.entries(data).map(([id, comment]) => ({
        id,
        ...comment,
      }))
      setComments(commentList)
    })
    return unsubscribe
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="page-shell">
        <div className="text-center py-12">
          <h1 className="page-title">You're not logged in</h1>
          <p className="page-subtitle">Log in to see your profile and activity.</p>
          <NavLink to="/login">
            <Button variant="primary">Go to Login</Button>
          </NavLink>
        </div>
      </div>
    )
  }

  const displayName = currentUser.displayName || currentUser.email
  const myComments = comments.filter((c) => c.authorUid === currentUser.uid)

  const confirmLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="page-shell">
      <div className="flex flex-col text-center sm:flex-row sm:text-left items-center gap-6 bg-surface border border-border rounded-lg p-8">
        <PlaceholderCover
          label={displayName}
          color="#7c3aed"
          shape="circle"
          sizeClassName="w-[100px] h-[100px]"
        />
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="mb-1">{displayName}</h1>
          <p className="text-muted text-[1.05rem] mb-4">{currentUser.email}</p>
          <div className="bg-surface-alt border border-border rounded-md p-1.5 inline-block">
            <Button variant="danger" onClick={() => setShowLogoutConfirm(true)}>Logout</Button>
          </div>
        </div>
      </div>

      <h2 className="page-title mt-10">Your Community Activity</h2>
      {myComments.length === 0 ? (
        <p>You haven't posted any comments yet. Head over to the Community page!</p>
      ) : (
        <ul className="list-none flex flex-col gap-4 max-w-[600px]">
          {myComments.map((comment) => (
            <li key={comment.id} className="bg-surface border border-border rounded-md p-4">
              <div className="flex justify-between text-sm text-muted mb-1">
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={showLogoutConfirm}
        title="Log out?"
        message="You'll need to log in again to post comments or replies."
        confirmLabel="Logout"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  )
}

export default Profile