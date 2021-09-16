import React from "react";

import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";

import { AddCategoryI } from "../../interfaces";
import { useAppDispatch } from "../../store";
import { addCategory } from "../../store/bookSlice";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";

const AddCategory: React.FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { category: "" },
    validationSchema: Yup.object({
      category: Yup.string().required("Required"),
    }),
    onSubmit: (values: AddCategoryI) => {
      dispatch(addCategory(values));
      formik.resetForm();
    },
  });

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    formik.setFieldValue(e.target.name, e.target.value.trim());
    formik.handleBlur(e);
  };

  return (
    <StyledCategory>
      <StyledForm onSubmit={formik.handleSubmit}>
        <label htmlFor="category">Добавить категорию</label>
        <input
          id="category"
          name="category"
          type="text"
          onChange={formik.handleChange}
          onBlur={handleOnBlur}
          value={formik.values.category}
        />
        {formik.touched.category && formik.errors.category && (
          <div>{formik.errors.category}</div>
        )}
        <StyledButton type="submit">Добавить</StyledButton>
      </StyledForm>
    </StyledCategory>
  );
};

export default AddCategory;

const StyledCategory = styled.div`
  form {
    margin: 0 auto;
  }
  button {
    margin-top: 20px;
  }
`;
