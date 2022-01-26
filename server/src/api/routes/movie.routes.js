const express = require('express');
const movieCtrl = require('../controllers/movie.controller');

const router = express.Router();

router.route('/api/movies').get(movieCtrl.listMovies);
router.route('/api/movies/totalNumber').get(movieCtrl.getTotalNumberOfMovies);
router.route('/api/tvShows').get(movieCtrl.listTVShows);
router.route('/api/tvShows/totalNumber').get(movieCtrl.getTotalNumberOfTVShows);

module.exports = router;

