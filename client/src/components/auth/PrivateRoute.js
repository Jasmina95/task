import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth-helper';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to='/' />;
};

export default PrivateRoute;
