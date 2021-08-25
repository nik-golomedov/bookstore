import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../common/hooks";

const SignRoute:React.FC<{component:React.FC;path:string;exact:boolean}> = ({
  component: Component,
  ...rest
}: any) => {
  const isAuth = useAppSelector(state=>state.user?.user);
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
