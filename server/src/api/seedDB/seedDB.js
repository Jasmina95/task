const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname + '../../../../.env')
});

const config = require('../../config/config');

const User = require('../models/user.model');
const Movie = require('../models/movie.model');

const users = require('./users.json');
const movies = require('./movies.json');

async function processData() {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(config.mongoUri)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(() => console.log('Error connecting to MongoDB'));

  for (let i = 0; i < users.data.length; i++) {
    if (i === 0) {
      console.log('Seeding users ...');
    }

    const userObj = {
      name: users.data[i].name,
      email: users.data[i].email,
      password: users.data[i].password
    };

    const modelInstance = new User(userObj);
    await modelInstance.save();
  }

  for (let i = 0; i < movies.data.length; i++) {
    if (i === 0) {
      console.log('Seeding movies ...');
    }

    const movieObj = {
      title: movies.data[i].title,
      coverImage: movies.data[i].coverImage,
      description: movies.data[i].description,
      releaseDate: movies.data[i].releaseDate,
      type: movies.data[i].type,
      cast: movies.data[i].cast
    };

    const modelInstance = new Movie(movieObj);
    await modelInstance.save();
  }

  const movieTitles = [
    'The Shawshank Redemption',
    'The Godfather',
    'The Dark Knight',
    '12 Angry Men',
    "Schindler's List",
    'The Lord of the Rings: The Return of the King',
    'Pulp Fiction',
    'The Good, the Bad and the Ugly',
    'The Lord of the Rings: The Fellowship of the Ring',
    'Fight Club',
    'Inception',
    'Star Wars: Episode V - The Empire Strikes Back',
    'Goodfellas',
    'Seven Samurai',
    'The Silence of the Lambs',
    'Interstellar',
    'Planet Earth II',
    'Planet Earth',
    'Breaking Bad',
    'Band of Brothers',
    'Chernobyl',
    'Cosmos',
    'Game of Thrones',
    'Sherlock',
    'True Detective',
    'Friends'
  ];

  const rating = [
    5, 4, 2, 1, 3, 5, 4, 2, 5, 4, 4, 4, 2, 1, 5, 3, 3, 3, 5, 4, 1, 4, 2, 5, 3, 5
  ];

  const usersArary = ['esmir@task.com', 'lejla@task.com'];

  for (let i = 0; i < movieTitles.length; i++) {
    if (i === 0) {
      console.log('Seeding Ratings ...');
    }
    let user = await User.findOne({ email: usersArary[i % 2] });

    let newRating = { value: rating[i] };
    newRating.ratedBy = user._id;

    await Movie.findOneAndUpdate(
      { title: movieTitles[i] },
      { $push: { ratings: newRating }, averageRating: rating[i] }
    );
  }

  mongoose.connection
    .close()
    .then(() =>
      console.log('Done seeding MongoDB. MongoDB connection is closed!')
    );
}

processData();
