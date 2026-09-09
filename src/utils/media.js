// We don't have licensed BTS audio files to host ourselves (and never
// should — that's copyrighted music), so "Play" buttons across the app
// open the official YouTube search for that track in a new tab instead.
// This is the same approach real fan sites use, and needs no API key.
export function getYouTubeSearchUrl(songTitle) {
  const query = `BTS ${songTitle} official`
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}
