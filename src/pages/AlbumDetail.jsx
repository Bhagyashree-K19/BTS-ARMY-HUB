import { useParams, NavLink } from 'react-router-dom'
import PlaceholderCover from '../components/PlaceholderCover.jsx'
import EmptyState from '../components/EmptyState.jsx'
import SongCard from '../components/SongCard.jsx'
import albums from '../data/albums.js'
import songs from '../data/songs.js'
import { getYouTubeSearchUrl } from '../utils/media.js'

function normalizeTitle(title) {
  return title.split('(')[0].trim().toLowerCase()
}

function AlbumDetail() {
  const { albumId } = useParams()
  const album = albums.find((a) => a.id === albumId)

  if (!album) {
    return (
      <div className="page-shell">
        <EmptyState
          title="Album not found"
          message="That album doesn't exist in our library."
        />
        <NavLink
          to="/albums"
          className="text-primary no-underline font-semibold"
        >
          ← Back to all albums
        </NavLink>
      </div>
    )
  }

  // ADDED: the queue this album's SongCards will play through -- every
  // playable (has youtubeId) song on this album, in track order.
  const albumQueue = album.tracks
    .map((trackTitle) =>
      songs.find(
        (s) =>
          s.albumId === album.id &&
          normalizeTitle(s.title) === normalizeTitle(trackTitle)
      )
    )
    .filter((s) => s && s.youtubeId)

  return (
    <div className="page-shell">
      <NavLink
        to="/albums"
        className="inline-block mb-6 text-primary no-underline font-semibold"
      >
        ← Back to all albums
      </NavLink>

      <div
        className="flex flex-col sm:flex-row gap-8 items-center text-center sm:text-left relative overflow-hidden bg-surface border border-border rounded-lg p-8 mb-8 before:content-[''] before:absolute before:-inset-[50px] before:[background:var(--album-glow,var(--color-primary))] before:blur-[100px] before:opacity-30 before:z-0"
        style={{ '--album-glow': album.color }}
      >
        <div className="relative z-10 w-[200px] sm:w-[240px] mx-auto sm:mx-0 flex-shrink-0">
          <PlaceholderCover
            label={album.title}
            color={album.color}
            shape="square"
            radiusClass="rounded-lg"
            textSize="text-[2.4rem]"
          />
        </div>

        <div className="relative z-10">
          <span className="inline-block px-[0.9rem] py-[0.3rem] rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold tracking-wide uppercase mb-4">
            {album.type}
          </span>

          <h1 className="text-4xl">{album.title}</h1>
          <p className="text-muted font-semibold mb-4">{album.year}</p>
          <p>{album.description}</p>
        </div>
      </div>

      <h3 className="text-[1.4rem] mt-8 mb-4">Track List</h3>

      <div className="flex flex-col gap-3">
        {album.tracks.map((trackTitle) => {
          const matchedSong = songs.find(
            (s) =>
              s.albumId === album.id &&
              normalizeTitle(s.title) === normalizeTitle(trackTitle)
          )

          if (matchedSong) {
            return (
              <SongCard
                key={matchedSong.id}
                song={matchedSong}
                hideAlbumLink
                queue={albumQueue}
              />
            )
          }

          return (
            <div
              key={trackTitle}
              className="flex items-center gap-4 bg-surface border border-border rounded-sm p-4"
            >
              <a
                className="inline-flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br from-primary to-accent text-white no-underline text-[0.95rem] shadow-glow transition-[transform,box-shadow] duration-150 hover:scale-110 hover:shadow-glow-hover"
                href={getYouTubeSearchUrl(trackTitle)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Play ${trackTitle} on YouTube`}
                title={`Play "${trackTitle}" on YouTube`}
              >
                ▶
              </a>

              <span className="flex-1">{trackTitle}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AlbumDetail