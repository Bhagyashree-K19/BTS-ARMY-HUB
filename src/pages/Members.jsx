import MemberCard from '../components/MemberCard.jsx'
import members from '../data/members.js'

function Members() {
  return (
    <div className="page-shell">
      <h1 className="page-title">Members</h1>
      <p className="page-subtitle">The seven members of BTS.</p>
      <div className="card-grid">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

export default Members
