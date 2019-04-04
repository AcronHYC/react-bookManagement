import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../utils/cookie";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !!isAuthenticated("uuid") ? (
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

export default PrivateRoute;
