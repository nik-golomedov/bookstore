import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

import { useAppDispatch } from "../../common/hooks";
import { addCategory } from "./bookSlice";
import { StyledButton, StyledForm } from "../../styledComponents/styled";

export interface AddCategoryI {
  category: string;
}

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
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formik.setFieldValue(e.target.name, e.target.value.trim());
    formik.handleBlur(e);
  };

  return (
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
      {formik.touched.category && formik.errors.category ? (
          <div>{formik.errors.category}</div>
        ) : null}
      <StyledButton type="submit">Добавить</StyledButton>
    </StyledForm>
  );
};

export default AddCategory;
