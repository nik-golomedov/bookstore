import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import Rate from "rc-rate";
import { Range } from "rc-slider";
import styled from "styled-components";
// @ts-ignore
import Url from "urls-tool";

import { SearchI } from "../../../../interfaces";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  addFilterParams,
  categorySelector,
  filterSelector,
  getBooks,
  getCategory,
} from "../../../../store/bookSlice";
import "react-input-range/lib/css/index.css";
import "rc-slider/assets/index.css";
import "rc-rate/assets/index.css";
import StyledButton from "../../../../UI/buttons/styledButton";

interface AsidePropsI {
  handleOrderResetClick: () => void;
  handlePageResetClick: () => void;
  // eslint-disable-next-line no-unused-vars
  checkFilterSearch: (filterSearch: SearchI) => SearchI;
}

const MainPageAside: React.FC<AsidePropsI> = ({
  handleOrderResetClick,
  handlePageResetClick,
  checkFilterSearch,
}) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<boolean>(false);
  const [rangeValue, setRangeValue] = useState<number[]>([1, 100000]);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const category = useAppSelector(categorySelector);
  const filterSearch = useAppSelector(filterSelector);
  const { params } = Url;
  const initialValues: SearchI = {
    author: params.author ? params.author : "",
    category: params.category ? params.category : "",
  };

  const clearFilter = () => {
    // const newFilterSearch:SearchI = {
    //   author: "",
    //   price: [],
    //   rating: "",
    //   category: "",
    //   order: "",
    //   page: 0,
    // };
    dispatch(
      addFilterParams({
        author: "",
        price: [],
        rating: "",
        category: "",
        order: "",
        page: 0,
      }),
    );
    formik.values.author = "";
    formik.values.category = "";
    setRangeValue([1, 100000]);
    setRatingValue(0);
    Url.params = {};
    handleOrderResetClick();
    setCount(!count);
  };

  const handleRatingChange = (value: number) => {
    setRatingValue(value);
    dispatch(addFilterParams({ rating: String(value) }));
  };

  const handleRangeChange = (value: number[]): void => {
    setRangeValue(value);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values: SearchI) => {
      dispatch(addFilterParams(values));
      setCount(!count);
    },
  });

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    dispatch(addFilterParams({ price: rangeValue }));
  }, [rangeValue]);

  useEffect(() => {
    handlePageResetClick();
    const newFilterSearch = checkFilterSearch(filterSearch);
    dispatch(getBooks({ newFilterSearch }));
    Url.params = { ...newFilterSearch };
  }, [count]);

  useEffect(() => {
    if (params.price) {
      const searchParamsRange = params?.price?.split(",");
      setRangeValue([+searchParamsRange[0], +searchParamsRange[1]]);
    }
    if (params.rating) {
      setRatingValue(params.rating);
    }
  }, []);

  return (
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
            {Array.isArray(category)
              && category.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
          </select>
        </div>
        По цене
        <div>
          <span>от: </span>
          {+rangeValue[0]}
          <span>₽ </span>
          <span>до: </span>
          {+rangeValue[1]}
          ₽
          <Range
            min={1}
            value={rangeValue}
            onChange={(value) => handleRangeChange(value)}
            max={999999}
            count={10}
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
            allowClear
            value={ratingValue}
            onChange={(value) => handleRatingChange(value)}
          />
        </div>
        <div>
          <StyledButton widthSmall type="submit">
            Поиск
          </StyledButton>
          <StyledButton widthSmall type="button" onClick={clearFilter}>
            Сброс
          </StyledButton>
        </div>
      </form>
    </StyledAside>
  );
};

export default MainPageAside;

const StyledAside = styled.aside`
  width: 18.5%;
  height: 800px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding-right: 20px;
  .author-filter {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }
  .category-filter {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  button {
    margin-top:20px;
  }
  .rc-rate-star {
    color: grey;
  }
`;
