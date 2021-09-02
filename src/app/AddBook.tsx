import { useFormik } from "formik";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../common/hooks";
import { addBook, CategoryI, getCategory } from "../features/bookSlice";
import { StyledButton, StyledForm } from "../styledComponents/styled";

export interface initialValuesAddBookI {
  title: string;
  author: string;
  description: string;
  price: number;
  snippet?: string;
  creator: number | null;
  rating: number;
  category: string;
  file?: File | null;
  image: string;
}

const initialValues: initialValuesAddBookI = {
  title: "",
  author: "",
  creator: null,
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
  const userId: number | null = useAppSelector(
    (state) => state.user.user && state.user.user.id
  );
  const category = useAppSelector(
    (state) => state.books && state.books.category
  );
  
  const formik = useFormik({
    initialValues,
    onSubmit: (values: initialValuesAddBookI) => {
      dispatch(addBook({ ...values, creator: userId }));
      formik.resetForm();
    },
  });

  const handleHeaderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    formik.setFieldValue("file", (event.currentTarget.files as FileList)[0]);
  };

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

        <label htmlFor="author">Автор</label>
        <input
          id="author"
          name="author"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.author}
        />

        <label htmlFor="description">Описание</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />

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

        <label htmlFor="snippet">Ознакомительный фрагмент</label>
        <input
          id="snippet"
          name="snippet"
          type="text"
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
        {status}
      </StyledForm>
    </div>
  );
};

export default AddBook;
