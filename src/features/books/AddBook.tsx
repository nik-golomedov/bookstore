import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
//@ts-ignore
import FlashMessage from "react-flash-message";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import {
  addBook,
  categorySelector,
  clearAddBookRequest,
  errorsAddBookSelector,
  getCategory,
  isSuccessAddedBookSelector,
} from "./bookSlice";
import { StyledButton, StyledForm } from "../../styledComponents/styled";
import { userIdSelector } from "../auth/userSlice";

export interface initialValuesAddBookI {
  title: string;
  author: string;
  description: string;
  price: number;
  snippet?: string;
  creatorId: number | null;
  rating: number;
  category: string;
  file?: File | null;
  image: string;
}

const initialValues: initialValuesAddBookI = {
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
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().min(1).max(9999999).required("Required"),
      category: Yup.number().required("Required"),
      author: Yup.string().required("Required"),
    }),
    onSubmit: (values: initialValuesAddBookI) => {
      dispatch(addBook({ ...values, creatorId: userId }));
      formik.resetForm();
    },
  });

  const handleHeaderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    formik.setFieldValue("file", (event.currentTarget.files as FileList)[0]);
  };

  useEffect(() => {
    setTimeout(() => dispatch(clearAddBookRequest()), 2000);
  }, [isSuccessAddedBook]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <div>
      <StyledForm onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Название</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div>{formik.errors.title}</div>
        ) : null}
        <label htmlFor="author">Автор</label>
        <input
          id="author"
          name="author"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.author}
        />
        {formik.touched.author && formik.errors.author ? (
          <div>{formik.errors.author}</div>
        ) : null}
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}
        <label htmlFor="category">Категория</label>
        <select
          id="category"
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
        >
          <option value="" disabled label="Выберите категорию" />
          {category &&
            category.map((item) => (
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
        {formik.touched.price && formik.errors.price ? (
          <div>{formik.errors.price}</div>
        ) : null}
        <label htmlFor="snippet">Ознакомительный фрагмент</label>
        <textarea
          id="snippet"
          name="snippet"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.snippet}
        />

        <label htmlFor="file">Обложка</label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={handleHeaderChange}
        />
        {formik.touched.file && formik.errors.file ? (
          <div>{formik.errors.file}</div>
        ) : null}
        <StyledButton type="submit">Добавить</StyledButton>
        {isSuccessAddedBook && (
          <FlashMessage duration={5000}>
            <div> Книга успешно добавлена</div>
          </FlashMessage>
        )}
        {errorsAddBook && (
          <FlashMessage duration={3000}>
            <div> errorsAddBook</div>
          </FlashMessage>
        )}
      </StyledForm>
    </div>
  );
};

export default AddBook;
