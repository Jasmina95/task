const express = require('express');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
//const path = require('path');

const movieRoutes = require('./routes/movie.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(cors());

//app.use('/static', express.static(path.resolve(__dirname + '../../images')));

app.use('/', movieRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  }
});

module.exports = app;
