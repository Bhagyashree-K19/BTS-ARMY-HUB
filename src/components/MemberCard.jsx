import { NavLink } from 'react-router-dom'
import PlaceholderCover from './PlaceholderCover.jsx'

function MemberCard({ member }) {
  return (
    <NavLink
      to={`/members/${member.id}`}
      className="flex flex-col items-center text-center no-underline text-ink bg-surface border border-border rounded-lg p-8 transition-transform duration-base hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-8px_var(--card-glow,var(--shadow-color))]"
      style={{ '--card-glow': member.color }}
    >
      <PlaceholderCover
        label={member.stageName}
        color={member.color}
        shape="circle"
        sizeClassName="w-[140px] h-[140px]"
        className="mb-4"
      />
      <div>
        <h3 className="text-xl mb-1">{member.stageName}</h3>
        <p className="text-sm mb-0">{member.position}</p>
      </div>
    </NavLink>
  )
}

export default MemberCard
