import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAppSelector } from "../store";
import { isAuthSelector } from "../store/userSlice";

const SignRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = ({ component: Component, ...rest }: any) => {
  const isAuth = useAppSelector(isAuthSelector);
  return (
    <Route
      {...rest}
      render={(props) => (isAuth
        ? (<Redirect to="/" />)
        : (<Component {...props} {...rest} />))}
    />
  );
};

export default SignRoute;
