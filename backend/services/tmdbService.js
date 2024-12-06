const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  console.error('TMDB_API_KEY não encontrada. Verifique o arquivo .env.');
}

const buscarFilmesPopulares = async () => {
  try {
    console.log('Buscando filmes populares...');
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'pt-BR',
        page: 1,
      },
    });
    console.log('Resposta de filmes populares:', response.data);
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error.message);
    throw error;
  }
};

const buscarGeneros = async () => {
  try {
    console.log('Buscando gêneros...');
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: 'pt-BR',
      },
    });
    console.log('Resposta de gêneros:', response.data);
    return response.data.genres;
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error.message);
    throw error;
  }
};

const buscarFilmesPorGenero = async (generoId) => {
  try {
    console.log(`Buscando filmes do gênero ID: ${generoId}`);
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: 'pt-BR',
        sort_by: 'popularity.desc',
        with_genres: generoId,
      },
    });
    console.log(`Resposta de filmes pelo gênero ${generoId}:`, response.data);
    return response.data.results;
  } catch (error) {
    console.error(`Erro ao buscar filmes pelo gênero ${generoId}:`, error.message);
    throw error;
  }
};

module.exports = {
  buscarFilmesPopulares,
  buscarGeneros,
  buscarFilmesPorGenero,
};
