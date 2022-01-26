const Movie = require('../models/movie.model');
const errorHandler = require('../helpers/dbErrorHandler');

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

module.exports = {
  listMovies,
  searchMovies
};
