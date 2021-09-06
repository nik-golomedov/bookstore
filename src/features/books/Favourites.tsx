import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { favListSelector, getFavourites } from "./bookSlice";
import { StyledBookCard, StyledSection } from "../../styledComponents/styled";

const Favourites: React.FC = () => {
  const dispatch = useAppDispatch();
  const favList = useAppSelector(favListSelector);

  useEffect(() => {
    dispatch(getFavourites());
  }, []);

  return (
    <StyledSection>
      <div className="book-container">
        {favList &&
          favList.map((item: any) => (
            <StyledBookCard key={item.id}>
              <div className="image-container">
                <Link to={`/${item.id}`}>
                  <img src={item.image && item.image} alt={item.title} />
                </Link>
              </div>

              <div className="book-option">
                <Link to={`/${item.id}`}>
                  <div className="book-title">{item.title}</div>
                  <div className="book-author">{item.author}</div>
                </Link>
                <div className="book-footer">
                  <div> {item.price} ₽ </div>
                  <button className="book-btn">Купить</button>
                </div>
              </div>
            </StyledBookCard>
          ))}{" "}
      </div>
    </StyledSection>
  );
};

export default Favourites;
