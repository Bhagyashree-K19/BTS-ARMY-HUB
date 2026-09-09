// ADDED: global music player state — current song, queue, play/pause,
// progress — plus auto-advance logic (next song -> next album).
import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { useYouTubePlayer } from '../hooks/useYouTubePlayer.js'
import albums from '../data/albums.js'
import songs from '../data/songs.js'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null)
  const [queue, setQueue] = useState([]) // ordered array of songs currently playing through
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  // Keep a ref mirror of queue/index so the onEnded callback (registered
  // once inside useYouTubePlayer) always reads the latest values instead
  // of a stale closure from when the player was first created.
  const queueRef = useRef(queue)
  const indexRef = useRef(currentIndex)
  queueRef.current = queue
  indexRef.current = currentIndex

  const handleProgress = useCallback((current, dur) => {
    setProgress(current)
    setDuration(dur)
  }, [])

  const handleEnded = useCallback(() => {
    playNextInternal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { loadVideo, play, pause, seekTo: seekPlayerTo } = useYouTubePlayer({
    onEnded: handleEnded,
    onProgress: handleProgress,
  })

  // Finds the next playable song across albums once the current queue
  // runs out, so playback continues into the next album automatically.
  function findNextAlbumFirstSong(currentAlbumId) {
    const albumIndex = albums.findIndex((a) => a.id === currentAlbumId)
    for (let i = albumIndex + 1; i < albums.length; i++) {
      const nextAlbumSongs = songs.filter((s) => s.albumId === albums[i].id && s.youtubeId)
      if (nextAlbumSongs.length > 0) {
        return { song: nextAlbumSongs[0], queue: nextAlbumSongs }
      }
    }
    return null
  }

  function playNextInternal() {
    const q = queueRef.current
    const i = indexRef.current
    if (i + 1 < q.length) {
      const nextSong = q[i + 1]
      setCurrentIndex(i + 1)
      setCurrentSong(nextSong)
      loadVideo(nextSong.youtubeId)
      setIsPlaying(true)
      return
    }

    // Queue exhausted -- try to move to the next album.
    const finished = q[i]
    if (finished?.albumId) {
      const next = findNextAlbumFirstSong(finished.albumId)
      if (next) {
        setQueue(next.queue)
        setCurrentIndex(0)
        setCurrentSong(next.song)
        loadVideo(next.song.youtubeId)
        setIsPlaying(true)
        return
      }
    }

    // Nothing left to play.
    setIsPlaying(false)
  }

  // Public: start playing a song from a given queue (e.g. all songs on
  // the album page, or all songs on the Songs page).
  const playSong = useCallback((song, songQueue = [song]) => {
    if (!song.youtubeId) return // not playable yet -- caller should fall back to YouTube link
    const idx = songQueue.findIndex((s) => s.id === song.id)
    setQueue(songQueue)
    setCurrentIndex(idx === -1 ? 0 : idx)
    setCurrentSong(song)
    loadVideo(song.youtubeId)
    setIsPlaying(true)
  }, [loadVideo])

  const togglePlay = useCallback(() => {
    if (!currentSong) return
    if (isPlaying) {
      pause()
      setIsPlaying(false)
    } else {
      play()
      setIsPlaying(true)
    }
  }, [currentSong, isPlaying, play, pause])

  const playNext = useCallback(() => {
    playNextInternal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const playPrevious = useCallback(() => {
    const q = queueRef.current
    const i = indexRef.current
    if (i - 1 >= 0) {
      const prevSong = q[i - 1]
      setCurrentIndex(i - 1)
      setCurrentSong(prevSong)
      loadVideo(prevSong.youtubeId)
      setIsPlaying(true)
    }
  }, [loadVideo])

  const seekTo = useCallback((seconds) => {
    seekPlayerTo(seconds)
    setProgress(seconds)
  }, [seekPlayerTo])

  const value = {
    currentSong,
    queue,
    isPlaying,
    progress,
    duration,
    playSong,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    hasNext: currentIndex + 1 < queue.length,
    hasPrevious: currentIndex - 1 >= 0,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}