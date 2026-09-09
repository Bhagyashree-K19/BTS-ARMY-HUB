import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import MemberCard from '../components/MemberCard.jsx'
import AlbumCard from '../components/AlbumCard.jsx'
import SongCard from '../components/SongCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { searchAll } from '../utils/search.js' // EDITED: use shared search logic

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setSearchParams(query ? { q: query } : {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const hasQuery = query.trim().length > 0
  const { members: matchedMembers, albums: matchedAlbums, songs: matchedSongs } = searchAll(query) // EDITED

  const totalResults = matchedMembers.length + matchedAlbums.length + matchedSongs.length

  return (
    <div className="page-shell">
      <h1 className="page-title">Search</h1>
      <p className="page-subtitle">Find members, albums, and songs in one place.</p>

      <div className="max-w-[480px] mb-8">
        <SearchBar value={query} onChange={setQuery} placeholder="Search BTS ARMY HUB..." />
      </div>

      {!hasQuery && (
        <EmptyState title="Start typing to search" message="Try 'Jimin', 'Dynamite', or 'BE'." />
      )}

      {hasQuery && totalResults === 0 && (
        <EmptyState title="No results found" message={`Nothing matched "${query}".`} />
      )}

      {matchedMembers.length > 0 && (
        <>
          <h2 className="text-[1.3rem] mb-2">Members</h2>
          <div className="card-grid mb-8">
            {matchedMembers.map((m) => <MemberCard key={m.id} member={m} />)}
          </div>
        </>
      )}

      {matchedAlbums.length > 0 && (
        <>
          <h2 className="text-[1.3rem] mb-2">Albums</h2>
          <div className="card-grid mb-8">
            {matchedAlbums.map((a) => <AlbumCard key={a.id} album={a} />)}
          </div>
        </>
      )}

      {matchedSongs.length > 0 && (
        <>
          <h2 className="text-[1.3rem] mb-2">Songs</h2>
          <div className="flex flex-col gap-3">
            {matchedSongs.map((s) => <SongCard key={s.id} song={s} />)}
          </div>
        </>
      )}
    </div>
  )
}

export default Search