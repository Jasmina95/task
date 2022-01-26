import React from 'react';
import Box from '@mui/material/Box';
import MovieCard from './MovieCard';
import MovieRatingCard from './MovieRatingCard';

const MovieList = ({ movies, setMovies, rating }) => {
  return (
    <Box>
      {!rating && (
        <Box
          sx={{
            width: '90%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            //justifyContent: 'center',
            mt: '40px'
          }}
        >
          {movies &&
            movies.length > 0 &&
            movies.map(movie => <MovieCard key={movie._id} movie={movie} />)}
        </Box>
      )}
      {rating &&
        movies &&
        movies.length > 0 &&
        movies.map(movie => (
          <MovieRatingCard
            key={movie._id}
            movie={movie}
            setMovies={setMovies}
          />
        ))}
    </Box>
  );
};

export default MovieList;
