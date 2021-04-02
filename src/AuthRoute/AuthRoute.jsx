import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../App";

const AuthRoute = ({ children, ...rest }) => {
  const [LoggedInUserInfo] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        LoggedInUserInfo?.displayName ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
