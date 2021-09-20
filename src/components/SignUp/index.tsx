import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
// @ts-ignore
import FlashMessage from "react-flash-message";
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
        .required("Обязательное поле")
        .matches(/^\w+\s\w+$/i, {
          message: "Введите данные в формате \"Имя Фамилия\"",
        }),
      email: Yup.string()
        .email("Неправильный адрес электронной почты")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Пароль должен быть 6 символов или больше")
        .required("Обязательное поле"),
      dob: Yup.string().required("Обязательное поле"),
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

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    formik.setFieldValue(e.target.name, e.target.value.trim());
    formik.handleBlur(e);
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
      <StyledForm onSubmit={formik.handleSubmit}>
        <IconContext.Provider
          value={{ className: "react-icon__eye", size: "20px" }}
        >

          <label htmlFor="fullName">Имя Фамилия</label>
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

          <label htmlFor="email">Электронная почта</label>
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

          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            name="password"
            type={toggleEye ? "text" : "password"}
            onChange={formik.handleChange}
            onBlur={handleOnBlur}
            value={formik.values.password}
          />
          <ToggleEye toggleEye={toggleEye} handleClick={togglePass} />
          {formik.touched.password && formik.errors.password && (
            <div className="form-password__error">{formik.errors.password}</div>
          )}

          <label htmlFor="dob">Дата рождения</label>
          <input
            id="dob"
            name="dob"
            type="date"
            min="1900-01-01"
            max="2016-12-31"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
          />
          {formik.touched.dob && formik.errors.dob && (
            <div>{formik.errors.dob}</div>
          )}

          <StyledButton widthSmall type="submit">
            Отправить
          </StyledButton>

          <span>
            Уже есть аккаунт?
            <Link to="/login"> Войти</Link>
          </span>
        </IconContext.Provider>
        {status && (
        <FlashMessage duration={2000}>
          {status === "User already exist" ? (
            <span>Пользователь с такой электронной почтой уже существует</span>
          ) : (
            <span>Произошла ошибка при регистрации</span>
          )}
        </FlashMessage>
        )}
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
    margin-bottom: 20px;
  }
  input {
    font-family: Roboto;
  }
`;
