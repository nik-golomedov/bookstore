import React from "react";
import styled from "styled-components";

import EditBookForm from "./form";

import { EditBookPropsI } from "../../../interfaces";

const EditBook: React.FC<EditBookPropsI> = ({
  id,
  onChange,
  book,
}: EditBookPropsI) => (
  <StyledEditBook>
    <EditBookForm id={id} onChange={onChange} book={book} />
  </StyledEditBook>
);

export default EditBook;

interface StyledEditBookI {
  readonly displayNone?: boolean;
}

const StyledEditBook = styled.div<StyledEditBookI>`
  display: ${(props) => (props.displayNone ? "none" : "absolute")};
  width: 100%;
  height: 100%;
`;
