import React from 'react';
import Button from '@mui/material/Button';

const MoreResultsButton = ({ onClickHandler }) => {
  return (
    <Button variant='contained' onClick={onClickHandler} sx={{ mb: '20px' }}>
      Load more results
    </Button>
  );
};

export default MoreResultsButton;
