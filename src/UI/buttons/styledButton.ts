import styled from "styled-components";

interface StyledButtonI {
  readonly widthSmall?: boolean;
}

const StyledButton = styled.button<StyledButtonI>`
  width: ${(props) => (props.widthSmall ? "140px" : "280px")};
  border-radius: 3px;
  color: #ffffff;
  background-color: #26a9e0;
  border: none;
  font-size: 18px;
  height: 48px;
  cursor: pointer;
`;

export default StyledButton;
