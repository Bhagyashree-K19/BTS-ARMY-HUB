// ADDED: persistent Spotify-style bottom player bar. Renders nothing
// when no song is loaded, so it stays invisible until playback starts.
import { usePlayer } from '../context/PlayerContext.jsx'
import PlaceholderCover from './PlaceholderCover.jsx'
import albums from '../data/albums.js'

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
// Short label for the small cover: initials for titles with several words
// ("2 Cool 4 Skool" -> "2C4S"), the first 3 letters for single-word titles.
function getCoverLabel(title) {
  const words = title
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ''))
    .filter(Boolean)

  if (words.length === 0) return '♪'
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase()
  return words.map((word) => word.charAt(0)).join('').slice(0, 4).toUpperCase()
}

function PlayerBar() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    hasNext,
    hasPrevious,
  } = usePlayer()

  if (!currentSong) return null // nothing playing yet -- bar stays hidden

  const album = albums.find((a) => a.id === currentSong.albumId)

  const handleScrub = (e) => {
    const newTime = Number(e.target.value)
    seekTo(newTime)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 min-[861px]:left-60 bg-surface border-t border-border px-3 sm:px-4 py-2 sm:py-3 flex flex-wrap items-center gap-x-3 gap-y-2 z-[80]">
      {/* Cover */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
        <PlaceholderCover
          label={getCoverLabel(album?.title || currentSong.title)}
          color={album?.color || '#7c3aed'}
          shape="square"
          radiusClass="rounded-sm"
          textSize="text-xs"
        />
      </div>

      {/* Title: takes the free space on phones, fixed width on bigger screens */}
      <div className="min-w-0 flex-1 sm:flex-none sm:w-[140px]">
        <p className="m-0 text-sm font-semibold truncate">{currentSong.title}</p>
        {album && <p className="m-0 text-xs text-muted truncate">{album.title}</p>}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={playPrevious}
          disabled={!hasPrevious}
          aria-label="Previous song"
          className="bg-transparent border-none cursor-pointer text-lg disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ⏮
        </button>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent text-white border-none cursor-pointer text-sm"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button
          onClick={playNext}
          disabled={!hasNext}
          aria-label="Next song"
          className="bg-transparent border-none cursor-pointer text-lg disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ⏭
        </button>
      </div>

      {/* Seek area: its own full-width row on phones, shares the row on bigger screens */}
      <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-1 sm:min-w-0">
        <span className="text-xs text-muted w-9 text-right shrink-0">
          {formatTime(progress)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={handleScrub}
          className="flex-1 min-w-0 accent-primary"
          aria-label="Seek"
        />
        <span className="text-xs text-muted w-9 shrink-0">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  )
}

export default PlayerBar