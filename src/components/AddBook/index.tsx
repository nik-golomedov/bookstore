import React, { useEffect } from "react";

import { useFormik } from "formik";
// @ts-ignore
import FlashMessage from "react-flash-message";
import styled, { keyframes } from "styled-components";
import * as Yup from "yup";

import { InitialValuesAddBookI } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addBook,
  categorySelector,
  clearAddBookRequest,
  errorsAddBookSelector,
  getCategory,
  isSuccessAddedBookSelector,
} from "../../store/bookSlice";
import { userIdSelector } from "../../store/userSlice";
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

const AddBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId: number | null = useAppSelector(userIdSelector);
  const category = useAppSelector(categorySelector);
  const isSuccessAddedBook = useAppSelector(isSuccessAddedBookSelector);
  const errorsAddBook = useAppSelector(errorsAddBookSelector);
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().min(1).max(9999999).required("Required"),
      category: Yup.number().required("Required"),
      author: Yup.string().max(255).required("Required"),
    }),
    onSubmit: (values: InitialValuesAddBookI) => {
      dispatch(addBook({ ...values, creatorId: userId }));
      formik.resetForm();
    },
  });

  const handleHeaderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    formik.setFieldValue("file", (event.currentTarget.files as FileList)[0]);
  };
  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    formik.setFieldValue(e.target.name, e.target.value.trim());
    formik.handleBlur(e);
  };

  useEffect(() => {
    setTimeout(() => dispatch(clearAddBookRequest()), 2000);
  }, [isSuccessAddedBook]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <StyledAddBook>
      <StyledForm smallWidth onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Название</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={(e) => handleOnBlur(e)}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title && (
          <div>{formik.errors.title}</div>
        )}
        <label htmlFor="author">Автор</label>
        <input
          id="author"
          name="author"
          type="text"
          onChange={formik.handleChange}
          onBlur={(e) => handleOnBlur(e)}
          value={formik.values.author}
        />
        {formik.touched.author && formik.errors.author && (
          <div>{formik.errors.author}</div>
        )}
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={(e) => handleOnBlur(e)}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description && (
          <div>{formik.errors.description}</div>
        )}
        <label htmlFor="category">Категория</label>
        <select
          id="category"
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
        >
          <option value="" disabled label="Выберите категорию" />
          {category
            && category.map((item) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            ))}
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div>{formik.errors.category}</div>
        ) : null}
        <label htmlFor="price">Цена</label>
        <input
          id="price"
          name="price"
          type="number"
          min="1"
          max="9999999"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price && (
          <div>{formik.errors.price}</div>
        )}
        <label htmlFor="snippet">Ознакомительный фрагмент</label>
        <textarea
          id="snippet"
          name="snippet"
          onChange={formik.handleChange}
          onBlur={(e) => handleOnBlur(e)}
          value={formik.values.snippet}
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
            <div>
              Произошла ошибка при добавлении
            </div>
          </FlashMessage>
        )}
      </StyledForm>
    </StyledAddBook>
  );
};

export default AddBook;

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

const StyledAddBook = styled.div`
  form {
    margin: 0 auto 20px;
  }
`;
