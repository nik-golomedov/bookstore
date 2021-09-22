import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import LoginForm from "./form";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  dropStateRequest,
  errorLoginSelector,
  loginSuccessSelector,
} from "../../store/loginSlice";
import { getUserProfile } from "../../store/userSlice";
import { socketSelector } from "../../store/appSlice";

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const socket = useAppSelector(socketSelector);
  const loginSuccess = useAppSelector(loginSuccessSelector);
  const errorLogin = useAppSelector(errorLoginSelector);

  const clearLoginState = (ms: number) => {
    setTimeout(() => dispatch(dropStateRequest()), ms);
  };

  useEffect(() => {
    if (loginSuccess) {
      history.push("/");
      dispatch(dropStateRequest());
      dispatch(getUserProfile());
      socket?.connect();
    } else {
      clearLoginState(5000);
    }
  }, [loginSuccess, errorLogin]);

  return (
    <StyledLogin>
      <LoginForm />
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.div`
  form {
    margin: 0 auto;
  }
  div {
    margin-top: 10px;
  }
  span {
    font-size: 16px;
    margin-top: 10px;
  }
  button {
    margin-top: 20px;
  }
`;
