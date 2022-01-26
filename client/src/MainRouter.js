import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Movies from './components/Movies';
import Login from './components/auth/Login';
import Signup from './components/user/Signup';
import RateMovies from './components/RateMovies';
import PrivateRoute from './components/auth/PrivateRoute';

const MainRouter = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<Movies />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
        <Route
          exact
          path='/movies/rate'
          element={
            <PrivateRoute>
              <RateMovies />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MainRouter;
