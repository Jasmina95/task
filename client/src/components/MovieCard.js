import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Rating } from 'react-simple-star-rating';

const MovieCard = ({ movie }) => {
  return (
    <Card
      sx={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mr: '35px',
        mb: '35px'
      }}
    >
      {movie && (
        <CardMedia sx={{ mt: '15px' }}>
          <img
            src={`${process.env.PUBLIC_URL}/images/${movie.coverImage}`}
            alt={movie.coverImage}
            style={{ maxHeight: '250px', maxWidth: '90%' }}
          />
        </CardMedia>
      )}
      {movie && (
        <CardContent>
          <Typography
            variant='body1'
            align='center'
            sx={{ fontWeight: 'bold', mb: '10px' }}
          >
            {movie.title ? movie.title : ''}
          </Typography>
          <Typography variant='body2' align='left'>
            <span style={{ fontWeight: 'bold' }}>Description:</span>{' '}
            {movie.description ? movie.description : ''}
          </Typography>
          <Typography
            variant='body2'
            align='left'
            sx={{ mt: '10px', mb: '10px' }}
          >
            <span style={{ fontWeight: 'bold' }}>Cast:</span>{' '}
            {movie.cast && movie.cast.length > 0 ? movie.cast.join(', ') : ''}
          </Typography>
          <Typography variant='body2' align='left'>
            <span style={{ fontWeight: 'bold' }}>Release Date:</span>{' '}
            {movie.releaseDate
              ? new Date(movie.releaseDate).toLocaleDateString()
              : ''}
          </Typography>
          <Typography variant='body2' align='left' sx={{ mt: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>Rating:</span>{' '}
            {movie.averageRating ? (
              <span>
                <Rating
                  ratingValue={movie.averageRating * 20}
                  readonly
                  allowHalfIcon
                />
              </span>
            ) : (
              <Rating ratingValue={0} readonly allowHalfIcon />
            )}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default MovieCard;
