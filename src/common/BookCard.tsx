import React from "react";
import { Link } from "react-router-dom";

import { StyledBookCard } from "../styledComponents/styled";
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
}: BookCardPropsI) => {
  return (
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
            <div> {price} ₽ </div>
            <button className="book-btn">Купить</button>
          </div>
        </div>
      </Link>
    </StyledBookCard>
  );
};

export default BookCard;
