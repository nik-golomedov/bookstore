import { useFormik } from "formik";
import React from "react"

import { useAppDispatch } from "../../common/hooks";
import { addCategory } from "./bookSlice";
import { StyledButton, StyledForm } from "../../styledComponents/styled"

export interface AddCategoryI {
    category:string,
}

const AddCategory:React.FC = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues:{category:""},
        onSubmit: (values:AddCategoryI ) => {
            dispatch(addCategory(values))
          formik.resetForm();
        },
      });
    return (
        <StyledForm onSubmit={formik.handleSubmit}>
              <label htmlFor="category">Добавить категорию</label>
        <input
          id="category"
          name="category"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.category}
        />
        <StyledButton type="submit">Добавить</StyledButton>
        </StyledForm>
    )
}

export default AddCategory
