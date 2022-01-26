const express = require('express');
const movieCtrl = require('../controllers/movie.controller');

const router = express.Router();

router.route('/api/movies').get(movieCtrl.listMovies);
router.route('/api/movies/search').get(movieCtrl.searchMovies);

module.exports = router;
