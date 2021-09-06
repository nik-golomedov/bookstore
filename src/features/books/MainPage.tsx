import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "react-input-range/lib/css/index.css";
import Rate from "rc-rate";
import { useFormik } from "formik";
import { Range } from "rc-slider";
//@ts-ignore
import Url from "urls-tool";
import "rc-slider/assets/index.css";
import "rc-rate/assets/index.css";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import {
  addFilterParams,
  BookI,
  bookSelector,
  categorySelector,
  filterSelector,
  getBooks,
  getCategory,
  isFetchingBooksSelector,
  totalSelector,
} from "./bookSlice";
import {
  StyledAside,
  StyledBookCard,
  StyledButton,
  StyledMainPage,
  StyledSection,
} from "../../styledComponents/styled";
import Spinner from "../../common/Spinner";

export interface BooksI extends BookI {
  image: string;
}

export interface SearchI {
  author?: string;
  price?: number[];
  rating?: string;
  category?: string;
  order?: string;
  page?: number;
}

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const books: BooksI[] = useAppSelector(bookSelector);
  const [rangeValue, setRangeValue] = useState<number[]>([]);
  const filterSearch = useAppSelector(filterSelector);
  const total = useAppSelector(totalSelector);
  const [count, setCount] = useState<number>(0);
  const category = useAppSelector(categorySelector);
  const isFetchiingBooks = useAppSelector(isFetchingBooksSelector);
  const { params } = Url;
  const [page, setPage] = useState<number>(0);
  const pageCount = total && Math.ceil(total / 8);

  const checkFilterSearch = (filterSearch: SearchI) => {
    const newFilterSearch: SearchI = {};
    if (filterSearch.author) newFilterSearch.author = filterSearch.author;
    if (filterSearch.rating && +filterSearch.rating !== 0)
      newFilterSearch.rating = filterSearch.rating;
    if (filterSearch.price && filterSearch.price.length !== 0) {
      newFilterSearch.price = filterSearch.price;
    }
    if (filterSearch.category) newFilterSearch.category = filterSearch.category;
    if (filterSearch.order) newFilterSearch.order = filterSearch.order;
    return newFilterSearch;
  };

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    setPage(params.page === undefined ? 0 : params.page);
    const newFilterSearch = checkFilterSearch(filterSearch);
    dispatch(getBooks({ newFilterSearch }));
    Url.params = { ...newFilterSearch };
  }, [count]);

  useEffect(() => {
    let newFilterSearch = checkFilterSearch(filterSearch);
    newFilterSearch = { ...newFilterSearch, page };
    dispatch(getBooks({ newFilterSearch }));
    if (page === 0) {
      Url.params = {};
    } else {
      Url.params = { ...newFilterSearch };
    }
  }, [page]);

  useEffect(() => {
    setPage(params.page === undefined ? 0 : params.page);
    let newFilterSearch = checkFilterSearch(params);
    newFilterSearch = { ...newFilterSearch, page: params.page };
    dispatch(getBooks({ newFilterSearch }));
    Url.params = params;
  }, []);

  const initialValues: SearchI = {
    author: "",
    category: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values: SearchI) => {
      dispatch(addFilterParams(values));
      setCount((c) => c + 1);
    },
  });

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setPage(selectedPage);
  };

  const handleRatingChange = (value: number) => {
    dispatch(addFilterParams({ rating: String(value) }));
  };

  const handleRangeChange = (value: number[]): void => {
    setRangeValue(value);
  };

  useEffect(() => {
    dispatch(addFilterParams({ price: rangeValue }));
  }, [rangeValue]);

  const clearFilter = () => {
    dispatch(
      addFilterParams({
        author: "",
        price: [],
        rating: "",
        category: "",
        order: "",
        page: 0,
      })
    );
    formik.resetForm()
    Url.params = {};
    setCount((c) => c + 1);
  };

  return (
    <StyledMainPage>
      <StyledAside>
        Фильтрация
        <form onSubmit={formik.handleSubmit}>
          <div className="category-filter">
            <label htmlFor="category">По категории</label>
            <select
              id="category"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
            >
              <option value="" label="Все" />
              {Array.isArray(category) &&
                category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.value}
                  </option>
                ))}
            </select>
          </div>
          По цене
          <div>
            min: {rangeValue[0]} max: {rangeValue[1]}
            <Range
              min={1}
              value={rangeValue}
              onChange={(value) => handleRangeChange(value)}
              max={999999}
              count={100}
            />
          </div>
          <div className="author-filter">
            <label htmlFor="author">По автору</label>
            <input
              id="author"
              name="author"
              type="text"
              value={formik.values.author}
              onChange={formik.handleChange}
            />
          </div>
          По рейтингу
          <div>
            <Rate
              defaultValue={0}
              allowClear={true}
              onChange={(value) => handleRatingChange(value)}
            />
          </div>
          <div>
            <StyledButton widthSmall type="submit">
              Поиск
            </StyledButton>
            <StyledButton widthSmall type="submit" onClick={clearFilter}>
              Сброс
            </StyledButton>
          </div>
        </form>
      </StyledAside>

      <StyledSection>
        <div className="sort-container">
          <h1>Книги</h1>
          <select
            id="order"
            name="order"
            value={formik.values.order}
            onChange={formik.handleChange}
          >
            <option value="" disabled>
              Отсортировать
            </option>
            <option value={"title_ASC"}>по алфавиту А-Я</option>
            <option value={"title_DESC"}>по алфавиту Я-А</option>
            <option value={"price_ASC"}>по цене (по возрастанию)</option>
            <option value={"price_DESC"}>по цене (по убыванию)</option>
            <option value={"rating_ASC"}>по рейтингу (по возрастанию)</option>
            <option value={"rating_DESC"}>по рейтингу (по убыванию)</option>
          </select>
          {total ? (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              disableInitialCallback={false}
              forcePage={+page}
              containerClassName="paginateContainer"
              pageClassName="page"
              pageLinkClassName="pageLink"
              activeClassName="activePage"
              activeLinkClassName="activeLink"
            />
          ) : null}
        </div>
        <>{isFetchiingBooks && <Spinner />}</>
        <div className="book-container">
          {books &&
            books.map((item) => (
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
            ))}
        </div>
      </StyledSection>
    </StyledMainPage>
  );
};

export default MainPage;
