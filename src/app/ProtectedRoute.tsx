import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

const ProtectedRoute:React.FC<{component:React.FC;path:string;exact:boolean}> = ({
  component: Component,
  ...rest
}: any) => {
  const isAuth = localStorage.getItem("isAuth");
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
