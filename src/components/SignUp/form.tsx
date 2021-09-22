import React, { useState } from "react";
import { useFormik } from "formik";
// @ts-ignore
import FlashMessage from "react-flash-message";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import ToggleEye from "../ToggleEye";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  signUpUser,
  statusSelector,
} from "../../store/signupSlice";
import { SignUpFormValuesI } from "../../../interfaces";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";

const initialValues: SignUpFormValuesI = {
  fullName: "",
  email: "",
  password: "",
  dob: "",
};

const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(statusSelector);
  const [toggleEye, setToggleEye] = useState<boolean>(false);

  const {
    resetForm,
    setFieldValue,
    handleBlur,
    handleChange,
    errors,
    touched,
    handleSubmit,
    values,
  } = useFormik({
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
    onSubmit: (value) => {
      dispatch(signUpUser(value));
      resetForm();
    },
  });
  const togglePass = (): void => {
    setToggleEye(!toggleEye);
  };

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFieldValue(e.target.name, e.target.value.trim());
    handleBlur(e);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <IconContext.Provider
        value={{ className: "react-icon__eye", size: "20px" }}
      >
        <label htmlFor="fullName">Имя Фамилия</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.fullName}
        />
        {touched.fullName && errors.fullName && <div>{errors.fullName}</div>}

        <label htmlFor="email">Электронная почта</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {touched.email && errors.email && <div>{errors.email}</div>}

        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          name="password"
          type={toggleEye ? "text" : "password"}
          onChange={handleChange}
          onBlur={handleOnBlur}
          value={values.password}
        />
        <ToggleEye toggleEye={toggleEye} handleClick={togglePass} />
        {touched.password && errors.password && (
        <div className="form-password__error">{errors.password}</div>
        )}

        <label htmlFor="dob">Дата рождения</label>
        <input
          id="dob"
          name="dob"
          type="date"
          min="1900-01-01"
          max="2016-12-31"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.dob}
        />
        {touched.dob && errors.dob && <div>{errors.dob}</div>}

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
          <span>
            Пользователь с такой электронной почтой уже существует
          </span>
        ) : (
          <span>Произошла ошибка при регистрации</span>
        )}
      </FlashMessage>
      )}
    </StyledForm>
  );
};

export default SignUpForm;
