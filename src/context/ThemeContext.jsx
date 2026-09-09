import { createContext, useContext, useEffect } from 'react'

// EDITED: theme is now hardcoded to dark — no toggle, no localStorage.
// Context is kept (rather than deleted entirely) so any component still
// calling useTheme() elsewhere doesn't break.
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}