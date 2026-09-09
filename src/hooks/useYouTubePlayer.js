// ADDED: thin wrapper around YouTube's IFrame Player API.
// Loads the API script once, creates a single hidden player instance,
// and exposes simple play/pause/seek controls plus an "onEnded" callback.
import { useEffect, useRef, useCallback } from 'react'

let apiLoadPromise = null

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT)
  }
  if (apiLoadPromise) return apiLoadPromise

  apiLoadPromise = new Promise((resolve) => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT)
    }
  })

  return apiLoadPromise
}

export function useYouTubePlayer({ onEnded, onProgress }) {
  const playerRef = useRef(null)
  const containerIdRef = useRef('yt-hidden-player')
  const progressIntervalRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    loadYouTubeApi().then((YT) => {
      if (cancelled) return

      playerRef.current = new YT.Player(containerIdRef.current, {
        height: '0',
        width: '0',
        playerVars: { autoplay: 0, controls: 0 },
        events: {
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) {
              onEnded?.()
            }
            if (event.data === YT.PlayerState.PLAYING) {
              progressIntervalRef.current = setInterval(() => {
                const current = playerRef.current?.getCurrentTime?.() || 0
                const duration = playerRef.current?.getDuration?.() || 0
                onProgress?.(current, duration)
              }, 500)
            } else {
              clearInterval(progressIntervalRef.current)
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      clearInterval(progressIntervalRef.current)
      playerRef.current?.destroy?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadVideo = useCallback((videoId) => {
    playerRef.current?.loadVideoById?.(videoId)
  }, [])

  const play = useCallback(() => {
    playerRef.current?.playVideo?.()
  }, [])

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo?.()
  }, [])

  const seekTo = useCallback((seconds) => {
    playerRef.current?.seekTo?.(seconds, true)
  }, [])

  return { containerId: containerIdRef.current, loadVideo, play, pause, seekTo }
}