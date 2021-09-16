import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

interface BookCardPropsI {
  id: number;
  image: string;
  title: string;
  price: number;
  author: string;
}

const BookCard: React.FC<BookCardPropsI> = ({
  id,
  image,
  title,
  price,
  author,
}: BookCardPropsI) => (
  <StyledBookCard>
    <Link to={`books/${id}`}>
      <div className="image-container">
        <div className="image-container__inner">
          <img src={image && image} alt={title} />
        </div>
      </div>
      <div className="book-option">
        <div className="book-title">{title}</div>
        <div className="book-author">{author}</div>
        <div className="book-footer">
          <div>
            {price}
            <span> ₽</span>
          </div>
          <button type="submit" className="book-btn">Купить</button>
        </div>
      </div>
    </Link>
  </StyledBookCard>
);

export default BookCard;

export const StyledBookCard = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  width: 240px;
  min-height: 364px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 4px rgb(0 0 0 / 4%);
  border-radius: 4px;
  background-color: #ffffff;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  transition: 0.1s ease-in;
  cursor: pointer;
  a {
    text-decoration: none;
    padding: 20px;
  }
  .image-container {
    max-width: 134px;
    max-height: 200px;
    margin-bottom: 12px;
  }
  .image-container .image-container__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
  }
  .image-container img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    vertical-align: middle;
    cursor: pointer;
  }
  .book-option {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 58px;
    font-size: 16px;
    line-height: 1.2;
  }
  .book-option a {
    min-height: 58px;
  }
  .book-title {
    color: #333;
  }
  .book-author {
    color: rgba(0, 0, 0, 0.55);
    width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .book-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    height: 40px;
  }
  .book-btn {
    height: 40px;
    line-height: 40px;
    display: inline-block;
    margin: 0;
    text-align: center;
    white-space: nowrap;
    background-color: #26a9e0;
    color: white;
    border-radius: 3px;
    border: none;
    padding: 0 20px;
    cursor: pointer;
    transition: 0.3s background-color;
  }
  .book-btn:hover {
    background-color: #1b75bb;
  }
  &:hover {
    box-shadow: 0 8px 20px rgb(0 0 0 / 12%), 0 0 8px rgb(0 0 0 / 4%);
  }
`;
