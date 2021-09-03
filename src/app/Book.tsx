import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";
import Time from "./Time";
import "rc-rate/assets/index.css";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import {
  addCurrentReview,
  addFavourites,
  addRating,
  addReview,
  BookI,
  getBook,
  getReview,
} from "../features/bookSlice";
import {
  StyledButton,
  StyledForm,
  StyledFullSizeBookCard,
  StyledReview,
} from "../styledComponents/styled";
import EditBook from "./EditBook";
import Rate from "rc-rate";

interface MatchParams {
  id: string;
}

export interface addReviewI {
  text: string;
  bookId: string;
  userId: string;
  userName?: string;
  createAt: string;
}

const BookPage: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user?.user);
  const user = useAppSelector((state) => state.user?.user);
  const [ratingValue, setRatingValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const review = useAppSelector((state) => state.books.review);
  const { id }: MatchParams = useParams();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showRating, setShowRating] = useState<boolean>(false);
  const history = useHistory();
  const isSuccessRating = useAppSelector(
    (state) => state.books.isSuccessRating
  );
  const userId: number | null = useAppSelector(
    (state) => state.user.user && state.user.user.id
  );
  const book: BookI = useAppSelector((state) => state.books.singleBook);
  const formik = useFormik({
    initialValues: {
      text: "",
      bookId: id,
      userId: String(userId),
      createAt: "",
    } as addReviewI,
    onSubmit: (values: addReviewI) => {
      dispatch(addReview({ ...values, bookId: id, userId: String(userId) }));
      dispatch(
        addCurrentReview({
          ...values,
          bookId: id,
          user,
          createdAt: new Date().toISOString(),
        })
      );
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
          value: String(ratingValue),
          userId: String(userId),
          bookId: id,
        })
      );
    }
  }, [ratingValue]);

  useEffect(() => {
    dispatch(getBook(+id));
  }, [ratingValue, isSuccessRating]);

  const handleAddFavourites = () => {
    dispatch(addFavourites({ userId: userId, bookId: +id }));
  };

  const handleRatingChange = (value: string): void => {
    setRatingValue(value);
  };

  const handleEditMode = () => {
    setEditMode(!editMode ? true : false);
  };

  const handleShowRating = () => {
    if (!isAuth) {
      history.push("/login");
    }
    setShowRating(!showRating ? true : false);
  };

  return (
    <section>
      <div>
        {" "}
        {!editMode ? (
          book && (
            <StyledFullSizeBookCard key={book.id}>
              <div className="book-main">
                <div className="book-image">
                  <img src={book.image} alt={book.title} />
                </div>
                <div className="book-section">
                  {isAuth && (
                    <div
                      className="book-favourites"
                      onClick={handleAddFavourites}
                    >
                      Добавить в избранное <AiOutlineStar />
                    </div>
                  )}
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
                      onChange={(value) => handleRatingChange(String(value))}
                    />
                    <div>Отзывов: {review.length} </div>
                  </div>
                  <div className="book-price">
                    <div>{book.price} ₽</div>
                    <StyledButton>Купить</StyledButton>
                    {userId === book.creator && (
                      <div>
                        <StyledButton onClick={handleEditMode}>
                          Редактировать
                        </StyledButton>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="book-snippet">
                <b>Описание</b> <p>{book.description}</p>
              </div>
            </StyledFullSizeBookCard>
          )
        ) : (
          <EditBook id={id} onChange={handleEditMode} book={book} />
        )}
        <div>
          {isAuth && (
            <StyledForm onSubmit={formik.handleSubmit}>
              <b>Оставить отзыв:</b>
              <textarea
                id="text"
                name="text"
                onChange={formik.handleChange}
                value={formik.values.text}
              />
              <StyledButton type="submit">Отправить</StyledButton>
            </StyledForm>
          )}
          Отзывы:
          <>
            {Array.isArray(review) &&
              review
                .slice()
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .map((item) => (
                  <StyledReview key={item.id}>
                    <div>
                      <div>{item.user && item.user.fullName}</div>
                      <div>
                        <Time createTime={item.createdAt} />
                      </div>
                    </div>
                    <div>
                      <b>Комментарий:</b>
                      {item.text}
                    </div>
                  </StyledReview>
                ))}
          </>
        </div>
      </div>
    </section>
  );
};

export default BookPage;
