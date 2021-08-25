import React from "react";
import { match, RouteComponentProps, useParams } from "react-router-dom";
import { useAppSelector } from "../common/hooks";
import { BookI } from "../features/bookSlice";
import { StyledFullSizeBookCard } from "../styledComponents/styled";
interface MatchParams {
  id: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}
const BookPage:React.FC = () => {
  const {id}:MatchParams = useParams();
  const book:BookI[] = useAppSelector((state) =>
    state.books.books.filter((item) => +id === item.id)
  );
  return (
      <div>
    {book.map((item:any)=><StyledFullSizeBookCard key={item.id}>
        <div className="book-section"><img src={item.header} alt="обложка" /></div>
        <div className="book-section">
      <div>{item.title}</div>
      <div>Автор: {item.author}</div>
      <div>Описание: {item.description}</div>
      <div>Цена: {item.price}</div>
      <div>Фрагмент: {item.snippet}</div></div>
    </StyledFullSizeBookCard>
    )}
    </div>
  );
};

export default BookPage;
