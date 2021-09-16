import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { IconContext } from "react-icons/lib";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";

import { LoginFormValuesI, SocketI } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  dropStateRequest,
  errorLoginSelector,
  loginSuccessSelector,
  loginUser,
} from "../../store/loginSlice";
import { getUserProfile } from "../../store/userSlice";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";
import ToggleEye from "../ToggleEye";

const Login: React.FC<SocketI> = ({ socket }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loginSuccess = useAppSelector(loginSuccessSelector);
  const errorLogin = useAppSelector(errorLoginSelector);
  const initialValues: LoginFormValuesI = { email: "", password: "" };
  const [toggleEye, setToggleEye] = useState<boolean>(false);

  const togglePass = (): void => {
    setToggleEye(!toggleEye);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
    }),
    onSubmit: (values: LoginFormValuesI) => {
      dispatch(loginUser(values));
      formik.resetForm();
    },
  });

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
      <StyledForm onSubmit={formik.handleSubmit}>
        <IconContext.Provider
          value={{ className: "react-icon__eye", size: "20px" }}
        >
          <div>{errorLogin}</div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.email}</div>
          )}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type={toggleEye ? "text" : "password"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <ToggleEye toggleEye={toggleEye} handleClick={togglePass} />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
          <StyledButton widthSmall type="submit">
            Submit
          </StyledButton>
          <span>
            No account?
            <Link to="/signup"> Sign Up</Link>
          </span>
        </IconContext.Provider>
      </StyledForm>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.div`
  form {
    margin: 0 auto;
  }
  div {
    margin-top:10px;
  }
  span {
    font-size: 16px;
    margin-top: 10px;
  }
  button {
    margin-top: 20px;
  }
`;
