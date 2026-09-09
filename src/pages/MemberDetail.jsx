import { useParams, NavLink } from 'react-router-dom'
import PlaceholderCover from '../components/PlaceholderCover.jsx'
import EmptyState from '../components/EmptyState.jsx'
import SongCard from '../components/SongCard.jsx'
import members from '../data/members.js'
import songs from '../data/songs.js'

function MemberDetail() {
  const { memberId } = useParams()
  const member = members.find((m) => m.id === memberId)

  const memberSongs = songs.filter(
    (s) => s.memberId === memberId || (s.collaboratingMembers && s.collaboratingMembers.includes(memberId))
  )

  // ADDED: queue for this member's SongCards -- only the playable
  // (has youtubeId) songs from this same list, in the order shown.
  const memberQueue = memberSongs.filter((s) => s.youtubeId)

  if (!member) {
    return (
      <div className="page-shell">
        <EmptyState
          title="Member not found"
          message="We couldn't find that member. They might have a different profile link."
        />
        <NavLink to="/members" className="text-primary no-underline font-semibold">← Back to all members</NavLink>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <NavLink to="/members" className="inline-block mb-6 text-primary no-underline font-semibold">
        ← Back to all members
      </NavLink>

      <div
        className="flex flex-col sm:flex-row gap-8 items-center relative overflow-hidden bg-surface border border-border rounded-lg p-8 before:content-[''] before:absolute before:-inset-[50px] before:[background:var(--member-glow,var(--color-primary))] before:blur-[100px] before:opacity-30 before:z-0"
        style={{ '--member-glow': member.color }}
      >
        <div className="relative z-10">
          <PlaceholderCover
            label={member.stageName}
            color={member.color}
            shape="circle"
            sizeClassName="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]"
            textSize="text-[2.6rem]"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl">{member.stageName}</h1>
          <p className="text-muted mb-4">{member.realName}</p>
          <ul className="list-none mb-4 flex flex-col gap-[0.3rem]">
            <li><strong>Position:</strong> {member.position}</li>
            <li><strong>Birthday:</strong> {member.birthday}</li>
          </ul>
          <p>{member.bio}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Solo Songs</h2>

        {memberSongs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {memberSongs.map((song) => (
              <SongCard key={song.id} song={song} hideAlbumLink queue={memberQueue} />
            ))}
          </div>
        ) : (
          <p className="text-muted">No solo songs added yet.</p>
        )}
      </div>

    </div>
  )
}

export default MemberDetail