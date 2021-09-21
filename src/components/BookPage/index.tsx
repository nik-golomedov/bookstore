import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import Rate from "rc-rate";
import { AiOutlineStar } from "react-icons/ai";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { BASE_URL } from "../../api/axios";
import { AddReviewI, BookI, TargetUserI } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addFavourites,
  addRating,
  addReview,
  deleteFavourites,
  getBook,
  getFavourites,
  getReview,
  isErrorBookSelector,
  isFavouriteSelector,
  isSuccessDeleteFavouriteSelector,
  isSuccessEditSelector,
  isSuccessFavouriteSelector,
  isSuccessRatingSelector,
  isSuccessAddedReplySelector,
  reviewSelector,
  singleBookSelector,
  isSuccessAddedReviewSelector,
} from "../../store/bookSlice";
import { isAuthSelector, userIdSelector } from "../../store/userSlice";
import StyledButton from "../../UI/buttons/styledButton";
import { StyledForm } from "../../UI/forms/styledForm";
import EditBook from "../EditBook";
import Review from "./components/Comments/Review";
import { StyledBookPage, StyledFullSizeBookCard } from "./StyledBookPage";
import "rc-rate/assets/index.css";

interface MatchParams {
  id: string;
}

const BookPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { id }: MatchParams = useParams();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);
  const review = useAppSelector(reviewSelector);
  const isErrorBook = useAppSelector(isErrorBookSelector);
  const isSuccessEdit = useAppSelector(isSuccessEditSelector);
  const isSuccessRating = useAppSelector(isSuccessRatingSelector);
  const userId: number | null = useAppSelector(userIdSelector);
  const book: BookI = useAppSelector(singleBookSelector);
  const isSuccessReply = useAppSelector(isSuccessAddedReplySelector);
  const isSuccessReview = useAppSelector(isSuccessAddedReviewSelector);
  const isFavourite = useAppSelector(isFavouriteSelector(+id));
  const isSuccessFavourite = useAppSelector(isSuccessFavouriteSelector);
  const isSuccessDeleteFavourite = useAppSelector(
    isSuccessDeleteFavouriteSelector,
  );
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(true);
  const [targetUser, setTargetUser] = useState<TargetUserI | null>({
    id: null,
  });

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
    setEditMode(!editMode);
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

  const handleReviewClick = (value: TargetUserI | null) => {
    if (!isAuth) {
      history.push("/login");
    }
    setTargetUser(value);
  };

  const cancelTargetUser = () => {
    setTargetUser({ id: null, fullName: null });
  };

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
            userId,
          }),
        );
      } else {
        dispatch(
          addReview({
            text: values.text,
            reviewId: targetUser.reviewId!,
            targetUserId: +targetUser.id,
            bookId: +id,
          }),
        );
      }
      setShowReview(true);
      formik.resetForm();
    },
  });

  useEffect(() => {
    dispatch(getReview(+id));
  }, [isSuccessReply, isSuccessReview]);

  useEffect(() => {
    if (ratingValue) {
      dispatch(
        addRating({
          value: ratingValue,
          bookId: +id,
        }),
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

  return (
    <StyledBookPage>
      <div>
        {!editMode ? (
          book && (
            <>
              <StyledFullSizeBookCard key={book.id}>
                <div className="book-main">
                  <div className="book-image">
                    <img src={book.image && `${BASE_URL}/${book.image}`} alt={book.title} />
                  </div>
                  <div className="book-section">
                    {isAuth
                      && (isFavourite.length === 0 ? (
                        <button
                          type="button"
                          className="book-favorites"
                          onClick={handleAddFavourites}
                        >
                          <span>Добавить в избранное</span>
                          <AiOutlineStar />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="book-favorites"
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
                      <Rate
                        allowClear={false}
                        defaultValue={book.rating && book.rating}
                        onChange={(value) => handleRatingChange(value)}
                      />
                      {book.rating && (
                      <span>
                        {book.rating.toFixed(2)}
                      </span>
                      ) }
                      <div className="book-review__count">
                        <span>Отзывов: </span>
                        {review.length}
                      </div>
                    </div>
                    <div className="book-price">
                      <div>
                        {book.price}
                        ₽
                      </div>
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
                  <b>Описание </b>
                  <p>{book.description}</p>
                </div>
                <div className="book-options">
                  <div role="button" tabIndex={0} onClick={handleShowReview}>
                    Отзывы
                  </div>
                  <div role="button" tabIndex={0} onClick={handleShowSnippet}>
                    Ознакомительный фрагмент
                  </div>
                </div>
              </StyledFullSizeBookCard>

              {isAuth && (
                <StyledForm onSubmit={formik.handleSubmit} id="review">
                  <b>Оставить отзыв:</b>
                  <span>
                    {targetUser?.id && (
                      <span>
                        {targetUser?.id ? (
                          <span>
                            Ответ на комментарий
                            {" "}
                            {targetUser?.fullName}
                          </span>
                        ) : null}
                        <span role="button" tabIndex={0} onClick={cancelTargetUser}>
                          <div className="cancel-targetuser">Отмена</div>
                        </span>
                      </span>
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
                review.length !== 0 && <div>Отзывы</div>
              ) : (
                book.snippet && <div>Ознакомительный фрагмент</div>
              )}
              {showReview ? (
                review.length !== 0 && (
                  <Review
                    handleClick={handleReviewClick}
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
    </StyledBookPage>
  );
};

export default BookPage;
