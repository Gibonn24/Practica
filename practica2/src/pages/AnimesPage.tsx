import React, { useEffect, useState } from "react";
import { getAnimeList } from "../api";

interface Anime {
  id: number;
  title: string;
}

const AnimesPage: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const animeList = await getAnimeList();
        setAnimes(animeList);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la lista de animes:", error);
        setError("No se pudo cargar la lista de animes. Inténtalo de nuevo más tarde.");
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Cargando animes...</div>;
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
      <h2 className="text-3xl font-bold mb-6 text-center">Lista de Animes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {animes.map((anime) => (
          <div
            key={anime.id}
            className="p-4 border border-gray-300 rounded hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold">{anime.title}</h3>
            <button
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={() => alert(`Has seleccionado el anime: ${anime.title}`)}
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimesPage;
