import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { BookI, getBooks } from "../features/bookSlice";
import {
  StyledAside,
  StyledBookCard,
  StyledSection,
} from "../styledComponents/styled";

export interface BooksI extends BookI {
  header: string;
}

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState<string>("");
  const books: BooksI[] = useAppSelector((state) => state.books.books);
  console.log(books)
  const sorted = () => {
    const sortPrice = [...books].sort((a, b) => b.price - a.price);
    const sortName = [...books].sort((a, b) => {
      const nameA = a.title.toLowerCase(),
        nameB = b.title.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    if (sort === "price") {
      return sortPrice;
    } else if (sort === "name") {
      return sortName;
    } else if (sort === "reversePrice") {
      return sortPrice.reverse();
    } else if (sort === "reverseName") {
      return sortName.reverse();
    } else return books;
  };
  const sortedBooks = books ? sorted() : [];
  const setSortPrice = () => {
    setSort(sort !== "price" ? "price" : "reversePrice");
  };
  const setSortName = () => {
    setSort(sort !== "name" ? "name" : "reverseName");
  };
  const breakSort = () => {
    setSort("");
  };
  useEffect(() => {
    dispatch(getBooks());
  }, []);
  return (
    <>
      <StyledAside>
        Сортировка<div onClick={setSortPrice}>Цена</div>
        <div onClick={setSortName}>Имя</div>
        <div className="break-sort" onClick={breakSort}>
          Сброс
        </div>
      </StyledAside>
      <StyledSection>
        {books &&
          sortedBooks.map((item) => (
            <StyledBookCard key={item.id}>
              <Link to={`/${item.id}`}>
                <div className="image-container">
                  <img src={item.header} alt={item.title} />
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
          ))}
      </StyledSection>
    </>
  );
};

export default MainPage;
