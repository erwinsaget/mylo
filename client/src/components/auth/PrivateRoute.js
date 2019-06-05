import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, login, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        login ? (
          <Component login={login} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
