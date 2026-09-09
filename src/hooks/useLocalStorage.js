import { useState, useEffect } from 'react'

// A reusable hook that behaves like useState, but automatically
// reads/writes its value to localStorage under the given key.
// Why: several features (theme, logged-in user, comments) need to
// "remember" data between page refreshes. Instead of repeating the
// localStorage.getItem/setItem logic everywhere, we write it once here.
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
