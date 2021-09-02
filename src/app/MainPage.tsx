import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { BookI, CategoryI, getBooks, getCategory } from "../features/bookSlice";
import {
  StyledAside,
  StyledBookCard,
  StyledMainPage,
  StyledSection,
} from "../styledComponents/styled";

export interface BooksI extends BookI {
  image: string;
}

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const books: BooksI[] = useAppSelector((state) => state.books.books);
  const [filterPrice, setFilterPrice] = useState<string>("");
  const [filterAuthor, setFilterAuthor] = useState<string>("");
  const [filterRating, setFilterRating] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const category = useAppSelector(
    (state) => state.books && state.books.category
  );
  const [sort, setSort] = useState<string>("");
  const [sortedBooks, setSortedBooks] = useState<BooksI[]>(books);

  useEffect(() => {
    dispatch(getBooks());
  }, []);
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  const sorted = () => {
    if (!Array.isArray(books)) {
      return;
    }
    const sortPrice = [...sortedBooks].sort((a, b) => a.price - b.price);
    const sortName = [...sortedBooks].sort((a, b) => {
      const nameA = a.title.toLowerCase(),
        nameB = b.title.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    const sortRating = [...sortedBooks].sort((a, b) => a.rating - b.rating);
    switch (sort) {
      case "price":
        {
          setSortedBooks(sortPrice);
        }
        break;
      case "reversePrice":
        {
          setSortedBooks(sortPrice.reverse());
        }
        break;
      case "name":
        {
          setSortedBooks(sortName);
        }
        break;
      case "reverseName":
        {
          setSortedBooks(sortName.reverse());
        }
        break;
      case "rating":
        {
          setSortedBooks(sortRating);
        }
        break;
      case "reverseRating":
        {
          setSortedBooks(sortRating.reverse());
        }
        break;
    }
  };

  const setSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    sorted();
  }, [sort]);

  const handleFilterPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPrice(e.target.value);
  };
  const handleFilterAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAuthor(e.target.value);
  };
  const handleFilterRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRating(e.target.value);
  };
  const handleFilterCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterCategory(e.target.value);
  };

  useEffect(() => {
    if (
      filterPrice === "" &&
      filterAuthor === "" &&
      filterRating === "" &&
      filterCategory === ""
    ) {
      setSortedBooks(books);
    }
    const filteredCategory = (item:BooksI) => {
      if (filterCategory === "") {
        return books
      } else {
        return (
          item.category.value.toLowerCase() === filterCategory.toLowerCase()
        );
      }
    };
    setSortedBooks(
      books
        .filter((item:BooksI) => item.price > +filterPrice)
        .filter((item:BooksI)=>filteredCategory(item))
        .filter((item:BooksI) =>
          item.author.toLowerCase().includes(filterAuthor.toLowerCase())
        )
        .filter((item:BooksI) => item.rating >= +filterRating)
    );
  }, [filterPrice, filterAuthor, filterRating, filterCategory]);

  return (
    <StyledMainPage>
      <StyledAside>
        <div>
          <label htmlFor="category">Категории</label>
          <select
            id="category"
            name="category"
            onChange={handleFilterCategoryChange}
            defaultValue={""}
          >
            <option value="" label="Все" />
            {category &&
              category.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.value}
                </option>
              ))}
          </select>
        </div>
        <div>По цене</div>
        <input value={filterPrice} onChange={handleFilterPriceChange} />
        <div>По автору</div>
        <input value={filterAuthor} onChange={handleFilterAuthorChange} />
        <div>По рейтингу</div>
        <input value={filterRating} onChange={handleFilterRatingChange} />
      </StyledAside>

      <StyledSection>
        <div className="sort-container">
          <h1>Книги</h1>
          <select
            name="sort"
            disabled={sortedBooks.length === 0 ? true : false}
            defaultValue={""}
            onChange={(e) => setSorting(e)}
          >
            <option value="" disabled>
              Отсортировать
            </option>
            <option value={"name"}>по алфавиту А-Я</option>
            <option value={"reverseName"}>по алфавиту Я-А</option>
            <option value={"price"}>по цене (по возрастанию)</option>
            <option value={"reversePrice"}>по цене (по убыванию)</option>
            <option value={"rating"}>по рейтингу (по возрастанию)</option>
            <option value={"reverseRating"}>по рейтингу (по убыванию)</option>
          </select>
        </div>
        <div className="book-container">
          {books &&
            sortedBooks.map((item) => (
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
