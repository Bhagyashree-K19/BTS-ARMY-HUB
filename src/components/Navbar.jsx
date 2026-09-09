import { useState, useRef, useEffect } from 'react' // EDITED: added useRef, useEffect
import { NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'
import { searchAll } from '../utils/search.js' // ADDED

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false) // ADDED
  const searchWrapperRef = useRef(null) // ADDED

  const { isLoggedIn, currentUser } = useAuth()
  const navigate = useNavigate()

  const closeMenu = () => setIsOpen(false)

  // ADDED: live results computed on every keystroke, capped so the
  // dropdown stays short. Full/complete results still live on /search.
  const liveResults = searchAll(query)
  const hasLiveResults =
    liveResults.members.length > 0 ||
    liveResults.albums.length > 0 ||
    liveResults.songs.length > 0

  // ADDED: close the dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setShowResults(false) // ADDED
      closeMenu()
    }
  }

  // ADDED: navigating to a specific result from the dropdown
  const handleResultClick = (path) => {
    navigate(path)
    setQuery('')
    setShowResults(false)
    closeMenu()
  }

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/members', label: 'Members' },
    { to: '/albums', label: 'Albums' },
    { to: '/songs', label: 'Songs' },
    { to: '/favorites', label: 'Favorites' },
    { to: '/community', label: 'Community' },
  ]

  return (
    <>
      {/* Mobile top bar: logo + hamburger. Hidden on desktop. */}
      <div className="hidden max-[860px]:flex items-center justify-between px-6 py-4 bg-surface border-b border-border sticky top-0 z-[60]">
        <NavLink to="/" className="font-extrabold text-lg text-primary no-underline" onClick={closeMenu}>
          BTS ARMY HUB
        </NavLink>
        <button
          className="flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-[0.4rem]"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="w-[22px] h-[2px] bg-ink" />
          <span className="w-[22px] h-[2px] bg-ink" />
          <span className="w-[22px] h-[2px] bg-ink" />
        </button>
      </div>

      {/* Backdrop that closes the sidebar when tapped, mobile only */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-[55]" onClick={closeMenu} />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-[260px] min-[861px]:w-60 bg-surface border-r border-border flex flex-col p-6 gap-6 overflow-y-auto z-[60] transition-transform duration-base min-[861px]:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <NavLink
          to="/"
          className="hidden min-[861px]:block font-extrabold text-lg text-primary no-underline"
          onClick={closeMenu}
        >
          BTS ARMY HUB
        </NavLink>

        {/* EDITED: wrapped in a relative div so the dropdown can be
            absolutely positioned under the input */}
        <div className="relative w-full" ref={searchWrapperRef}>
          <form className="w-full" onSubmit={handleSearchSubmit} role="search">
            <input
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowResults(true) // ADDED
              }}
              onFocus={() => setShowResults(true)} // ADDED
              aria-label="Search"
              className="w-full py-2 px-3 rounded-sm border border-border bg-surface-alt text-ink"
            />
          </form>

          {/* ADDED: live results dropdown */}
          {showResults && query.trim() && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-sm shadow-lg max-h-[60vh] overflow-y-auto z-[70]">
              {!hasLiveResults ? (
                <p className="text-muted text-sm p-3 m-0">No results found.</p>
              ) : (
                <>
                  {liveResults.members.slice(0, 3).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleResultClick(`/members/${m.id}`)}
                      className="w-full text-left bg-transparent border-none cursor-pointer px-3 py-2 text-sm text-ink hover:bg-surface-alt"
                    >
                      👤 {m.stageName}
                    </button>
                  ))}
                  {liveResults.albums.slice(0, 3).map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleResultClick(`/albums/${a.id}`)}
                      className="w-full text-left bg-transparent border-none cursor-pointer px-3 py-2 text-sm text-ink hover:bg-surface-alt"
                    >
                      💿 {a.title}
                    </button>
                  ))}
                  {liveResults.songs.slice(0, 3).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleResultClick(s.albumId ? `/albums/${s.albumId}` : '/songs')}
                      className="w-full text-left bg-transparent border-none cursor-pointer px-3 py-2 text-sm text-ink hover:bg-surface-alt"
                    >
                      🎵 {s.title}
                    </button>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full text-left bg-transparent border-none border-t border-border cursor-pointer px-3 py-2 text-sm text-primary font-semibold hover:bg-surface-alt"
                  >
                    See all results for "{query}" →
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <ul className="flex flex-col gap-[0.3rem] list-none">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block no-underline font-medium py-[0.6rem] px-3 rounded-sm ${
                    isActive ? 'text-white bg-primary' : 'text-muted hover:bg-surface-alt'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-border">
  
          {isLoggedIn ? (
            <NavLink to="/profile" className="no-underline font-semibold text-primary py-2 px-3" onClick={closeMenu}>
              Hi, {currentUser.displayName?.split(' ')[0] || currentUser.email}
            </NavLink>
          ) : (
            <NavLink to="/login" className="no-underline font-semibold text-primary py-2 px-3" onClick={closeMenu}>
              Login
            </NavLink>
          )}
        </div>
      </aside>
    </>
  )
}

export default Navbar