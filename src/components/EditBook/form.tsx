import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppDispatch } from "../../store";
import { editBook } from "../../store/bookSlice";
import { EditBookPropsI } from "../../../interfaces";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";

interface initialEditValues {
  description: string;
  price: number;
  snippet: string;
}

const EditBookForm: React.FC<EditBookPropsI> = ({
  id,
  onChange,
  book,
}: EditBookPropsI) => {
  const dispatch = useAppDispatch();
  const initialValues: initialEditValues = {
    description: String(book.description),
    price: Number(book.price),
    snippet: !book.snippet ? "" : book.snippet,
  };

  const {
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
      description: Yup.string().required("Обязательное поле"),
      price: Yup.number()
        .min(1, "Минимальная допустимая цена 1")
        .max(9999999, "Максимальная допустимая цена 9999999")
        .required("Обязательное поле"),
    }),
    onSubmit: (value: {
      description: string;
      snippet: string;
      price: number;
    }) => {
      dispatch(editBook({ ...value, bookId: id }));
      onChange();
    },
  });

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFieldValue(e.target.name, e.target.value.trim());
    handleBlur(e);
  };

  return (
    <StyledForm smallWidth onSubmit={handleSubmit}>
      <label htmlFor="description">Описание</label>
      <textarea
        id="description"
        name="description"
        onChange={handleChange}
        onBlur={handleOnBlur}
        value={values.description}
      />
      {touched.description && errors.description && (
      <div>{errors.description}</div>
      )}
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
        onBlur={handleBlur}
        value={values.snippet}
      />
      <StyledButton type="submit">Добавить</StyledButton>
    </StyledForm>
  );
};

export default EditBookForm;
