import React from "react";
import styled from "styled-components";

import AddCategoryForm from "./form";

const AddCategory: React.FC = () => (
  <StyledCategory>
    <AddCategoryForm />
  </StyledCategory>
);

export default AddCategory;

const StyledCategory = styled.div`
  form {
    margin: 0 auto;
  }
  button {
    margin-top: 20px;
  }
  span {
    color: black;
    display: inline-block;
    text-align: center;
  }
  .message-error {
    color: red;
  }
`;
