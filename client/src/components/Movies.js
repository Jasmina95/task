import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SearchBar from './SearchBar';
import SwitchComponent from './SwitchComponent';
import { getTopRatedMovies, searchMovies } from '../apis/movie-api';
import MovieList from './MovieList';
import MoreResultsButton from './MoreResultsButton';
import ToggleSearch from './ToggleSearch';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [totalNumberOfFoundMovies, setTotalNumberOfFoundMovies] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [checked, setChecked] = useState(true);
  const [searchType, setSearchType] = useState('word');

  useEffect(() => {
    if (!inputValue) {
      getTopRatedMovies(startIndex, checked).then(data => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setMovies(data.movies);
          setTotalNumberOfFoundMovies(data.numberOfMovies);
          setStartIndex(0);
        }
      });
    } //eslint-disable-next-line
  }, [inputValue, checked]);

  useEffect(() => {
    if (inputValue && inputValue.length > 1) {
      searchMovies(inputValue, startIndex, checked, searchType).then(data => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setMovies(data.movies);
          setStartIndex(0);
          setTotalNumberOfFoundMovies(data.numberOfMovies);
        }
      });
    } //eslint-disable-next-line
  }, [inputValue, checked, searchType]);

  const onClickHandler = () => {
    if (!inputValue) {
      getTopRatedMovies(startIndex + 1, checked).then(data => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setMovies([...movies, ...data.movies]);
        }
      });
      setStartIndex(prev => prev + 1);
    } else if (inputValue && inputValue.length > 1) {
      searchMovies(inputValue, startIndex + 1, checked, searchType).then(
        data => {
          if (data && data.error) {
            console.log(data.error);
          } else {
            setMovies([...movies, ...data.movies]);
          }
        }
      );
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
          <ToggleSearch
            searchType={searchType}
            setSearchType={setSearchType}
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
