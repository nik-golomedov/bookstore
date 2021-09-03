import { useFormik } from "formik";
import React from "react";

import { useAppDispatch, useAppSelector } from "../common/hooks";
import { BookI, editBook } from "../features/bookSlice";
import {
  StyledButton,
  StyledEditBook,
  StyledForm,
} from "../styledComponents/styled";
interface EditBookPropsI {
  id: string;
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

  const userId: number | null = useAppSelector(
    (state) => state.user.user && state.user.user.id
  );

  const formik = useFormik({
    initialValues,
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
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />

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

          <StyledButton type="submit">Добавить</StyledButton>
          {status}
        </StyledForm>
      </StyledEditBook>
    </>
  );
};

export default EditBook;
