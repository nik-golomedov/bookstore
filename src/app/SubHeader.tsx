import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

import { useAppDispatch, useAppSelector } from "../common/hooks";
import { userIdSelector } from "../features/auth/userSlice";
import { addNotification } from "../features/books/bookSlice";
import {
  StyledListItem,
  StyledNotification,
  StyledSubHeader,
} from "../styledComponents/styled";

const SubHeader: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user?.user);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const notification = useAppSelector((state) => state.books.notification);

  if (isAuth) {
    const socket = io("http://localhost:7000");

    socket.on("connect", () => {
      socket.emit("checkUser", userId);
      socket.send("Hello!");
    });
    socket.on("bookAdded", (data) => {
      dispatch(addNotification(true));
    });
  }

  useEffect(() => {
    const socket = io("http://localhost:7000");
    if (isAuth) {
      socket.on("connect", () => {
        socket.emit("checkUser", userId);
        socket.send("Hello!");
      });
      socket.on("bookAdded", (data) => {
        dispatch(addNotification(true));
      });
    } else {
      socket.disconnect();
    }
  }, [isAuth]);

  return (
    <StyledSubHeader>
      {" "}
      {notification && (
        <StyledNotification>Поступила новая книга</StyledNotification>
      )}
      <Link to="/">
        <StyledListItem>Книги </StyledListItem>
      </Link>
      {isAuth && (
        <>
          {" "}
          <Link to="/profile">
            <StyledListItem>Профиль пользователя</StyledListItem>
          </Link>
          <Link to="/favourite">
            <StyledListItem>Избранное</StyledListItem>
          </Link>{" "}
        </>
      )}
    </StyledSubHeader>
  );
};

export default SubHeader;
