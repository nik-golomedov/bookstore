import { useFormik } from "formik";
import React, { ChangeEventHandler, SyntheticEvent } from "react";
import { useAppDispatch } from "../common/hooks";
import { addBook } from "../features/bookSlice";
import { StyledForm } from "../styledComponents/styled";
import randomstring from "randomstring";
export interface initialValuesAddBookI {
  title: string;
  author: string;
  description: string;
  price: number;
  snippet?: string;
  file?: File | null;
  image:string
}
const initialValues: initialValuesAddBookI = {
  title: "",
  author: "",
  description: "",
  price: 0,
  snippet: "",
  file: null,
  image:""
};

const AddBook = () => {
  const dispatch = useAppDispatch();
  let randString: string = randomstring.generate();
  const formik = useFormik({
    initialValues,
    onSubmit: (values: initialValuesAddBookI) => {
      dispatch(addBook(values));
      formik.resetForm();
    },
  });
  const handleHeaderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    formik.setFieldValue("file", (event.currentTarget.files as FileList)[0]);
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

        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.author}
        />

        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />

        <label htmlFor="snippet">Snippet</label>
        <input
          id="snippet"
          name="snippet"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.snippet}
        />

        <label htmlFor="file">Header</label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={handleHeaderChange}
        />
        {formik.touched.file && formik.errors.file ? (
          <div>{formik.errors.file}</div>
        ) : null}
        <button type="submit">Submit</button>
        {status}
      </StyledForm>
    </div>
  );
};

export default AddBook;
