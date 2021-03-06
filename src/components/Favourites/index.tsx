import React, { useEffect } from "react";
import styled from "styled-components";

import BookCard from "../BookCard/BookCard";

import { useAppDispatch, useAppSelector } from "../../store";
import { favListSelector, getFavourites } from "../../store/bookSlice";
import { isAuthSelector } from "../../store/userSlice";

const Favourites: React.FC = () => {
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(favListSelector);
  const isAuth = useAppSelector(isAuthSelector);

  useEffect(() => {
    if (isAuth) {
      dispatch(getFavourites());
    }
  }, []);

  return (
    <StyledFavouriteBooks>
      <div className="book-container">
        {favoriteList.length ? (
          favoriteList.map((item) => (
            <BookCard
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              author={item.author}
              key={item.id}
            />
          ))
        ) : (
          <span>Пока ничего нет</span>
        )}
      </div>
    </StyledFavouriteBooks>
  );
};

export default Favourites;

const StyledFavouriteBooks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .book-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 20px;
  }
  .book-notFound {
    margin: 60px auto;
  }
`;
