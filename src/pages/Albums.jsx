import { useState } from 'react'
import AlbumCard from '../components/AlbumCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import EmptyState from '../components/EmptyState.jsx'
import albums from '../data/albums.js'
import songs from '../data/songs.js' // ADDED

function Albums() {
  const [query, setQuery] = useState('')
  const lowerQuery = query.toLowerCase() // ADDED

  // EDITED: now matches on the album's own title OR any song title
  // belonging to that album, so searching "Butter" surfaces the BE album.
  const filteredAlbums = albums.filter((album) => {
    const albumTitleMatches = album.title.toLowerCase().includes(lowerQuery)
    const songTitleMatches = songs.some(
      (song) => song.albumId === album.id && song.title.toLowerCase().includes(lowerQuery)
    )
    return albumTitleMatches || songTitleMatches
  })

  return (
    <div className="page-shell">
      <h1 className="page-title">Albums</h1>
      <p className="page-subtitle">Explore the BTS discography.</p>

      <div className="max-w-[360px] mb-8">
        <SearchBar value={query} onChange={setQuery} placeholder="Filter albums by title or song..." /> {/* EDITED placeholder */}
      </div>

      {filteredAlbums.length === 0 ? (
        <EmptyState title="No albums found" message="Try a different search term." />
      ) : (
        <div className="card-grid">
          {filteredAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Albums