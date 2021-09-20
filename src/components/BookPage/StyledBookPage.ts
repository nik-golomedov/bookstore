import styled from "styled-components";

export const StyledBookPage = styled.section`
  form {
    margin: 0 auto;
  }
  button {
    margin-top: 20px;
  }
  form button {
    margin-bottom: 40px;
  }
`;

export const StyledFullSizeBookCard = styled.div`
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  max-width: 1100px;
  margin-bottom: 100px;
  word-break: break-all;
  .book-image {
    min-width: 460px;
    max-width: 500px;
    padding-right: 60px;
    padding-bottom: 32px;
  }
  .book-image img {
    max-width: 100%;
    max-height: 500px;
  }

  .book-main {
    display: flex;
    font-size: 16px;
  }
  .book-section {
    display: flex;
    flex-flow: column;
    align-items: space-between;
  }
  .book-favorites {
    background-color: rgba(15%, 66%, 88%, 0.1);
    padding: 0 20px;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    line-height: 32px;
    width: 240px;
    transition: 0.2s linear;
    span {
      margin-right: 10px;
    }
  }
  .book-favorites:hover {
    background-color: #3bbedb;
    color: white;
  }
  .book-author {
    margin-bottom: 10px;
  }
  .book-main h1 {
    font-size: 24px;
    line-height: 28px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .book-rating {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  .book-review__count {
    margin-left: 25px;
  }
  .book-add-rating {
    cursor: pointer;
    color: #26a9e0;
    border-bottom: 1px dashed;
    margin: 0 60px 0 10px;
  }
  .book-rating div {
    margin-right: 10px;
  }
  .book-description {
    margin-top: 30px;
  }
  .book-price {
    margin-top: 60px;
    font-size: 24px;
    font-weight: bold;
  }
  .book-options {
    display: flex;
    & div {
      cursor: pointer;
      margin-top: 30px;
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      transition: 0.2s linear;
    }
  }
  .book-options div:hover {
    background-color: #26a9e0;
    color: white;
  }
  button {
    margin-top: 20px;
  }
  .rc-rate-star {
    color: grey;
  }
`;
