import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import * as Yup from "yup";

import { StyledForm } from "../../styledComponents/styled";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import {
  dropStateRequest,
  errorLoginSelector,
  loginSuccessSelector,
  loginUser,
} from "./loginSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getUserProfile } from "./userSlice";
import ToggleEye from "../../common/ToggleEye";

export interface LoginFormValuesI {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loginSuccess = useAppSelector(loginSuccessSelector);
  const errorLogin = useAppSelector(errorLoginSelector);
  const initialValues: LoginFormValuesI = { email: "", password: "" };
  const [toggleEye, setToggleEye] = useState<boolean>(false);

  const togglePass = (): void => {
    setToggleEye(!toggleEye ? true : false);
  };

  useEffect(() => {
    if (loginSuccess) {
      history.push("/");
      dispatch(dropStateRequest());
      dispatch(getUserProfile());
    }
  }, [loginSuccess]);

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

  return (
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
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type={toggleEye ? "text" : "password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />{" "}
        <ToggleEye toggleEye={toggleEye} handleClick={togglePass} />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <button type="submit">Submit</button>
        {status}
        <span>
          No account? <Link to="/signup">Sign Up</Link>{" "}
        </span>
      </IconContext.Provider>
    </StyledForm>
  );
};

export default Login;
