import React, { useEffect } from "react";

import { useFormik } from "formik";
// @ts-ignore
import FlashMessage from "react-flash-message";
import styled from "styled-components";
import * as Yup from "yup";

import { AddCategoryI } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addCategory,
  errorsAddedCategorySelector,
  isErrorAddCategorySelector,
  isSuccessAddCategorySelector,
} from "../../store/bookSlice";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";

const AddCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSuccessAddCategory = useAppSelector(isSuccessAddCategorySelector);
  const isErrorAddCategory = useAppSelector(isErrorAddCategorySelector);
  const errorsAddedCategory = useAppSelector(errorsAddedCategorySelector);

  const formik = useFormik({
    initialValues: { category: "" },
    validationSchema: Yup.object({
      category: Yup.string().required("Обязательное поле"),
    }),
    onSubmit: (values: AddCategoryI) => {
      dispatch(addCategory(values));
      formik.resetForm();
    },
  });

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    formik.setFieldValue(e.target.name, e.target.value.trim());
    formik.handleBlur(e);
  };

  useEffect(() => {}, [isSuccessAddCategory, isErrorAddCategory]);
  return (
    <StyledCategory>
      <StyledForm onSubmit={formik.handleSubmit}>
        <label htmlFor="category">Добавить категорию</label>
        <input
          id="category"
          name="category"
          type="text"
          onChange={formik.handleChange}
          onBlur={handleOnBlur}
          value={formik.values.category}
        />
        {formik.touched.category && formik.errors.category && (
          <div>{formik.errors.category}</div>
        )}
        <StyledButton type="submit">Добавить</StyledButton>
        {isSuccessAddCategory && (
          <FlashMessage duration={3000}>
            <span>Категория успешно добавлена</span>
          </FlashMessage>
        )}
        {isErrorAddCategory && (
          <FlashMessage duration={3000}>
            {errorsAddedCategory === "Category already exist" ? (
              <span className="message-error">Категория уже существует</span>
            ) : (
              <span className="message-error">
                Произошла ошибка при добавлении
              </span>
            )}
          </FlashMessage>
        )}
      </StyledForm>
    </StyledCategory>
  );
};

export default AddCategory;

const StyledCategory = styled.div`
  form {
    margin: 0 auto;
  }
  button {
    margin-top: 20px;
  }
  span {
    color: black;
    display: inline-block;
    text-align: center;
  }
  .message-error {
    color: red;
  }
`;
