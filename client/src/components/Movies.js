import React, { useEffect, useState } from 'react';
import Header from './Header';
import Box from '@mui/material/Box';
import SearchBar from './SearchBar';
import SwitchComponent from './SwitchComponent';
import { getTopRatedMovies, searchMovies } from '../apis/movie-api';
import MovieList from './MovieList';
import MoreResultsButton from './MoreResultsButton';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [totalNumberOfFoundMovies, setTotalNumberOfFoundMovies] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (!inputValue) {
      getTopRatedMovies(startIndex, checked).then(data => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setMovies(data.movies);
          setTotalNumberOfFoundMovies(data.numberOfMovies);
          setStartIndex(0);
        }
      });
    }
  }, [inputValue, checked]);

  useEffect(() => {
    if (inputValue && inputValue.length > 1) {
      searchMovies(inputValue, startIndex).then(data => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setMovies(data);
          setStartIndex(0);
        }
      });
    }
  }, [inputValue]);

  const onClickHandler = () => {
    if (!inputValue) {
      console.log(startIndex + 1);
      getTopRatedMovies(startIndex + 1, checked).then(data => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setMovies([...movies, ...data.movies]);
        }
      });
      setStartIndex(prev => prev + 1);
    }
  };

  return (
    <Box>
      <Box sx={{ mt: '15px', textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}
        >
          <SearchBar
            inputValue={inputValue}
            setInputValue={setInputValue}
            setStartIndex={setStartIndex}
          />
          <SwitchComponent
            checked={checked}
            setChecked={setChecked}
            setStartIndex={setStartIndex}
          />
        </Box>
        <MovieList movies={movies} />
        {movies.length !== totalNumberOfFoundMovies && (
          <MoreResultsButton onClickHandler={onClickHandler} />
        )}
      </Box>
    </Box>
  );
};

export default Movies;
