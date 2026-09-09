const FAVORITES_KEY = 'bts-favorite-songs'

export function getFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function isFavorite(songId) {
  return getFavorites().includes(songId)
}

export function toggleFavorite(songId) {
  const favorites = getFavorites()

  if (favorites.includes(songId)) {
    const updated = favorites.filter(
      (id) => id !== songId
    )

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updated)
    )

    return false
  }

  const updated = [...favorites, songId]

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updated)
  )

  return true
}

export function removeFavorite(songId) {
  const favorites = getFavorites()

  const updated = favorites.filter(
    (id) => id !== songId
  )

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updated)
  )
}

export function clearFavorites() {
  localStorage.removeItem(FAVORITES_KEY)
}