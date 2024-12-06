require('dotenv').config();
const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const movieService = {
  buscarGeneros: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: TMDB_API_KEY,
          language: 'pt-BR',
        },
      });
      return response.data.genres;
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error.message);
      throw new Error('Erro ao buscar gêneros');
    }
  },

  buscarFilmesPopulares: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: TMDB_API_KEY,
          language: 'pt-BR',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error.message);
      throw new Error('Erro ao buscar filmes populares');
    }
  },

  buscarFilmesPorGenero: async (generoId) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          language: 'pt-BR',
          with_genres: generoId,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error(`Erro ao buscar filmes pelo gênero ${generoId}:`, error.message);
      throw new Error(`Erro ao buscar filmes pelo gênero ${generoId}`);
    }
  },
};

module.exports = movieService;
