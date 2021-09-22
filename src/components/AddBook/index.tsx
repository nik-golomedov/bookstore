import React, { useEffect } from "react";
import styled from "styled-components";

import AddBookForm from "./form";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  categorySelector,
  clearAddBookRequest,
  getCategory,
  isSuccessAddedBookSelector,
} from "../../store/bookSlice";

const AddBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(categorySelector);
  const isSuccessAddedBook = useAppSelector(isSuccessAddedBookSelector);

  useEffect(() => {
    setTimeout(() => dispatch(clearAddBookRequest()), 2000);
  }, [isSuccessAddedBook]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <StyledAddBook>
      <AddBookForm category={category} />
    </StyledAddBook>
  );
};

export default AddBook;

const StyledAddBook = styled.div`
  form {
    margin: 0 auto 20px;
  }
  div {
    margin-top: 10px;
  }
`;
