import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
// @ts-ignore
import Url from "urls-tool";

import BookCard from "../BookCard/BookCard";
import Spinner from "../Spinner";
import Aside from "./components/MainPageAside";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  addFilterParams,
  bookSelector,
  getBooks,
  isFetchingBooksSelector,
  totalSelector,
} from "../../store/bookSlice";
import { BookI, SearchI } from "../../../interfaces";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const books: BookI[] = useAppSelector(bookSelector);
  const total = useAppSelector(totalSelector);
  const isFetchingBooks = useAppSelector(isFetchingBooksSelector);
  const [order, setOrder] = useState<string>("");
  const { params } = Url;
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  const checkFilterSearch = (filterSearch: SearchI): SearchI => {
    const newFilterSearch: SearchI = {};
    if (filterSearch.author) newFilterSearch.author = filterSearch.author;
    if (filterSearch.rating && +filterSearch.rating !== 0) {
      newFilterSearch.rating = filterSearch.rating;
    }
    if (Array.isArray(filterSearch.price) && !!filterSearch.price.length) {
      newFilterSearch.price = `${String(filterSearch.price[0])},${String(
        filterSearch.price[1],
      )}`;
    } else if (filterSearch.price && !!filterSearch.price.length) {
      newFilterSearch.price = filterSearch.price;
    }
    if (filterSearch.category) newFilterSearch.category = filterSearch.category;
    if (filterSearch.order) newFilterSearch.order = filterSearch.order;
    return newFilterSearch;
  };

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setPage(selectedPage);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
    dispatch(addFilterParams({ order: e.target.value }));
  };

  const handleOrderReset = () => {
    setOrder("");
  };

  const handlePageReset = () => {
    setPage(0);
  };

  useEffect(() => {
    let newFilterSearch = checkFilterSearch(params);
    newFilterSearch = order
      ? { ...newFilterSearch, page, order }
      : { ...newFilterSearch, page };
    dispatch(getBooks({ newFilterSearch }));
    if (page === 0) {
      delete newFilterSearch.page;
    }
    Url.params = { ...newFilterSearch };
  }, [page, order]);

  useEffect(() => {
    setPage(params.page === undefined ? 0 : params.page);
    let newFilterSearch = checkFilterSearch(params);
    newFilterSearch = { ...newFilterSearch, page: params.page };
    dispatch(addFilterParams(params));
    dispatch(getBooks({ newFilterSearch }));
    Url.params = params;
  }, []);

  useEffect(() => {
    setPageCount(total && Math.ceil(total / 8));
  }, [total]);

  return (
    <StyledMainPage>
      <Aside
        handleOrderResetClick={handleOrderReset}
        handlePageResetClick={handlePageReset}
        checkFilterSearch={checkFilterSearch}
      />
      <StyledBookContainer>
        <div className="sort-container">
          <h1>Книги</h1>
          <select
            id="order"
            name="order"
            value={params.order ? params.order : order}
            onChange={handleOrderChange}
          >
            <option value="" disabled label="Сортировка" />
            <option value="title_ASC">по алфавиту А-Я</option>
            <option value="title_DESC">по алфавиту Я-А</option>
            <option value="price_ASC">по цене (по возрастанию)</option>
            <option value="price_DESC">по цене (по убыванию)</option>
            <option value="rating_ASC">по рейтингу (по возрастанию)</option>
            <option value="rating_DESC">по рейтингу (по убыванию)</option>
          </select>
          {total ? (
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              pageCount={pageCount}
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              disableInitialCallback={false}
              forcePage={+page}
              containerClassName="paginateContainer"
              pageClassName="page"
              pageLinkClassName="pageLink"
              activeClassName="activePage"
              activeLinkClassName="activeLink"
              previousLinkClassName="previousLink"
              nextLinkClassName="nextLink"
            />
          ) : null}
        </div>
        <>{isFetchingBooks && <Spinner />}</>
        {total === 0 && !isFetchingBooks && (
          <div className="book-notFound"> Ничего не найдено</div>
        )}
        <div className="book-container">
          {books
            && books.map((item) => (
              <BookCard
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                author={item.author}
                key={item.id}
              />
            ))}
        </div>
      </StyledBookContainer>
    </StyledMainPage>
  );
};

export default MainPage;

const StyledMainPage = styled.section`
  display: flex;
  .paginateContainer {
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding: 10px;
  }
  .pageLink {
    padding: 5px 10px;
  }
  .pageLink:hover {
    box-shadow: inset 0 0 3px #26a9e0;
  }
  .page {
    margin: 0 5px;
  }
  .activePage {
  }
  .activeLink {
    background-color: #26a9e0;
    border-radius: 4px;
    transition: 0.2s ease-in;
    color: white;
  }
  .previousLink {
    padding: 5px 10px;
  }
  .nextLink {
    padding: 5px 10px;
  }
  & > * {
    margin: 20px 20px 0 10px;
  }
`;

const StyledBookContainer = styled.div`
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
