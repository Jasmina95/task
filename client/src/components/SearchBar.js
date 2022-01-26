import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SearchBar = ({ inputValue, setInputValue, setStartIndex }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const onChangeHandler = e => {
    setStartIndex(0);
    setInputValue(e.target.value);
  };

  return (
    <TextField
      variant='outlined'
      placeholder='Search..'
      size='small'
      value={inputValue}
      onChange={onChangeHandler}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        )
      }}
      sx={{ width: matches ? '70%' : '50%', mr: '15px' }}
    />
  );
};

export default SearchBar;
