import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { StyledForm } from "../styledComponents/styled";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { dropStatus, signUpUser } from "../features/signupSlice";
import { useEffect } from "react";
import { IconContext } from "react-icons";

export interface FormValuesI {
  fullName: string;
  email: string;
  password: string;
  dob: string;
}

const initialValues: FormValuesI = {
  fullName: "",
  email: "",
  password: "",
  dob: "",
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const status = useAppSelector((state) => state.signUp.status);
  const [toggleEye, setToggleEye] = useState<boolean>(false);
  const togglePass = (): void => {
    setToggleEye(!toggleEye ? true : false);
  };
  useEffect(() => {
    if (status === "Registration success") {
      history.push("/login");
      setTimeout(() => dispatch(dropStatus()), 1000);
    } else {
      setTimeout(() => dispatch(dropStatus()), 3000)
    }
  }, [status]);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Required")
        .matches(/\w+\s\w+/i, { message: "Enter: Firstname Lastname" }),
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
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <IconContext.Provider value={{ className:"react-icon__eye", size: "20px" }}>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div>{formik.errors.fullName}</div>
        ) : null}

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
        />
        <AiFillEye onClick={togglePass} />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <label htmlFor="dob">Date of birthday</label>
        <input
          id="dob"
          name="dob"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dob}
        />
        {formik.touched.dob && formik.errors.dob ? (
          <div>{formik.errors.dob}</div>
        ) : null}

        <button type="submit">Submit</button>
        {status !== "Registration success" && <div>{status}</div>}
        <span>
          Already have account? <Link to="/login">Login</Link>{" "}
        </span>
      </IconContext.Provider>
    </StyledForm>
  );
};

export default SignUp;
