const express = require('express');
const movieCtrl = require('../controllers/movie.controller');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.route('/api/movies').get(movieCtrl.listMovies);
router.route('/api/movies/all').get(movieCtrl.listAllMovies);
router
  .route('/api/movies/search')
  .get(
    movieCtrl.searchingByStars,
    movieCtrl.searchingByYear,
    movieCtrl.searchMovies
  );
router
  .route('/api/movies/search/phrase')
  .get(
    movieCtrl.searchingByStars,
    movieCtrl.searchingByYear,
    movieCtrl.searchMoviesByPhrase
  );
router
  .route('/api/movies/rate/:movieId')
  .put(authCtrl.requireSignin, movieCtrl.rateMovie);

router.param('movieId', movieCtrl.movieById);

module.exports = router;
