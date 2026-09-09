import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '../firebase.js'

// -----------------------------------------------------------------------
// This uses real Firebase Authentication: accounts are stored on
// Firebase's servers (not this browser), so the same login works from
// any device. Passwords are never visible to us -- Firebase handles
// hashing/storage entirely.
// -----------------------------------------------------------------------

const AuthContext = createContext(null)

// Firebase throws errors like "Firebase: Error (auth/email-already-in-use)."
// This translates the common ones into messages a user can actually read.
function getAuthErrorMessage(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  // Firebase takes a moment on page load to check for an existing session
  // (e.g. after a refresh). `authReady` flips to true once that first
  // check completes, so we can avoid flashing a "logged out" UI first.
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    // onAuthStateChanged fires immediately with the current user (or
    // null), then again automatically whenever login/logout happens.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setAuthReady(true)
    })
    return unsubscribe
  }, [])

  const register = async ({ name, email, password }) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      // Firebase accounts don't have a "name" field by default, so we set
      // it as a separate step right after creating the account.
      await updateProfile(credential.user, { displayName: name })
      // updateProfile() doesn't update our already-fetched `user` object,
      // so we merge the name into our own state manually.
      setCurrentUser({ ...credential.user, displayName: name })
      return { success: true }
    } catch (error) {
      return { success: false, message: getAuthErrorMessage(error) }
    }
  }

  const login = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (error) {
      return { success: false, message: getAuthErrorMessage(error) }
    }
  }

  const logout = () => signOut(auth)

  // Sends a "reset your password" email via Firebase. Firebase handles
  // the entire flow after this -- the email, the secure link, and the
  // page where the user actually types a new password.
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (error) {
      return { success: false, message: getAuthErrorMessage(error) }
    }
  }

  const value = {
    currentUser,
    isLoggedIn: Boolean(currentUser),
    authReady,
    register,
    login,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}