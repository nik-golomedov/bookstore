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
      <div className="image-container">
        <Link to={`/${id}`}>
          <img src={image && image} alt={title} />
        </Link>
      </div>

      <div className="book-option">
        <Link to={`/${id}`}>
          <div className="book-title">{title}</div>
          <div className="book-author">{author}</div>
        </Link>
        <div className="book-footer">
          <div> {price} ₽ </div>
          <button className="book-btn">Купить</button>
        </div>
      </div>
    </StyledBookCard>
  );
};

export default BookCard;
