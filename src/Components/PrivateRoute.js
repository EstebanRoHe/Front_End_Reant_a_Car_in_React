import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthServices from '../services/authServices';

function PrivateRoute({ element: Component, ...rest }) {
  const isAuthenticated = !!AuthServices.getAuthToken();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/Login" replace />}
    />
  );
}

export default PrivateRoute;


