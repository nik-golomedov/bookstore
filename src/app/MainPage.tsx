import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { getBooks } from "../features/bookSlice";
import { StyledAside, StyledBookCard } from "../styledComponents/styled";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const [sort,setSort] = useState<string>("")
  const books = useAppSelector((state) => state.books.books);
  const sorted =()=>{
    const sortPrice =[...books].sort((a,b)=>b.price-a.price)
    const sortName = [...books].sort(function(a, b){
      const nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase()
      if (nameA < nameB) //сортируем строки по возрастанию
        return -1
      if (nameA > nameB)
        return 1
      return 0 // Никакой сортировки
    })
    if (sort ==="price") {
   return  sortPrice
  } else if(sort ==="name") {
    return  sortName
    
  }else if(sort ==="reversePrice") {
    return  sortPrice.reverse()
    
  } else if(sort ==="reverseName") {
    return  sortName.reverse()
  } else return books
  } 
  const setSortPrice = () => {
    setSort(sort !=="price"?"price":"reversePrice")
  }
  const setSortName = () => {
    setSort(sort !=="name"?"name":"reverseName")
  }
  const breakSort = () => {
    setSort("")
  }
  useEffect(() => {
    dispatch(getBooks());
  }, []);
  return (
    <div>
      <StyledAside>Сортировка<div onClick={setSortPrice}>Цена</div><div onClick={setSortName}>Имя</div><div className="break-sort" onClick={breakSort}>Сброс</div></StyledAside>
      {sorted().map((item) => (
        <StyledBookCard key={item.id}>
          <Link to={`/${item.id}`}>
          <div>{item.title}</div>  
          </Link>
          <div>Автор: {item.author}</div>
          <div>Описание: {item.description}</div>
          <div>Цена: {item.price}</div>
        </StyledBookCard>
      ))}
    </div>
  );
};

export default MainPage;
