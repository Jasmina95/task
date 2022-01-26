import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const onChangeHandler = e => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h2>Search</h2>
    </div>
  );
};

export default SearchBar;
