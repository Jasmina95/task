import React from 'react';
import Box from '@mui/material/Box';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  return (
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
  );
};

export default MovieList;
