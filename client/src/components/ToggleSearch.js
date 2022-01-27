import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToggleSearch = ({ searchType, setSearchType, setStartIndex }) => {
  const handleSearchSelection = (event, newSearchType) => {
    setSearchType(newSearchType);
    setStartIndex(0);
  };

  return (
    <ToggleButtonGroup
      value={searchType}
      exclusive
      onChange={handleSearchSelection}
      sx={{ width: 'fit-content', mr: '15px', mt: '10px' }}
    >
      <ToggleButton value='word' size='small'>Word</ToggleButton>
      <ToggleButton value='phrase' size='small'>Phrase</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleSearch;
