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

import { useAppDispatch, useAppSelector } from "../common/hooks";
import {
  addFilterParams,
  BookI,
  getBooks,
  getCategory,
} from "../features/bookSlice";
import {
  StyledAside,
  StyledBookCard,
  StyledMainPage,
  StyledSection,
} from "../styledComponents/styled";

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
  const books: BooksI[] = useAppSelector((state) => state.books.data.books);
  const filterSearch = useAppSelector((state) => state.books.filter);
  const total = useAppSelector((state) => state.books.data.total);
  const [count,setCount] = useState<number>(0)
  const category = useAppSelector(
    (state) => state.books && state.books.category
  );
  const { params  }  = Url;
  const [page, setPage] =useState<number>(0)
  const checkFilterSearch = (filterSearch: SearchI) => {
    const newFilterSearch: SearchI = {};
    if (filterSearch.author) newFilterSearch.author = filterSearch.author;
    if (filterSearch.rating && +filterSearch.rating!==0) newFilterSearch.rating = filterSearch.rating;
    if (filterSearch.price && filterSearch.price.length !== 0) {
      newFilterSearch.price = filterSearch.price;
    }
    if (filterSearch.category) newFilterSearch.category = filterSearch.category;
    if (filterSearch.order) newFilterSearch.order = filterSearch.order;
    if (filterSearch.page)
      newFilterSearch.page = filterSearch.page;
    return newFilterSearch;
  };
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    const newFilterSearch = checkFilterSearch(filterSearch);
    dispatch(getBooks({ newFilterSearch }));
    Url.params = { ...newFilterSearch };
  }, [count,page]);

  useEffect(() => {
    const newFilterSearch = checkFilterSearch(params);
    dispatch(getBooks({ newFilterSearch }));
  }, []);

  const pageCount = total && Math.ceil(total / 8);

  const initialValues: SearchI = {
    author: "",
    category: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values: SearchI) => {
      dispatch(addFilterParams(values));
      setCount((c)=>c+1)
      formik.resetForm();
    },
  });
  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setPage(selectedPage)
    dispatch(addFilterParams({ page: selectedPage }));
  };


  const handleRatingChange = (value: number) => {
    dispatch(addFilterParams({ rating: String(value) }));
  };

  return (
    <StyledMainPage>
      <StyledAside>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="category">Категории</label>
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

          <Range
            min={1}
            onChange={(value) => dispatch(addFilterParams({ price: value }))}
            max={10000}
            defaultValue={[100, 1000]}
            count={100}
          />

          <label htmlFor="author">По автору</label>
          <input
            id="author"
            name="author"
            type="text"
            value={formik.values.author}
            onChange={formik.handleChange}
          />

          <Rate
            defaultValue={4}
            allowClear={true}
            onChange={(value) => handleRatingChange(value)}
          />
          <button type="submit">Поиск</button>
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
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            containerClassName="paginateContainer"
            pageClassName="page"
            pageLinkClassName="pageLink"
            activeClassName="activePage"
            activeLinkClassName="activeLink"
          />
        ) : null}
        </div>

        <div className="book-container">
          {books &&
            books.map((item) => (
              <StyledBookCard key={item.id}>
                <div className="image-container">
                  <Link to={`/${item.id}`}>
                    <img src={item.image} alt={item.title} />
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
