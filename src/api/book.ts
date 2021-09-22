import axios from "./axios";

import {
  AddCategoryI,
  AddFavI,
  AddReviewI,
  BookI,
  EditBookI,
  RatingI,
  ReviewI,
  SearchI,
} from "../../interfaces";

export const addBookApi = (formData: FormData) =>
  axios.post("/books", formData);

export const getBooksApi = ({
  newFilterSearch,
  offset,
  limit,
}: {
  newFilterSearch: SearchI;
  offset: number;
  limit: number;
}) =>
  axios.get("/books", {
    params: { ...newFilterSearch, offset, limit },
  });

export const getBookApi = (id: number) => axios.get<BookI>(`/books/${id}`);

export const editBookApi = (value: EditBookI) =>
  axios.patch(`/books/${value.bookId}`, value);

export const addReviewApi = (value: AddReviewI) => axios.post("/review", value);

export const getReviewApi = (id: number) =>
  axios.get<ReviewI[]>(`/review/${id}`);

export const addFavouritesApi = ({ bookId }: AddFavI) =>
  axios.post("/favourites", {
    bookId,
  });

export const getFavouritesApi = () => axios.get("/favourites");

export const deleteFavouritesApi = ({ bookId }: AddFavI) =>
  axios.delete(`/favourites/${bookId}`);

export const addRatingApi = ({ value, bookId }: RatingI) =>
  axios.post("/rating", {
    value,
    bookId,
  });

export const addCategoryApi = (value: AddCategoryI) =>
  axios.post("/category", value);

export const getCategoryApi = () => axios.get("/category");
