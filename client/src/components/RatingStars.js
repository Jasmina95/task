import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const RatingStars = ({ submitRating }) => {
  const [rating, setRating] = useState(0);

  const handleRating = rate => {
    setRating(rate / 20);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Rating onClick={handleRating} ratingValue={rating} />
      &nbsp;&nbsp;
      <Button variant='contained' onClick={() => submitRating(rating)}>
        Rate
      </Button>
    </Box>
  );
};

export default RatingStars;
