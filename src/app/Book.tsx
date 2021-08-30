import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { AiOutlineStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import moment from "moment";
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
  StyledForm,
  StyledFullSizeBookCard,
  StyledReview,
} from "../styledComponents/styled";

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
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  const [ratingValue, setRatingValue] = useState<string>("");
  const messageRef: React.MutableRefObject<any> = useRef();
  const dispatch = useAppDispatch();
  const review = useAppSelector((state) => state.books.review);
  const { id }: MatchParams = useParams();
  const userId: number | null = useAppSelector(
    (state) => state.user.user && state.user.user.id
  );
  const userName: string | null = useAppSelector(
    (state) => state.user.user && state.user.user.fullName
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
      const user = { fullName: userName };
      dispatch(
        addCurrentReview({
          ...values,
          id,
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

  const handleClick = (value: number | null, bookId: string):void => {
    dispatch(addRating({ value: String(hover), userId: String(userId), bookId }));
  };

  const book: BookI[] = useAppSelector((state) =>
    state.books.books.filter((item) => +id === item.id)
  );  
  

  return (
    <section>
      <div>
        {book &&
          book.map((item: any) => (
            <StyledFullSizeBookCard key={item.id}>
              <div className="book-section">
                <img src={item.image} alt="обложка" />
              </div>
              <div className="book-section">
                <div>
                  {item.title} <AiOutlineStar onClick={handleAddFavourites} />
                </div>
                <div>
                  <b>Автор:</b> {item.author}
                </div>
                <div>
                  <b>Описание:</b> {item.description}
                </div>
                <div>
                  <b>Рейтинг:</b>
                  <div className={classes.root}>
                    <Rating
                      name="hover-feedback"
                      value={value}
                      precision={1}
                      onChange={(event, newValue) => {
                        setValue(()=>newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(()=>newHover);
                      }}
                      onClick={()=>handleClick(value,id)}
                    />
                  </div>
                  {item.rating}
                </div>
                <div>
                  <b>Цена:</b> {item.price} ₽
                </div>
                <div>
                  <b>Фрагмент:</b> {item.snippet}
                </div>
              </div>
            </StyledFullSizeBookCard>
          ))}
        <div>
          <StyledForm onSubmit={formik.handleSubmit}>
            <b>Оставить отзыв:</b>
            <textarea
              id="text"
              name="text"
              onChange={formik.handleChange}
              value={formik.values.text}
            />
            <button type="submit">Submit</button>
          </StyledForm>
          Отзывы:
          <div>
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
                      {moment().format(item.text)}
                    </div>
                  </StyledReview>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookPage;
