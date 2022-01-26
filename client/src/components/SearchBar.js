import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';

const SearchBar = ({ inputValue, setInputValue, setStartIndex }) => {
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
      sx={{ width: '50%', mr: '15px' }}
    />
  );
};

export default SearchBar;
