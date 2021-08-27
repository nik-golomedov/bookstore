import { useFormik } from "formik";
import React, { useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { match, RouteComponentProps, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { addFavourites, addReview, BookI, getReview } from "../features/bookSlice";
import { StyledForm, StyledFullSizeBookCard } from "../styledComponents/styled";
interface MatchParams {
  id: string;
}
export interface addReviewI {
  review: string;
  id: string;
}

const BookPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const review = useAppSelector((state) => state.books.review);
  const { id }: MatchParams = useParams();
  const userId:number |null = useAppSelector(state=>state.user.user && state.user.user.id)
  const formik = useFormik({
    initialValues: { review: "", id: id } as addReviewI,
    onSubmit: (values: addReviewI) => {
      dispatch(addReview({ ...values, id }));
      formik.resetForm();
    },
  });
  useEffect(() => {
    dispatch(getReview(id));
  }, []);

  const handleAddFavourites = () => {
    dispatch(addFavourites({userId:userId,bookId:+id}))
  }
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
                <img src={item.header} alt="обложка" />
                
              </div>
              <div className="book-section">
                <div>{item.title}  <AiOutlineStar onClick={handleAddFavourites} /></div>
                <div>
                  <b>Автор:</b> {item.author}
                </div>
                <div>
                  <b>Описание:</b> {item.description}
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
            id="review"
            name="review"
            onChange={formik.handleChange}
            value={formik.values.review}
          />
          <button type="submit">Submit</button>

        </StyledForm>
        Отзывы: {Array.isArray(review) && review.map(item=><div key={item.id}>{item.review}</div>)}
      </div>
      </div>
     
    </section>
  );
};

export default BookPage;
