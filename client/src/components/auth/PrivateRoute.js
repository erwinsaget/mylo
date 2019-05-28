import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, login, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        login ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.defaultProps = {
  login: null
}

PrivateRoute.propTypes = {
  login: PropTypes.any.isRequired
}

export default PrivateRoute;
