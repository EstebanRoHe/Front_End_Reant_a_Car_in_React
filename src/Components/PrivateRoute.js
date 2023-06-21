import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/Login" replace state={{ from: rest.location }} />
        )
      }
    />
  );
};

export default PrivateRoute;


