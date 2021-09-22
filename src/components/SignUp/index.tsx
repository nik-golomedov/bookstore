import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import SignUpForm from "./form";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  clearStatus,
  statusSelector,
} from "../../store/signupSlice";

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const status = useAppSelector(statusSelector);

  const clearStatusDelay = (ms: number) => {
    setTimeout(() => dispatch(clearStatus()), ms);
  };

  useEffect(() => {
    if (status === "Registration success") {
      history.push("/login");
      clearStatusDelay(5000);
    } else {
      clearStatusDelay(3000);
    }
  }, [status]);

  return (
    <StyledSignUp>
      <SignUpForm />
    </StyledSignUp>
  );
};

export default SignUp;

const StyledSignUp = styled.div`
  form {
    margin: 0 auto 20px;
  }
  button {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  input {
    font-family: Roboto;
  }
`;
