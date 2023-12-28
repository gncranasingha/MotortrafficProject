import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, userRole, allowedRoles,officeLocation, ...rest }) => {
  // console.log("PrivateRoute - isAuthenticated:", isAuthenticated);
  // console.log("PrivateRoute - userRole:", userRole);
  // console.log("PrivateRoute - allowedRoles:", allowedRoles);

  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && allowedRoles.includes(userRole) ? (
          <Component {...props} officeLocation={officeLocation} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;