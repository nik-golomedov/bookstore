import styled from "styled-components";

interface StyledFormPropsI {
  smallWidth?: boolean;
}

export const StyledForm = styled.form<StyledFormPropsI>`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  width: 70%;
  .cancel-targetuser {
    color: #26a9e0;
    display: inline-block;
    margin-left: 7px;
    cursor: pointer;
  }
  textarea {
    resize: none;
    padding: 8px;
    width: ${(props) => (props.smallWidth ? "290px" : "100%")};
    height: 120px;
  }
  input,
  select {
    width: 300px;
    height: 30px;
  }
  label {
    margin-top: 15px;
    width: 300px;
    height: 25px;
  }
  div {
    font-size: 14px;
    color: red;
    width: 300px;
    height: 25px;
  }
  & > .react-icon__eye {
    margin-top: -25px;
    margin-left: 250px;
    cursor: pointer;
  }
  button {
    color: #fff;
  }
`;
