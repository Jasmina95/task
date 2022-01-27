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

const searchingByStars = async (req, res, next) => {
  let wordsArray = req.query.searchString.split(' ');
  if (
    wordsArray.some(
      word => word.toLowerCase() === 'star' || word.toLowerCase() === 'stars'
    ) &&
    wordsArray.some(
      word => !isNaN(word) && parseInt(word) >= 1 && parseInt(word) <= 5
    ) &&
    wordsArray.filter(word => !isNaN(word)).length === 1
  ) {
    if (
      wordsArray.some(
        word =>
          word.toLowerCase() === 'more' ||
          word.toLowerCase() === 'least' ||
          word.toLowerCase() === 'minimum'
      ) &&
      !wordsArray.some(
        word => word.toLowerCase() === 'not' || word.toLowerCase() === 'no'
      )
    ) {
      if (
        wordsArray.some(word => word.toLowerCase() === 'more') &&
        !wordsArray.some(word => word.toLowerCase() === 'equal')
      ) {
        try {
          let movies = await Movie.find({
            type: req.query.type,
            averageRating: {
              $gt: Number(wordsArray.filter(word => !isNaN(word))[0])
            }
          })
            .sort('-averageRating')
            .exec();

          let selectedMovies = movies.slice(
            req.query.startIndex * 10,
            req.query.startIndex * 10 + 10
          );

          let moviesObj = {
            movies: selectedMovies,
            numberOfMovies: movies.length
          };

          res.status(200).json(moviesObj);
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        }
      } else {
        try {
          let movies = await Movie.find({
            type: req.query.type,
            averageRating: {
              $gte: Number(wordsArray.filter(word => !isNaN(word))[0])
            }
          })
            .sort('-averageRating')
            .exec();

          let selectedMovies = movies.slice(
            req.query.startIndex * 10,
            req.query.startIndex * 10 + 10
          );

          let moviesObj = {
            movies: selectedMovies,
            numberOfMovies: movies.length
          };

          res.status(200).json(moviesObj);
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        }
      }
    } else if (
      wordsArray.some(
        word =>
          word.toLowerCase() === 'less' ||
          word.toLowerCase() === 'max' ||
          word.toLowerCase() === 'maximum' ||
          word.toLowerCase() === 'most'
      ) &&
      !wordsArray.some(
        word => word.toLowerCase() === 'not' || word.toLowerCase() === 'no'
      )
    ) {
      if (
        wordsArray.some(word => word.toLowerCase() === 'less') &&
        !wordsArray.some(word => word.toLowerCase() === 'equal')
      ) {
        try {
          let movies = await Movie.find({
            type: req.query.type,
            averageRating: {
              $lt: Number(wordsArray.filter(word => !isNaN(word))[0])
            }
          })
            .sort('-averageRating')
            .exec();

          let selectedMovies = movies.slice(
            req.query.startIndex * 10,
            req.query.startIndex * 10 + 10
          );

          let moviesObj = {
            movies: selectedMovies,
            numberOfMovies: movies.length
          };

          res.status(200).json(moviesObj);
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        }
      } else {
        try {
          let movies = await Movie.find({
            type: req.query.type,
            averageRating: {
              $lte: Number(wordsArray.filter(word => !isNaN(word))[0])
            }
          })
            .sort('-averageRating')
            .exec();

          let selectedMovies = movies.slice(
            req.query.startIndex * 10,
            req.query.startIndex * 10 + 10
          );

          let moviesObj = {
            movies: selectedMovies,
            numberOfMovies: movies.length
          };

          res.status(200).json(moviesObj);
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        }
      }
    } else {
      try {
        let movies = await Movie.find({
          type: req.query.type,
          averageRating: Number(wordsArray.filter(word => !isNaN(word))[0])
        });

        let selectedMovies = movies.slice(
          req.query.startIndex * 10,
          req.query.startIndex * 10 + 10
        );

        let moviesObj = {
          movies: selectedMovies,
          numberOfMovies: movies.length
        };

        res.status(200).json(moviesObj);
      } catch (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
    }
  } else {
    next();
  }
};

const searchingByYear = async (req, res, next) => {
  let wordsArray = req.query.searchString.split(' ');

  if (
    wordsArray.length === 1 &&
    !isNaN(wordsArray[0]) &&
    Number.isInteger(Number(wordsArray[0]))
  ) {
    try {
      let movies = await Movie.find({
        type: req.query.type,
        releaseDate: {
          $gte: new Date(parseInt(wordsArray[0]), 1, 1),
          $lt: new Date(parseInt(wordsArray[0]) + 1, 0, 1)
        }
      })
        .sort('-averageRating')
        .exec();

      let selectedMovies = movies.slice(
        req.query.startIndex * 10,
        req.query.startIndex * 10 + 10
      );

      let moviesObj = {
        movies: selectedMovies,
        numberOfMovies: movies.length
      };

      res.status(200).json(moviesObj);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  } else if (
    wordsArray.filter(word => !isNaN(word)).length === 1 &&
    wordsArray.some(word => Number.isInteger(Number(word))) &&
    !wordsArray.some(
      word => word.toLowerCase() === 'star' || word.toLowerCase() === 'stars'
    ) &&
    !wordsArray.some(
      word => word.toLowerCase() === 'not' || word.toLowerCase() === 'no'
    )
  ) {
    let year = wordsArray.filter(word => !isNaN(word))[0];

    if (year) {
      if (wordsArray.some(word => word.toLowerCase() === 'before')) {
        try {
          let movies = await Movie.find({
            type: req.query.type,
            releaseDate: {
              $lt: new Date(parseInt(year), 1, 1)
            }
          })
            .sort('-averageRating')
            .exec();

          let selectedMovies = movies.slice(
            req.query.startIndex * 10,
            req.query.startIndex * 10 + 10
          );

          let moviesObj = {
            movies: selectedMovies,
            numberOfMovies: movies.length
          };

          res.status(200).json(moviesObj);
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        }
      } else if (wordsArray.some(word => word.toLowerCase() === 'older')) {
        let currentYear = new Date().getFullYear();

        try {
          let movies = await Movie.find({
            type: req.query.type,
            releaseDate: {
              $lt: new Date(parseInt(currentYear) - parseInt(year), 0, 1)
            }
          })
            .sort('-averageRating')
            .exec();

          let selectedMovies = movies.slice(
            req.query.startIndex * 10,
            req.query.startIndex * 10 + 10
          );

          let moviesObj = {
            movies: selectedMovies,
            numberOfMovies: movies.length
          };

          res.status(200).json(moviesObj);
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        }
      } else if (wordsArray.some(word => word.toLowerCase() === 'younger')) {
        let currentYear = new Date().getFullYear();

        try {
          let movies = await Movie.find({
            type: req.query.type,
            releaseDate: {
              $gt: new Date(parseInt(currentYear) - parseInt(year), 0, 1)
            }
          })
            .sort('-averageRating')
            .exec();

          let selectedMovies = movies.slice(
            req.query.startIndex * 10,
            req.query.startIndex * 10 + 10
          );

          let moviesObj = {
            movies: selectedMovies,
            numberOfMovies: movies.length
          };

          res.status(200).json(moviesObj);
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        }
      } else if (wordsArray.some(word => word.toLowerCase() === 'after')) {
        try {
          let movies = await Movie.find({
            type: req.query.type,
            releaseDate: {
              $gte: new Date(parseInt(year), 1, 1)
            }
          })
            .sort('-averageRating')
            .exec();

          let selectedMovies = movies.slice(
            req.query.startIndex * 10,
            req.query.startIndex * 10 + 10
          );

          let moviesObj = {
            movies: selectedMovies,
            numberOfMovies: movies.length
          };

          res.status(200).json(moviesObj);
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          });
        }
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
};

const searchMovies = async (req, res) => {
  // modification needed
  try {
    let movies = await Movie.find(
      {
        type: req.query.type,
        $text: { $search: req.query.searchString }
      },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .exec();

    let selectedMovies = movies
      .slice(req.query.startIndex * 10, req.query.startIndex * 10 + 10)
      .sort((a, b) => b.averageRating - a.averageRating);

    let moviesObj = {
      movies: selectedMovies,
      numberOfMovies: movies.length
    };

    res.status(200).json(moviesObj);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const searchMoviesByPhrase = async (req, res) => {
  try {
    let movies = await Movie.find({
      type: req.query.type,
      $or: [
        { title: { $regex: req.query.searchString, $options: 'i' } },
        { description: { $regex: req.query.searchString, $options: 'i' } },
        { cast: { $regex: req.query.searchString, $options: 'i' } }
      ]
    })
      .sort('-averageRating')
      .exec();

    let selectedMovies = movies.slice(
      req.query.startIndex * 10,
      req.query.startIndex * 10 + 10
    );

    let moviesObj = {
      movies: selectedMovies,
      numberOfMovies: movies.length
    };

    res.status(200).json(moviesObj);
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
  searchingByStars,
  searchingByYear,
  searchMovies,
  searchMoviesByPhrase,
  movieById,
  rateMovie
};
