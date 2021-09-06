import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { isAuthSelector } from "../features/auth/userSlice";
import { useAppSelector } from "./hooks";

const SignRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = ({ component: Component, ...rest }: any) => {
  const isAuth = useAppSelector(isAuthSelector);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Redirect to="/" /> : <Component {...props} {...rest} />
      }
    />
  );
};

export default SignRoute;
