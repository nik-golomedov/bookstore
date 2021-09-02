import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { getFavourites } from "../features/bookSlice";
import { StyledBookCard, StyledMainPage, StyledSection } from "../styledComponents/styled";

const Favourites: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId: number | null = useAppSelector(
    (state) => state.user.user && state.user.user.id
  );
  const favList = useAppSelector((state) => state.books.fav.books);

  useEffect(() => {
    dispatch(getFavourites(userId));
  }, []);

  return (
      <StyledSection>
        <div className="book-container">
        {favList &&
          favList.map((item: any) => (
           
            <StyledBookCard key={item.id}>
              <Link to={`/${item.id}`}>
                <div className="image-container">
                  <img src={item.image} alt={item.title} />
                </div>
              </Link>
              <div>
                <span>{item.title}</span>
              </div>
              <div>
                <b>Автор:</b> <span>{item.author}</span>
              </div>
              <div>
                <b>Описание:</b> <span>{item.description}</span>
              </div>
              <div>
                <b>
                  <span> {item.price} ₽ </span>
                </b>
              </div>
            </StyledBookCard>
          
          ))}  </div>
      </StyledSection>
  );
};

export default Favourites;
