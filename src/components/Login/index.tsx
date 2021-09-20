import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
// @ts-ignore
import FlashMessage from "react-flash-message";
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
import { clearStatus, statusSelector } from "../../store/signupSlice";
import { getUserProfile } from "../../store/userSlice";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";
import ToggleEye from "../ToggleEye";

const Login: React.FC<SocketI> = ({ socket }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const status = useAppSelector(statusSelector);
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
      email: Yup.string()
        .email("Неправильный адрес электронной почты")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Пароль должен быть 6 символов или больше")
        .required("Обязательное поле"),
    }),
    onSubmit: (values: LoginFormValuesI) => {
      dispatch(loginUser(values));
      formik.resetForm();
    },
  });

  const clearLoginState = (ms: number) => {
    setTimeout(() => dispatch(dropStateRequest()), ms);
  };
  const handleClearSignInStatus = () => dispatch(clearStatus());

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
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <ToggleEye toggleEye={toggleEye} handleClick={togglePass} />
          {formik.touched.password && formik.errors.password && (
            <div className="form-password__error">{formik.errors.password}</div>
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
