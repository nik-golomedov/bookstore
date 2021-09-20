import styled from "styled-components";

interface StyledFormPropsI {
  smallWidth?: boolean;
}

export const StyledForm = styled.form<StyledFormPropsI>`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  font-style: "Roboto", sans-serif;
  align-items: center;
  width: 70%;
  .cancel-targetuser {
    color: #26a9e0;
    display: inline-block;
    margin-left: 7px;
    cursor: pointer;
  }
  textarea {
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    resize: none;
    padding: 10px;
    width: ${(props) => (props.smallWidth ? "300px" : "100%")};
    height: 120px;
  }
  input,
  select {
    box-sizing: border-box;
    width: 300px;
    height: 30px;
    padding-left: 10px;
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
    margin-top: 10px;
  }
  .react-icon__eye {
    margin-top: -25px;
    margin-left: 250px;
    cursor: pointer;
  }
  button {
    color: #fff;
  }
  input:focus,
  textarea:focus {
    outline: 1px solid #26a9e0;
    border: none;
  }
  .form-password__error {
    margin-top: 15px;
  }
`;
