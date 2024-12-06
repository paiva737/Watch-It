console.log('Teste iniciado!');
const axios = require('axios');
const tmdbService = require('./tmdbService'); // Ajuste o caminho se necessário
const { buscarFilmesPopulares } = require('./tmdbService');

require('dotenv').config();

(async () => {
  try {
    console.log('Teste da conectividade com a API do TMDB...');

    
    const apiKey = process.env.TMDB_API_KEY;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`
    );

    console.log('Resposta direta da API TMDB:', response.data);

    // Testando serviços implementados
    console.log('Testando tmdbService...');
    const filmesPopulares = await tmdbService.buscarFilmesPopulares();
    console.log('Filmes Populares pelo Serviço:', filmesPopulares);

    const generos = await tmdbService.buscarGeneros();
    console.log('Gêneros pelo Serviço:', generos);

    const filmesPorGenero = await tmdbService.buscarFilmesPorGenero(28);
    console.log('Filmes por Gênero (Ação - ID 28):', filmesPorGenero);
  } catch (error) {
    console.error('Erro ao testar o TMDB Service:', error.message);
  }
})();
(async () => {
    try {
      console.log('Iniciando teste do TMDB Service...');
      const filmes = await buscarFilmesPopulares();
      console.log('Filmes populares:', filmes);
    } catch (error) {
      console.error('Erro no teste do TMDB Service:', error.message);
    }
  })();