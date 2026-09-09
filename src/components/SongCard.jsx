import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import albums from '../data/albums.js'
import { getYouTubeSearchUrl } from '../utils/media.js'
import { usePlayer } from '../context/PlayerContext.jsx' // ADDED
import {
  isFavorite,
  toggleFavorite,
} from '../utils/favorites.js'

function SongCard({ song, hideAlbumLink = false, onToggleFavorite, queue }) { // EDITED: added queue prop
  const album = albums.find((a) => a.id === song.albumId)
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer() // ADDED

  const [favorite, setFavorite] = useState(
    isFavorite(song.id)
  )

  const handleFavorite = () => {
    const newStatus = toggleFavorite(song.id)
    setFavorite(newStatus)

    if (onToggleFavorite) {
      onToggleFavorite(song.id, newStatus)
    }
  }

  // ADDED: this card's song is the one currently loaded in the player
  const isCurrentSong = currentSong?.id === song.id

  // ADDED: play button behavior -- use in-app player if this song has a
  // youtubeId, otherwise fall back to the old "open YouTube search" link
  const handlePlayClick = () => {
    if (isCurrentSong) {
      togglePlay()
    } else {
      playSong(song, queue || [song])
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 bg-surface border border-border rounded-sm p-4 transition-shadow duration-150 hover:shadow-[0_4px_12px_var(--shadow-color)]">

      {/* Play button -- EDITED: in-app playback when youtubeId exists */}
      {song.youtubeId ? (
        <button
          type="button"
          onClick={handlePlayClick}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br from-primary to-accent text-white border-none cursor-pointer text-[0.95rem] shadow-glow transition-[transform,box-shadow] duration-150 hover:scale-110 hover:shadow-glow-hover"
          aria-label={
            isCurrentSong && isPlaying
              ? `Pause ${song.title}`
              : `Play ${song.title}`
          }
          title={isCurrentSong && isPlaying ? 'Pause' : 'Play'}
        >
          {isCurrentSong && isPlaying ? '⏸' : '▶'}
        </button>
      ) : (
        <a
          className="inline-flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br from-primary to-accent text-white no-underline text-[0.95rem] shadow-glow transition-[transform,box-shadow] duration-150 hover:scale-110 hover:shadow-glow-hover"
          href={getYouTubeSearchUrl(song.title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Play ${song.title} on YouTube`}
          title={`Play "${song.title}" on YouTube`}
        >
          ▶
        </a>
      )}

      {/* Song information */}
      <div className="flex-1 min-w-0">
        <h4 className="mb-[0.15rem] text-base">
          {song.title}
        </h4>

        {!hideAlbumLink && album && (
          <NavLink
            to={`/albums/${album.id}`}
            className="text-sm text-primary no-underline"
          >
            {album.title}
          </NavLink>
        )}
      </div>

      {/* Year + duration */}
      <div className="flex gap-4 text-sm text-muted whitespace-nowrap">
        <span>{song.year}</span>
        <span>{song.duration}</span>
      </div>

      {/* Favorite button */}
      <button
        type="button"
        onClick={handleFavorite}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-surface cursor-pointer text-xl transition-transform duration-150 hover:scale-110"
        aria-label={
          favorite
            ? `Remove ${song.title} from favorites`
            : `Add ${song.title} to favorites`
        }
        title={
          favorite
            ? 'Remove from favorites'
            : 'Add to favorites'
        }
      >
        {favorite ? '💜' : '🤍'}
      </button>

    </div>
  )
}

export default SongCard