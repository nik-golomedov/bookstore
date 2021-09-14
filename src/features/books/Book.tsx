import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "rc-rate/assets/index.css";
import Rate from "rc-rate";
import { nanoid } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import {
  addCurrentReview,
  addFavourites,
  addRating,
  addReply,
  addReview,
  BookI,
  deleteFavourites,
  getBook,
  getFavourites,
  getReview,
  isErrorBookSelector,
  isSuccessDeleteFavouriteSelector,
  isSuccessEditSelector,
  isSuccessFavouriteSelector,
  isSuccessRatingSelector,
  reviewSelector,
  singleBookSelector,
} from "./bookSlice";
import {
  StyledButton,
  StyledForm,
  StyledFullSizeBookCard,
} from "../../styledComponents/styled";
import EditBook from "./EditBook";
import { isAuthSelector, userIdSelector } from "../auth/userSlice";
import Review from "./Review";

interface MatchParams {
  id: string;
}

export interface AddReviewI {
  id?: number;
  text: string;
  bookId: number | string;
  userId: number | null;
  userName?: string;
  targetUserId?: number | null;
  targetUserName?: string | null;
  createdAt: string;
}

export interface TargetUserI {
  id: number | null;
  fullName?: string | null;
  reviewId?: number;
}

const BookPage: React.FC = () => {
  const isAuth = useAppSelector(isAuthSelector);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const dispatch = useAppDispatch();
  const review = useAppSelector(reviewSelector);
  const { id }: MatchParams = useParams();
  const history = useHistory();
  const [editMode, setEditMode] = useState<boolean>(false);
  const isErrorBook = useAppSelector(isErrorBookSelector);
  const isSuccessEdit = useAppSelector(isSuccessEditSelector);
  const isSuccessRating = useAppSelector(isSuccessRatingSelector);
  const userId: number | null = useAppSelector(userIdSelector);
  const book: BookI = useAppSelector(singleBookSelector);
  const location = useLocation();
  const isFavourite = useAppSelector((state) =>
    state.books.fav.books.filter((item) => item.id === +id)
  );
  const isSuccessFavourite = useAppSelector(isSuccessFavouriteSelector);
  const isSuccessDeleteFavourite = useAppSelector(
    isSuccessDeleteFavouriteSelector
  );
  const [showReview, setShowReview] = useState<boolean>(true);
  const [targetUser, setTargetUser] = useState<TargetUserI | null | undefined>({
    id: null,
  });

  const formik = useFormik({
    initialValues: {
      text: "",
      bookId: +id,
      userId,
      createdAt: "",
    } as AddReviewI,
    onSubmit: (values: AddReviewI) => {
      if (!targetUser?.id) {
        dispatch(
          addReview({
            ...values,
            bookId: +id,
            userId: userId,
          })
        );
        dispatch(
          addCurrentReview({
            ...values,
            bookId: +id,
            id: nanoid(),
            user: isAuth,
            createdAt: new Date().toISOString(),
          })
        );
      } else {
        dispatch(
          addReply({
            text: values.text,
            reviewId: targetUser.reviewId!,
            targetUserId: targetUser.id,
            bookId: +id,
          })
        );
      }
      setShowReview(true);
      formik.resetForm();
    },
  });

  useEffect(() => {
    dispatch(getReview(id));
  }, []);

  useEffect(() => {
    if (ratingValue) {
      dispatch(
        addRating({
          value: ratingValue,
          userId: userId,
          bookId: +id,
        })
      );
    }
  }, [ratingValue]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getFavourites());
    }
  }, [isSuccessFavourite, isSuccessDeleteFavourite]);

  useEffect(() => {
    dispatch(getBook(+id));
  }, [ratingValue, isSuccessRating, isSuccessEdit, location]);

  useEffect(() => {
    if (!book || isErrorBook) {
      history.push("/");
    }
  }, [book, isErrorBook]);

  const handleAddFavourites = () => {
    dispatch(addFavourites({ bookId: +id }));
  };

  const handleRatingChange = (value: number): void => {
    if (!isAuth) {
      history.push("/login");
    }
    setRatingValue(value);
  };

  const handleEditMode = () => {
    setEditMode(!editMode ? true : false);
  };

  const handleDeleteFavourites = () => {
    dispatch(deleteFavourites({ bookId: +id }));
  };

  const handleShowReview = () => {
    setShowReview(true);
  };

  const handleShowSnippet = () => {
    setShowReview(false);
  };

  const handleReviewClick = (value?: TargetUserI | null) => {
    setTargetUser(value);
  };

  const cancelTargetUser = () => {
    setTargetUser({ id: null, fullName: null });
  };

  return (
    <section>
      <div>
        {!editMode ? (
          book && (
            <>
              <StyledFullSizeBookCard key={book.id}>
                <div className="book-main">
                  <div className="book-image">
                    <img src={book.image && book.image} alt={book.title} />
                  </div>
                  <div className="book-section">
                    {isAuth &&
                      (isFavourite.length === 0 ? (
                        <button
                          className="book-favourites"
                          onClick={handleAddFavourites}
                        >
                          Добавить в избранное
                          <AiOutlineStar />
                        </button>
                      ) : (
                        <button
                          className="book-favourites"
                          onClick={handleDeleteFavourites}
                        >
                          Удалить из избранного
                        </button>
                      ))}
                    <div>
                      <h1>{book.title}</h1>
                    </div>
                    <div className="book-author">{book.author}</div>
                    <div>{book.category.value}</div>
                    <div className="book-rating">
                      <div>
                        <AiFillStar /> {book.rating && book.rating.toFixed(2)}
                      </div>
                      <Rate
                        allowClear={false}
                        defaultValue={book.rating && book.rating}
                        onChange={(value) => handleRatingChange(value)}
                      />
                      <div>Отзывов: {review.length} </div>
                    </div>
                    <div className="book-price">
                      <div>{book.price} ₽</div>
                      <StyledButton>Купить</StyledButton>
                      {userId === book.creatorId && (
                        <div>
                          <StyledButton onClick={handleEditMode}>
                            Редактировать
                          </StyledButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="book-description">
                  <b>Описание</b> <p>{book.description}</p>
                </div>
                <div className="book-options">
                  <div onClick={handleShowReview}>Отзывы</div>
                  {book.snippet && (
                    <div onClick={handleShowSnippet}>Фрагмент</div>
                  )}
                </div>
              </StyledFullSizeBookCard>

              {isAuth && (
                <StyledForm onSubmit={formik.handleSubmit} id="review">
                  <b>Оставить отзыв:</b>
                  <span>
                    {targetUser?.id && (
                      <>
                        <span>
                          {targetUser?.id ? <span>Ответ на комментарий {targetUser?.fullName}</span> : null}
                          <span onClick={cancelTargetUser}>
                            <div className="cancel-targetuser">Отмена</div>
                          </span>
                        </span>
                      </>
                    )}
                  </span>
                  <textarea
                    id="text"
                    name="text"
                    onChange={formik.handleChange}
                    value={formik.values.text}
                  />
                  <StyledButton type="submit">Отправить</StyledButton>
                </StyledForm>
              )}
              {showReview ? (
                <div>Отзывы</div>
              ) : (
                book.snippet && <div>Ознакомительный фрагмент</div>
              )}
              {showReview ? (
                Array.isArray(review) && (
                  <Review
                    handleClick={handleReviewClick}
                    userId={userId}
                    review={review}
                  />
                )
              ) : (
                <>{book.snippet && <p>{book.snippet}</p>}</>
              )}
            </>
          )
        ) : (
          <EditBook id={+id} onChange={handleEditMode} book={book} />
        )}
      </div>
    </section>
  );
};

export default BookPage;
