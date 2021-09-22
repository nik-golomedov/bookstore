import React, { useEffect } from "react";
import { useFormik } from "formik";
// @ts-ignore
import FlashMessage from "react-flash-message";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  addCategory,
  errorsAddedCategorySelector,
  isErrorAddCategorySelector,
  isSuccessAddCategorySelector,
} from "../../store/bookSlice";
import { AddCategoryI } from "../../../interfaces";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";

const AddCategoryForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSuccessAddCategory = useAppSelector(isSuccessAddCategorySelector);
  const isErrorAddCategory = useAppSelector(isErrorAddCategorySelector);
  const errorsAddedCategory = useAppSelector(errorsAddedCategorySelector);

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
    initialValues: { category: "" },
    validationSchema: Yup.object({
      category: Yup.string().required("Обязательное поле"),
    }),
    onSubmit: (value: AddCategoryI) => {
      dispatch(addCategory(value));
      resetForm();
    },
  });

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFieldValue(e.target.name, e.target.value.trim());
    handleBlur(e);
  };

  useEffect(() => {}, [isSuccessAddCategory, isErrorAddCategory]);
  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="category">Добавить категорию</label>
      <input
        id="category"
        name="category"
        type="text"
        onChange={handleChange}
        onBlur={handleOnBlur}
        value={values.category}
      />
      {touched.category && errors.category && (
      <div>{errors.category}</div>
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
  );
};

export default AddCategoryForm;
