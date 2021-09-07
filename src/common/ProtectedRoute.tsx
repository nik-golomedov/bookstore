import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthSelector } from "../features/auth/userSlice";
import { useAppSelector } from "./hooks";

const ProtectedRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = ({ component: Component, ...rest }: any) => {
  const isAuth = useAppSelector(isAuthSelector);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} {...rest} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;