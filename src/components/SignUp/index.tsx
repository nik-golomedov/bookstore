import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import { IconContext } from "react-icons";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";

import { SignUpFormValuesI } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  clearStatus,
  signUpUser,
  statusSelector,
} from "../../store/signupSlice";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";
import ToggleEye from "../ToggleEye";

const initialValues: SignUpFormValuesI = {
  fullName: "",
  email: "",
  password: "",
  dob: "",
};

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const status = useAppSelector(statusSelector);
  const [toggleEye, setToggleEye] = useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Required")
        .matches(/^\w+\s\w+$/i, { message: "Enter: Firstname Lastname" }),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      dob: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(signUpUser(values));
      formik.resetForm();
    },
  });

  const togglePass = (): void => {
    setToggleEye(!toggleEye);
  };

  const clearStatusDelay = (ms: number) => {
    setTimeout(() => dispatch(clearStatus()), ms);
  };

  useEffect(() => {
    if (status === "Registration success") {
      history.push("/login");
      clearStatusDelay(1000);
    } else {
      clearStatusDelay(3000);
    }
  }, [status]);

  return (
    <StyledSignUp>
      <StyledForm onSubmit={formik.handleSubmit}>
        <IconContext.Provider
          value={{ className: "react-icon__eye", size: "20px" }}
        >
          {status !== "Registration success" && <div>{status}</div>}
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div>{formik.errors.fullName}</div>
          )}

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

          <label htmlFor="dob">Date of birthday</label>
          <input
            id="dob"
            name="dob"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
          />
          {formik.touched.dob && formik.errors.dob && (
            <div>{formik.errors.dob}</div>
          )}
          <StyledButton widthSmall type="submit">
            Submit
          </StyledButton>

          <span>
            Already have account?
            <Link to="/login"> Login</Link>
          </span>
        </IconContext.Provider>
      </StyledForm>
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
    margin-bottom:20px;
  }
`;
