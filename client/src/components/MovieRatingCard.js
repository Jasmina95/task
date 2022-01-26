import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { isAuthenticated, getUser } from './auth/auth-helper';
import RatingStars from './RatingStars';
import { Rating } from 'react-simple-star-rating';
import { rateMovie, listAllMovies } from '../apis/movie-api';

const MovieRatingCard = ({ movie, setMovies }) => {
  const submitRating = ratingValue => {
    rateMovie(movie._id, ratingValue, isAuthenticated()).then(data => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        listAllMovies().then(data => {
          if (data && data.error) {
            console.log(data.error);
          } else {
            setMovies(data);
          }
        });
      }
    });
  };

  return (
    <Box
      sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', mb: '20px' }}
    >
      {movie.coverImage && (
        <img
          src={`${process.env.PUBLIC_URL}/images/${movie.coverImage}`}
          alt={movie.coverImage}
          style={{ width: '100px' }}
        />
      )}
      <Typography align='left' variant='h6' sx={{ flexGrow: 1, ml: '20px' }}>
        {movie.title ? movie.title : ''}
      </Typography>
      {!movie.ratings.some(rating => rating.ratedBy === getUser()) && (
        <RatingStars submitRating={submitRating} />
      )}
      {movie.ratings.some(rating => rating.ratedBy === getUser()) && (
        <Rating
          ratingValue={
            movie.ratings.filter(rating => rating.ratedBy === getUser())[0]
              .value * 20
          }
          readonly={true}
          allowHalfIcon
        />
      )}
    </Box>
  );
};

export default MovieRatingCard;
