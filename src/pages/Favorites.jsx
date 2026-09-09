import { useEffect, useState } from "react";
import SongCard from "../components/SongCard.jsx";
import { getFavorites, clearFavorites } from "../utils/favorites.js";
import songs from "../data/songs.js";

// Change this to one of your existing images
import favoriteImage from "../assets/favorite.jpg";

function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const loadFavorites = () => {
    const favoriteIds = getFavorites();

    const filteredSongs = songs.filter((song) => favoriteIds.includes(song.id));

    setFavoriteSongs(filteredSongs);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleClearFavorites = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove all favorite songs?",
    );

    if (!confirmed) return;

    clearFavorites();
    setFavoriteSongs([]);
  };

  const handleToggleFavorite = (songId, newStatus) => {
    if (!newStatus) {
      setFavoriteSongs((currentSongs) =>
        currentSongs.filter((song) => song.id !== songId),
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col">
      <main className="flex-1 max-w-app mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-primary shadow-glow flex-shrink-0">
              <img
                src={favoriteImage}
                alt="Favorites"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-ink">
                Favorites
              </h1>

              <p className="text-sm sm:text-base text-muted mt-1">
                Your favorite BTS songs
              </p>
            </div>
          </div>

          {favoriteSongs.length > 0 && (
            <button
              type="button"
              onClick={handleClearFavorites}
              className="self-start sm:self-auto inline-flex items-center justify-center px-4 py-2 rounded-sm border border-border bg-surface text-ink text-sm font-medium cursor-pointer transition-all duration-150 hover:bg-surface-alt hover:border-primary hover:text-primary"
            >
              Clear All
            </button>
          )}
        </div>

        {favoriteSongs.length > 0 && (
          <div className="flex flex-col gap-4">
            {favoriteSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

        {favoriteSongs.length === 0 && (
          <div className="flex flex-col items-center text-center py-16 px-4 text-muted">
            <p className="text-4xl mb-3">🤍</p>
            <h3 className="text-ink text-lg mb-1">No favorites yet</h3>
            <p className="text-sm max-w-[320px]">
              Tap the heart on any song to save it here.
            </p>
            <p className="text-sm max-w-[320px]">
              Tap the heart again on any song to remove it from Favorites.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Favorites;
