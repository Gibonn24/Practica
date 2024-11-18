import React, { useEffect, useState } from "react";
import { getFavorites, removeFromFavorites } from "../api";

interface Anime {
  id: number;
  title: string;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const favoriteList = await getFavorites();
      setFavorites(favoriteList);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener la lista de favoritos:", error);
      setError("No se pudo cargar la lista de favoritos. Inténtalo de nuevo más tarde.");
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (animeId: number) => {
    try {
      await removeFromFavorites(animeId);
      alert("Anime eliminado de favoritos");
      // Actualizar la lista después de eliminar
      setFavorites(favorites.filter((anime) => anime.id !== animeId));
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
      alert("No se pudo eliminar el anime de favoritos.");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Cargando favoritos...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Tus Favoritos</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No tienes animes en tu lista de favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((anime) => (
            <div
              key={anime.id}
              className="p-4 border border-gray-300 rounded hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold">{anime.title}</h3>
              <button
                className="mt-2 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                onClick={() => handleRemoveFavorite(anime.id)}
              >
                Eliminar de Favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
