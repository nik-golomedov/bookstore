import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { getFavourites } from "../features/bookSlice";
import { StyledSection } from "../styledComponents/styled";

const Favourites:React.FC = () => {
  const dispatch = useAppDispatch()
  const userId:number | null = useAppSelector(state=>state.user.user && state.user.user.id)
  // const favBooks = useAppSelector(state=>state.books.books && state.books.books.filter(item=>item.id ===))
  const favList = useAppSelector(state=>state.books.fav)
  useEffect(() => {
    dispatch(getFavourites(userId))
  }, [])
  console.log(favList)
  return <div>
    <StyledSection>
        {/* {books &&
          sortedBooks.map((item) => (
            <StyledBookCard key={item.id}>
              <Link to={`/${item.id}`}>
                <div className="image-container">
                  <img src={item.header} alt={item.title} />
                </div>
              </Link>
              <div>
                <span>{item.title}</span>
              </div>
              <div>
                <b>Автор:</b> <span>{item.author}</span>
              </div>
              <div>
                <b>Описание:</b> <span>{item.description}</span>
              </div>
              <div>
                <b>
                  <span> {item.price} ₽ </span>
                </b>
              </div>
            </StyledBookCard>
          ))} */}
      </StyledSection>
  </div>;
};

export default Favourites;
