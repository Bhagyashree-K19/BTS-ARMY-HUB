// ADDED: shared search logic used by both the Navbar live dropdown and
// the full Search page, so results never drift between the two.
import members from '../data/members.js'
import albums from '../data/albums.js'
import songs from '../data/songs.js'

export function searchAll(query) {
  const lowerQuery = query.trim().toLowerCase()
  if (!lowerQuery) {
    return { members: [], albums: [], songs: [] }
  }

  const matchedMembers = members.filter(
    (m) =>
      m.stageName.toLowerCase().includes(lowerQuery) ||
      m.realName.toLowerCase().includes(lowerQuery)
  )

  const matchedAlbums = albums.filter((a) =>
    a.title.toLowerCase().includes(lowerQuery)
  )

  const matchedSongs = songs.filter((s) => {
    const albumTitle = albums.find((a) => a.id === s.albumId)?.title || ''
    return (
      s.title.toLowerCase().includes(lowerQuery) ||
      albumTitle.toLowerCase().includes(lowerQuery)
    )
  })

  return { members: matchedMembers, albums: matchedAlbums, songs: matchedSongs }
}