import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { BookI, editBook } from "./bookSlice";
import {
  StyledButton,
  StyledEditBook,
  StyledForm,
} from "../../styledComponents/styled";
import { userIdSelector } from "../auth/userSlice";

interface EditBookPropsI {
  id: number;
  onChange: () => void;
  book: BookI;
}

const EditBook: React.FC<EditBookPropsI> = ({
  id,
  onChange,
  book,
}: EditBookPropsI) => {
  const dispatch = useAppDispatch();
  const initialValues: { description: string; price: number; snippet: string } =
    {
      description: String(book.description),
      price: Number(book.price),
      snippet: String(book.snippet),
    };

  const userId: number | null = useAppSelector(userIdSelector);

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
      dispatch(editBook({ ...values, bookId: id, userId }));
      onChange();
      formik.resetForm();
    },
  });

  return (
    <>
      <StyledEditBook>
        <StyledForm onSubmit={formik.handleSubmit}>
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

          <StyledButton type="submit">Добавить</StyledButton>
          {status}
        </StyledForm>
      </StyledEditBook>
    </>
  );
};

export default EditBook;
