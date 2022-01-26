const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Movie title is required!'
  },
  coverImage: {
    type: String,
    required: 'Cover image is required!'
  },
  description: {
    type: String,
    required: 'Movie description is required!'
  },
  releaseDate: {
    type: Date,
    required: 'Release date is required!'
  },
  type: {
    type: String,
    required: 'Type is required! Is it movie or TV Show?',
    enum: {
      values: ['movie', 'tv show'],
      message: '{VALUE} is not supported!'
    }
  },
  cast: [String],
  averageRating: {
    type: Number,
    default: 0
  },
  ratings: [
    { value: Number, ratedBy: { type: mongoose.Schema.ObjectId, ref: 'User' } }
  ]
});

MovieSchema.path('cast').validate(function (cast) {
  if (!cast) {
    return false;
  } else if (cast.length < 2) {
    return false;
  } else {
    return true;
  }
}, 'There must be at least two actors present!');

MovieSchema.index(
  { title: 'text', description: 'text', cast: 'text' },
  { weights: { title: 3, description: 1, cast: 2 } }
);

module.exports = mongoose.model('Movie', MovieSchema);
