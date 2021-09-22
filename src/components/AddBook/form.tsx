import React from "react";
import { useFormik } from "formik";
// @ts-ignore
import FlashMessage from "react-flash-message";
import styled, { keyframes } from "styled-components";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "../../store";
import { userIdSelector } from "../../store/userSlice";
import {
  addBook,
  errorsAddBookSelector,
  isSuccessAddedBookSelector,
} from "../../store/bookSlice";
import { CategoryI, InitialValuesAddBookI } from "../../../interfaces";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";

const initialValues: InitialValuesAddBookI = {
  title: "",
  author: "",
  creatorId: null,
  description: "",
  price: 100,
  rating: 0,
  snippet: "",
  category: "",
  file: null,
  image: "",
};
interface AddBookFormPropsI {
    category:CategoryI[]
}

const AddBookForm:React.FC<AddBookFormPropsI> = ({ category }) => {
  const dispatch = useAppDispatch();
  const userId: number | null = useAppSelector(userIdSelector);
  const isSuccessAddedBook = useAppSelector(isSuccessAddedBookSelector);
  const errorsAddBook = useAppSelector(errorsAddBookSelector);
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
      title: Yup.string()
        .max(255, "Может быть 255 символов и меньше")
        .required("Обязательное поле"),
      description: Yup.string().required("Обязательное поле"),
      price: Yup.number()
        .min(1, "Минимальная допустимая цена 1")
        .max(9999999, "Максимальная допустимая цена 9999999")
        .required("Обязательное поле"),
      category: Yup.number().required("Обязательное поле"),
      author: Yup.string().max(255).required("Обязательное поле"),
    }),
    onSubmit: (value: InitialValuesAddBookI) => {
      dispatch(addBook({ ...value, creatorId: userId }));
      resetForm();
    },
  });

  const handleHeaderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setFieldValue("file", (event.currentTarget.files as FileList)[0]);
  };
  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFieldValue(e.target.name, e.target.value.trim());
    handleBlur(e);
  };

  return (
    <StyledForm smallWidth onSubmit={handleSubmit}>
      <label htmlFor="title">Название</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={handleChange}
        onBlur={(e) => handleOnBlur(e)}
        value={values.title}
      />
      {touched.title && errors.title && <div>{errors.title}</div>}
      <label htmlFor="author">Автор</label>
      <input
        id="author"
        name="author"
        type="text"
        onChange={handleChange}
        onBlur={(e) => handleOnBlur(e)}
        value={values.author}
      />
      {touched.author && errors.author && <div>{errors.author}</div>}
      <label htmlFor="description">Описание</label>
      <textarea
        id="description"
        name="description"
        onChange={handleChange}
        onBlur={(e) => handleOnBlur(e)}
        value={values.description}
      />
      {touched.description && errors.description && (
      <div>{errors.description}</div>
      )}
      <label htmlFor="category">Категория</label>
      <select
        id="category"
        name="category"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.category}
      >
        <option value="" disabled label="Выберите категорию" />
        {category
            && category.map((item) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            ))}
      </select>
      {touched.category && errors.category ? (
        <div>{errors.category}</div>
      ) : null}
      <label htmlFor="price">Цена</label>
      <input
        id="price"
        name="price"
        type="number"
        min="1"
        max="9999999"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.price}
      />
      {touched.price && errors.price && <div>{errors.price}</div>}
      <label htmlFor="snippet">Ознакомительный фрагмент</label>
      <textarea
        id="snippet"
        name="snippet"
        onChange={handleChange}
        onBlur={(e) => handleOnBlur(e)}
        value={values.snippet}
      />
      <label htmlFor="file">Обложка</label>
      <input
        id="file"
        name="file"
        type="file"
        onChange={handleHeaderChange}
      />
      <StyledButton type="submit">Добавить</StyledButton>
      {isSuccessAddedBook && (
      <FlashMessage duration={5000}>
        <StyledNotificationPopUp>
          Книга успешно добавлена
        </StyledNotificationPopUp>
      </FlashMessage>
      )}
      {errorsAddBook && (
      <FlashMessage duration={3000}>
        {errorsAddBook === "Book already exist" ? (
          <span>Книга уже существует</span>
        ) : (
          <span>Произошла ошибка при добавлении</span>
        )}
      </FlashMessage>
      )}
    </StyledForm>
  );
};

export default AddBookForm;

const appearPopUp = keyframes`
from {
  top: -330%;
  right: -190%;
}
to {
  top: -330%;
  right: -120%;
}
`;

const StyledNotificationPopUp = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 70px;
  border: 1px solid #26a9e0;
  border-radius: 4px;
  color: #26a9e0;
  background-color: #fff;
  position: relative;
  animation: 1s ease-in 0s ${appearPopUp};
  top: -330%;
  right: -120%;
`;
