import { NavLink } from 'react-router-dom'
import PlaceholderCover from './PlaceholderCover.jsx'

function AlbumCard({ album }) {
  return (
    <NavLink
      to={`/albums/${album.id}`}
      className="block no-underline text-ink bg-surface border border-border rounded-md overflow-hidden transition-transform duration-base hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-8px_var(--card-glow,var(--shadow-color))]"
      style={{ '--card-glow': album.color }}
    >
      <PlaceholderCover label={album.title} color={album.color} shape="square" />
      <div className="p-6">
        <h3 className="mb-1 text-lg">{album.title}</h3>
        <p className="text-sm mb-0">{album.type} • {album.year}</p>
      </div>
    </NavLink>
  )
}

export default AlbumCard
