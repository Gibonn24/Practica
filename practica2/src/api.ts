import axios from 'axios';

const API_URL = 'http://3.90.3.179:8000/api';

// Interfaces para las operaciones de la API
interface UserCreate {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface Token {
  access_token: string;
  token_type: string;
}

interface Anime {
  id: number;
  title: string;
}

interface AnimeFavoriteRequest {
  anime_id: number;
}

interface AnimeHistoryRequest {
  anime_id: number;
  status: string; // Ejemplo: "viendo" o "visto"
}

// Funciones de autenticación
export const login = async (email: string, password: string): Promise<Token> => {
  try {
    const response = await axios.post<Token>(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('token', response.data.access_token);
    console.log('Login exitoso');
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};

export const register = async (user: UserCreate): Promise<void> => {
  try {
    await axios.post(`${API_URL}/auth/register`, user);
    console.log('Registro exitoso');
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

// Configuración de Axios con token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token no disponible. Por favor, inicia sesión.');
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Gestión de favoritos
export const addToFavorites = async (animeId: number): Promise<void> => {
  try {
    await axios.post(`${API_URL}/user/favorites`, { anime_id: animeId }, getAuthHeaders());
    console.log('Anime agregado a favoritos');
  } catch (error) {
    console.error('Error al agregar a favoritos:', error);
    throw error;
  }
};

export const removeFromFavorites = async (animeId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/user/favorites`, {
      ...getAuthHeaders(),
      data: { anime_id: animeId },
    });
    console.log('Anime eliminado de favoritos');
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error);
    throw error;
  }
};

export const getFavorites = async (): Promise<Anime[]> => {
  try {
    const response = await axios.get<Anime[]>(`${API_URL}/user/favorites`, getAuthHeaders());
    console.log('Favoritos obtenidos exitosamente');
    return response.data;
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    throw error;
  }
};

// Gestión de historial
export const addToHistory = async (animeId: number, status: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/user/history`, { anime_id: animeId, status }, getAuthHeaders());
    console.log('Anime agregado al historial');
  } catch (error) {
    console.error('Error al agregar al historial:', error);
    throw error;
  }
};

export const removeFromHistory = async (animeId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/user/history`, {
      ...getAuthHeaders(),
      data: { anime_id: animeId },
    });
    console.log('Anime eliminado del historial');
  } catch (error) {
    console.error('Error al eliminar del historial:', error);
    throw error;
  }
};

export const getHistory = async (): Promise<Anime[]> => {
  try {
    const response = await axios.get<Anime[]>(`${API_URL}/user/history`, getAuthHeaders());
    console.log('Historial obtenido exitosamente');
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial:', error);
    throw error;
  }
};

// Obtener lista de animes
export const getAnimeList = async (): Promise<Anime[]> => {
  try {
    const response = await axios.get<Anime[]>(`${API_URL}/anime/list`);
    console.log('Lista de animes obtenida exitosamente');
    return response.data;
  } catch (error) {
    console.error('Error al obtener lista de animes:', error);
    throw error;
  }
};
