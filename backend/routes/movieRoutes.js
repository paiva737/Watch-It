const express = require('express');
const router = express.Router();
const movieService = require('../services/movieService');

router.get('/generos', async (req, res) => {
  try {
    const generos = await movieService.buscarGeneros();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar gêneros', error });
  }
});

router.get('/populares', async (req, res) => {
  try {
    const filmesPopulares = await movieService.buscarFilmesPopulares();
    res.json(filmesPopulares);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar filmes populares', error });
  }
});

router.get('/genero/:id', async (req, res) => {
  const generoId = req.params.id;
  try {
    const filmes = await movieService.buscarFilmesPorGenero(generoId);
    res.json(filmes);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar filmes pelo gênero ${generoId}`, error });
  }
});

module.exports = router;
