import React from "react";

import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";

import { BookI } from "../../interfaces";
import { useAppDispatch } from "../../store";
import { editBook } from "../../store/bookSlice";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";

interface EditBookPropsI {
  id: number;
  onChange: () => void;
  book: BookI;
}

interface initialEditValues {
  description: string;
  price: number;
  snippet: string;
}

const EditBook: React.FC<EditBookPropsI> = ({
  id,
  onChange,
  book,
}: EditBookPropsI) => {
  const dispatch = useAppDispatch();
  const initialValues: initialEditValues = {
    description: String(book.description),
    price: Number(book.price),
    snippet: book.snippet !== "null" ? String(book.snippet) : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      description: Yup.string().required("Required"),
      price: Yup.number().min(1).max(9999999).required("Required"),
    }),
    onSubmit: (values: {
      description: string;
      snippet: string;
      price: number;
    }) => {
      dispatch(editBook({ ...values, bookId: id }));
      onChange();
    },
  });

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    formik.setFieldValue(e.target.name, e.target.value.trim());
    formik.handleBlur(e);
  };

  return (
    <StyledEditBook>
      <StyledForm smallWidth onSubmit={formik.handleSubmit}>
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={handleOnBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description && (
          <div>{formik.errors.description}</div>
        )}
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
          onBlur={formik.handleBlur}
          value={formik.values.snippet}
        />
        <StyledButton type="submit">Добавить</StyledButton>
      </StyledForm>
    </StyledEditBook>
  );
};

export default EditBook;

interface StyledEditBookI {
  readonly displayNone?: boolean;
}

const StyledEditBook = styled.div<StyledEditBookI>`
  display: ${(props) => (props.displayNone ? "none" : "absolute")};
  width: 100%;
  height: 100%;
`;
