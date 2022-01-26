const Movie = require('../models/movie.model');
const errorHandler = require('../helpers/dbErrorHandler');
const _ = require('lodash');

const listAllMovies = async (req, res) => {
  try {
    let movies = await Movie.find({});

    res.status(200).json(movies);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const listMovies = async (req, res) => {
  try {
    let movies = await Movie.find({ type: req.query.type })
      .sort('-averageRating')
      .exec();

    let moviesObj = {
      movies: movies.slice(
        req.query.startIndex * 10,
        req.query.startIndex * 10 + 10
      ),
      numberOfMovies: movies.length
    };

    res.status(200).json(moviesObj);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const searchMovies = async (req, res) => {
  // modification needed
  try {
    let movies = await Movie.find(
      {
        $text: { $search: req.query.searchString }
      },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(req.query.startIndex * 10)
      .limit(10)
      .sort('-averageRating')
      .exec();

    res.status(200).json(movies);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const movieById = async (req, res, next, id) => {
  try {
    let movie = await Movie.findById(id);

    if (!movie) {
      return res.status(400).json({
        error: 'Movie not found!'
      });
    }

    req.movie = movie;
    next();
  } catch (err) {
    return res.status(400).json({
      erorr: 'Could not retrieve movie'
    });
  }
};

const rateMovie = async (req, res) => {
  try {
    let movie = req.movie;

    let ratings = movie.ratings;

    ratings.push({ value: req.body.ratingValue, ratedBy: req.auth._id });

    // calculate average rating
    let sum = 0;
    ratings.forEach(rating => (sum += rating.value));

    let avgRating = (sum / movie.ratings.length).toFixed(2);

    const integer = Math.floor(avgRating);
    const decimal = avgRating % 1;

    let result = 0;

    if (decimal <= 0.25) {
      result = integer;
    } else if (decimal > 0.25 && decimal <= 0.75) {
      result = integer + 0.5;
    } else {
      result = integer + 1;
    }

    movie = _.extend(movie, { ratings: ratings, averageRating: result });

    await movie.save();

    res.json({
      message: 'Movie successfully rated!'
    });
  } catch (err) {
    return res.status(400).json({
      error: 'Error while trying to rate movie!'
    });
  }
};

module.exports = {
  listAllMovies,
  listMovies,
  searchMovies,
  movieById,
  rateMovie
};
