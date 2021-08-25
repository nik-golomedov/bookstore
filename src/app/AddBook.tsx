import { useFormik } from "formik";
import React, { ChangeEventHandler, SyntheticEvent } from "react";
import { useAppDispatch } from "../common/hooks";
import { addBook } from "../features/bookSlice";
import { StyledForm } from "../styledComponents/styled";

export interface initialValuesAddBookI {
  title: string;
  author: string;
  description: string;
  price: number;
  snippet?: string;
  header?: string;
}
const initialValues: initialValuesAddBookI = {
  title: "",
  author: "",
  description: "",
  price: 0,
  snippet: "",
  header: "",
};

const AddBook = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: (values: initialValuesAddBookI) => {
      dispatch(addBook(values));
      console.log({
        values,
      });
      formik.resetForm();
    },
  });
  const handleHeaderChange = (event: any): void => {
    formik.setFieldValue("header", event.currentTarget.files[0]);
  };
  return (
    <div>
      <StyledForm onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title</label>
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

        <label htmlFor="author">Author</label>
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

        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}

        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price ? (
          <div>{formik.errors.price}</div>
        ) : null}

        <label htmlFor="snippet">Snippet</label>
        <input
          id="snippet"
          name="snippet"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.snippet}
        />

        {/* <label htmlFor="header">Header</label>
        <input
          id="header"
          name="header"
          type="file"
          onChange={(event:any)=>{
            formik.setFieldValue("header", event.currentTarget.files[0])}}
          value={formik.values.header}
        />
        {formik.touched.header && formik.errors.header ? (
          <div>{formik.errors.header}</div>
        ) : null} */}
        <button type="submit">Submit</button>
        {status}
      </StyledForm>
    </div>
  );
};

export default AddBook;
