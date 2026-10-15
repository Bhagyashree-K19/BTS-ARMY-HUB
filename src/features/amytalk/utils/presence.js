import { useEffect, useState } from 'react'

// A user is "online" if their lastSeen was updated in the last 90 seconds.
// (AmyTalk updates lastSeen every 60 seconds while it is open.)
const ONLINE_WINDOW_MS = 90000

export const isOnline = (lastSeen, now = Date.now()) =>
  Boolean(lastSeen) && now - lastSeen <= ONLINE_WINDOW_MS

// Text under the user's name: "Online" or "Last seen ..."
export const getStatusText = (lastSeen, now = Date.now()) => {
  if (isOnline(lastSeen, now)) return 'Online'
  if (!lastSeen) return 'Offline'
  const date = new Date(lastSeen)
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  if (date.toDateString() === new Date(now).toDateString()) {
    return `Last seen today at ${time}`
  }
  const day = date.toLocaleDateString([], { day: 'numeric', month: 'short' })
  return `Last seen ${day}`
}

// Gives the current time and updates it every 30 seconds, so "Online"
// can change to "Last seen ..." without reloading the page.
export const useNow = (intervalMs = 30000) => {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(timer)
  }, [intervalMs])
  return now
}