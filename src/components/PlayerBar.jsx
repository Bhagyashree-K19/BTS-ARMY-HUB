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
    <div className="fixed bottom-0 left-0 right-0 min-[861px]:left-60 bg-surface border-t border-border px-4 py-3 flex items-center gap-4 z-[80]">
      <div className="w-12 h-12 flex-shrink-0">
        <PlaceholderCover
          label={album?.title || currentSong.title}
          color={album?.color || '#7c3aed'}
          shape="square"
          radiusClass="rounded-sm"
          textSize="text-xs"
        />
      </div>

      <div className="min-w-0 w-[140px] flex-shrink-0">
        <p className="m-0 text-sm font-semibold truncate">{currentSong.title}</p>
        {album && <p className="m-0 text-xs text-muted truncate">{album.title}</p>}
      </div>

      <div className="flex-1 flex items-center gap-2">
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

        <span className="text-xs text-muted w-9 text-right flex-shrink-0">
          {formatTime(progress)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={handleScrub}
          className="flex-1 accent-primary"
          aria-label="Seek"
        />
        <span className="text-xs text-muted w-9 flex-shrink-0">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  )
}

export default PlayerBar