import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Time from "./Time";

import { useAppDispatch, useAppSelector } from "../common/hooks";
import {
  addCurrentReview,
  addFavourites,
  addRating,
  addReview,
  BookI,
  getReview,
} from "../features/bookSlice";
import {
  StyledButton,
  StyledForm,
  StyledFullSizeBookCard,
  StyledReview,
} from "../styledComponents/styled";
import EditBook from "./EditBook";

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

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

const BookPage: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user?.user);
  const user = useAppSelector((state) => state.user?.user);
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();
  const [ratingValue, setRatingValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const review = useAppSelector((state) => state.books.review);
  const { id }: MatchParams = useParams();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showRating, setShowRating] = useState<boolean>(false);
  const history = useHistory();
  const userId: number | null = useAppSelector(
    (state) => state.user.user && state.user.user.id
  );

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

  const handleAddFavourites = () => {
    dispatch(addFavourites({ userId: userId, bookId: +id }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRatingValue(() => e.target.value);
  };

  const handleRatingKeyUp = (e: React.KeyboardEvent, bookId: string): void => {
    if (e.key === "Enter") {
      dispatch(
        addRating({ value: ratingValue, userId: String(userId), bookId })
      );
    }
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

  const handleClick = (value: number | null, bookId: string): void => {
    dispatch(
      addRating({ value: String(hover), userId: String(userId), bookId })
    );
    handleShowRating();
  };

  const book: BookI[] = useAppSelector((state) =>
    state.books.books.filter((item) => +id === item.id)
  );
  return (
    <section>
      <div>
        {" "}
        {!editMode ? (
          book &&
          book.map((item: any) => (
            <StyledFullSizeBookCard key={item.id}>
              <div className="book-main">
                <div className="book-image">
                  <img src={item.image} alt={item.title} />
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
                    <h1>{item.title}</h1>
                  </div>
                  <div className="book-author">{item.author}</div>
                  <div>{item.category.value}</div>
                  <div className="book-rating">
                    <div>
                      <AiFillStar /> {item.rating.toFixed(2)}
                    </div>
                    {!showRating ? (
                      <div onClick={handleShowRating}>
                        <span className="book-add-rating">Оценить</span>
                      </div>
                    ) : (
                      <div className={classes.root}>
                        <Rating
                          name="hover-feedback"
                          value={item.rating}
                          precision={1}
                          onChange={(event, newValue) => {
                            setValue(() => newValue);
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(() => newHover);
                          }}
                          onClick={() => {
                            handleClick(value, id);
                          }}
                        />
                      </div>
                    )}
                    <div>Отзывов: {review.length} </div>
                  </div>
                  <div className="book-price">
                    <div>{item.price} ₽</div>
                    <StyledButton>Купить</StyledButton>
                    {userId === item.creator && (
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
                <b>Описание</b> <p>{item.description}</p>
              </div>
            </StyledFullSizeBookCard>
          ))
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
