const express = require('express');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const movieRoutes = require('./routes/movie.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/', movieRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  }
});

module.exports = app;
