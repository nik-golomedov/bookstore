import styled from "styled-components";

export const StyledHeader = styled.header`
  font-size: 34px;
  display: flex;
  justify-content: flex-end;
  margin: 150px 100px 10px;
  & a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: black;
  }
`;

export const StyledListItem = styled.li`
  margin: 0 50px 0 0;
  cursor: pointer;
  text-decoration: none;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-flow:column;
  justify-content:flex-start;
  align-items:center;
  width:70%;
  margin:0 auto;
  & > * {
    font-size:14px;
    margin-top:10px;
    color:black;
  }
  & > input {
    width:300px;
    height:25px;
  }
  & > label {
    margin-top:15px;
    width:300px;
    height:25px;
  }
  & > div {
    font-size:14px;
    color:red;
    width:300px;
    height:25px;
  }
  & > .react-icon__eye {
    margin-top: -25px;
    margin-left: 250px;
    cursor:pointer;
 
  }
}
`;

export const StyledBookCard = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  width: 200px;
  min-height: 400px;
  border: 1px solid #888;
  margin: 10px;
  background-color:#f9f9f9;
  text-align: center;
  padding:10px;
  * {
  }
  & > * {
    margin-bottom: 5px;
  }

  img {
    object-fit: fill;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .image-container {
    width: 200px;
    height: 300px;
  }
`;
export const StyledFullSizeBookCard = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-flow: row;
  & > img {
    width: 100%;
  }
   .book-section {
    display: flex;
    flex-flow: column;
    width: 600px;
    margin:10px;
  }
  .book-section:first-of-type {
    display:block;
    height:600px;
  }
  .book-section img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  .book-section > div {
    margin: 10px;
  }
`;
export const StyledAside = styled.aside`
  width: 100%;
  display: flex;
  justify-content: center;
  & > div {
    width: 200px;
    height: 25px;
    border: 1px solid #333;
    border-radius: 14px;
    text-align: center;
    color: white;
    background-color: #333;
    cursor: pointer;
  }

`;
export const StyledSection = styled.section`
  display: flex;
  flex-flow: wrap;
`;
