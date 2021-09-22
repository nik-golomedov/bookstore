import React, { useState } from "react";
import { useFormik } from "formik";
// @ts-ignore
import FlashMessage from "react-flash-message";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import ToggleEye from "../ToggleEye";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  errorLoginSelector,
  loginUser,
} from "../../store/loginSlice";
import { clearStatus, statusSelector } from "../../store/signupSlice";
import { LoginFormValuesI } from "../../../interfaces";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(statusSelector);
  const errorLogin = useAppSelector(errorLoginSelector);
  const initialValues: LoginFormValuesI = { email: "", password: "" };
  const [toggleEye, setToggleEye] = useState<boolean>(false);

  const togglePass = (): void => {
    setToggleEye(!toggleEye);
  };

  const {
    resetForm,
    handleBlur,
    handleChange,
    errors,
    touched,
    handleSubmit,
    values,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Неправильный адрес электронной почты")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Пароль должен быть 6 символов или больше")
        .required("Обязательное поле"),
    }),
    onSubmit: (value: LoginFormValuesI) => {
      dispatch(loginUser(value));
      resetForm();
    },
  });

  const handleClearSignInStatus = () => dispatch(clearStatus());

  return (
    <StyledForm onSubmit={handleSubmit}>
      <IconContext.Provider
        value={{ className: "react-icon__eye", size: "20px" }}
      >
        {status === "Registration success" && (
        <span>Вы успешно зарегистрировались</span>
        )}
        {/* {errorLogin &&} */}
        {errorLogin && (
        <FlashMessage duration={2000}>
          {errorLogin === "Enter correct email and/or password" ? (
            <span>
              Введите корректный адрес электронной почты и/или пароль
            </span>
          ) : (
            <span>Произошла ошибка при входе</span>
          )}
        </FlashMessage>
        )}
        <label htmlFor="email">Электронная почта</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {touched.email && errors.email && (
        <div>{errors.email}</div>
        )}
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          name="password"
          type={toggleEye ? "text" : "password"}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        <ToggleEye toggleEye={toggleEye} handleClick={togglePass} />
        {touched.password && errors.password && (
        <div className="form-password__error">{errors.password}</div>
        )}
        <StyledButton widthSmall type="submit">
          Отправить
        </StyledButton>
        <span>
          Нет аккаунта?
          <Link to="/signup" onClick={handleClearSignInStatus}>
            <span> Зарегистрируйтесь</span>
          </Link>
        </span>
      </IconContext.Provider>
    </StyledForm>
  );
};

export default LoginForm;
