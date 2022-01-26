const Movie = require('../models/movie.model');
const errorHandler = require('../helpers/dbErrorHandler');

const listMovies = async (req, res) => {
  try {
    let movies = await Movie.find({ type: 'movie' })
      .populate('ratings.ratedBy', '_id name')
      .sort('-averageRating')
      .skip(req.body.index * 10)
      .limit(10)
      .exec();

    res.json(movies);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const getTotalNumberOfMovies = async (req, res) => {
  try {
    let movies = await Movie.find({ type: 'movie' });

    res.json(movies.length);
  } catch (err) {
    return res.status(400).getErrorMessage(err);
  }
};

const listTVShows = async (req, res) => {
  try {
    let shows = await Movie.find({ type: 'tv show' })
      .populate('ratings.ratedBy', '_id name')
      .sort('-averageRating')
      .skip(req.body.index * 10)
      .limit(10)
      .exec();

    res.json(shows);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const getTotalNumberOfTVShows = async (req, res) => {
  try {
    let shows = await Movie.find({ type: 'tv show' });

    res.json(movies.length);
  } catch (err) {
    return res.status(400).getErrorMessage(err);
  }
};

module.exports = {
  listMovies,
  getTotalNumberOfMovies,
  listTVShows,
  getTotalNumberOfTVShows
};
