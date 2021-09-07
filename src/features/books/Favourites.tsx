import React from "react";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { favListSelector, getFavourites } from "./bookSlice";
import { StyledSection } from "../../styledComponents/styled";
import BookCard from "../../common/BookCard";

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
          favList.map((item) => (
            <BookCard
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              author={item.author}
              key={item.id}
            />
          ))}{" "}
      </div>
    </StyledSection>
  );
};

export default Favourites;
