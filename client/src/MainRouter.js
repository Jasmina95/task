import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Movies from './components/Movies';

const MainRouter = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<Movies />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
