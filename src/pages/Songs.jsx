import { useState } from 'react'
import SongCard from '../components/SongCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import EmptyState from '../components/EmptyState.jsx'
import songs from '../data/songs.js'
import albums from '../data/albums.js'

function Songs() {
  const [query, setQuery] = useState('')

  const lowerQuery = query.toLowerCase()
  const filteredSongs = songs.filter((song) => {
    const albumTitle = albums.find((a) => a.id === song.albumId)?.title || ''

    return (
      song.title.toLowerCase().includes(lowerQuery) ||
      albumTitle.toLowerCase().includes(lowerQuery)
    )
  })

  // ADDED: the queue SongCards on this page play through -- only the
  // currently-filtered, playable (has youtubeId) songs, in list order.
  const songsQueue = filteredSongs.filter((s) => s.youtubeId)

  return (
    <div className="page-shell">
      <h1 className="page-title">Songs</h1>
      <p className="page-subtitle">Search through BTS tracks.</p>

      <div className="max-w-[360px] mb-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search songs by title or album..."
        />
      </div>

      {filteredSongs.length === 0 ? (
        <EmptyState
          title="No songs found"
          message="Try a different search term."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              queue={songsQueue}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Songs