import React, { useEffect, useState } from "react";
import { getHistory, removeFromHistory } from "../api";

interface AnimeHistory {
  id: number;
  title: string;
  status: string; // "viendo" o "visto"
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<AnimeHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const historyList = await getHistory(); // Esto devuelve un array de tipo Anime[]
      const transformedHistory = historyList.map((anime) => ({
        ...anime,
        status: "viendo", // Valor por defecto o según lo que necesites
      }));
      setHistory(transformedHistory); // Ahora sí es de tipo AnimeHistory[]
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener el historial:", error);
      setError("No se pudo cargar el historial. Inténtalo de nuevo más tarde.");
      setLoading(false);
    }
  };
  
  const handleRemoveFromHistory = async (animeId: number) => {
    try {
      await removeFromHistory(animeId);
      alert("Anime eliminado del historial");
      // Actualizar la lista después de eliminar
      setHistory(history.filter((anime) => anime.id !== animeId));
    } catch (error) {
      console.error("Error al eliminar del historial:", error);
      alert("No se pudo eliminar el anime del historial.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Cargando historial...</div>;
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
      <h2 className="text-3xl font-bold mb-6 text-center">Tu Historial</h2>
      {history.length === 0 ? (
        <p className="text-center text-gray-500">No tienes animes en tu historial.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {history.map((anime) => (
            <div
              key={anime.id}
              className="p-4 border border-gray-300 rounded hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold">{anime.title}</h3>
              <p className="text-gray-500">Estado: {anime.status}</p>
              <button
                className="mt-2 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                onClick={() => handleRemoveFromHistory(anime.id)}
              >
                Eliminar del Historial
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
