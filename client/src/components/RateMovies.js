import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MovieList from './MovieList';
import { listAllMovies } from '../apis/movie-api';

const RateMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    listAllMovies().then(data => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setMovies(data);
      }
    });
  }, []);

  return (
    <Card
      sx={{ maxWidth: 1000, margin: 'auto', textAlign: 'center', mt: '20px' }}
    >
      <CardContent>
        <Typography variant='h5' sx={{ mb: '15px' }}>
          Rate Movies/TV Shows
        </Typography>
        <MovieList movies={movies} setMovies={setMovies} rating={true} />
      </CardContent>
    </Card>
  );
};

export default RateMovies;
