import { useParams } from 'react-router-dom'
import members from '../data/members.js'
import songs from '../data/songs.js'
import SongCard from '../components/SongCard.jsx'

function MemberPage() {
  const { memberId } = useParams()
  const member = members.find((m) => m.id === memberId)
  const memberSongs = songs.filter((s) => s.memberId === memberId)

  if (!member) {
    return <p className="text-center py-12">Member not found.</p>
  }

  return (
    <div className="max-w-app mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">

      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary shadow-glow flex-shrink-0">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-ink">{member.name}</h1>
          <p className="text-sm text-muted mt-1">{member.bio}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-ink mb-4">Solo Songs</h2>

      {memberSongs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {memberSongs.map((song) => (
            <SongCard key={song.id} song={song} hideAlbumLink />
          ))}
        </div>
      ) : (
        <p className="text-muted">No solo songs added yet.</p>
      )}

    </div>
  )
}

export default MemberPage