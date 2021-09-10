import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { Link, useHistory } from "react-router-dom";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Socket } from "socket.io-client";

import { useAppDispatch, useAppSelector } from "../common/hooks";
import {
  clearUser,
  isAuthSelector,
  userIdSelector,
} from "../features/auth/userSlice";
import {
  StyledHeader,
  StyledHeaderNotification,
  StyledListItem,
  StyledNotification,
} from "../styledComponents/styled";
import { BookI } from "../features/books/bookSlice";

export interface SocketI {
  socket: Socket | null;
}

const Header: React.FC<SocketI> = ({ socket }) => {
  const isAuth = useAppSelector(isAuthSelector);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const userId = useAppSelector(userIdSelector);
  interface NotifI {
    id: number;
    author: string;
    title: string;
  }
  const [newBooks, setNewBooks] = useState<NotifI[]>([
    {
      id: 1,
      author:
        "ggsadsadasdaseggsadsadasdaseggsadsadasdaseggsadsadasdaseggsadsadasdaseggsadsadasdaseggsadsadasdase",
      title: "ffasdasdas",
    },
    { id: 2, author: "gge", title: "ff" },
    { id: 3, author: "gge", title: "ff" },
    { id: 34, author: "gge", title: "ff" },
    { id: 35, author: "gge", title: "ff" },
  ]);

  const handleClick = (): void => {
    localStorage.removeItem("isAuth");
    dispatch(clearUser());
    socket?.disconnect();
    history.push("/login");
  };

  const handleClickNotification = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number
  ) => {
    e.stopPropagation();
    history.push(`/books/${id}`);
    setNewBooks(newBooks.filter((item) => item.id !== id));
    setIsNotification(true);
  };

  const showNotificationWindow = (): void => {
    if (newBooks.length !== 0) {
      setIsNotification(!isNotification ? true : false);
    }
  };

  useEffect(() => {
    socket?.on("bookAdded", (data: BookI) => {
      setNewBooks((prev) => [...prev, data]);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    if (newBooks.length === 0) {
      setIsNotification(false);
    }
  }, [newBooks]);

  return (
    <StyledHeader>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="header-logo">Bookstore</div>
        <div className="header-nav">
          {isAuth ? (
            <div className="header-notification">
              <div
                className="header-notification"
                onClick={showNotificationWindow}
              >
                <IoMdNotificationsOutline />
                {newBooks.length !== 0 && (
                  <div className="notification-count">{newBooks.length}</div>
                )}
              </div>
              <StyledListItem className="logout-btn">
                <FiLogOut onClick={handleClick} />
              </StyledListItem>
              <StyledHeaderNotification
                displayNone={isNotification ? false : true}
              >
                {newBooks.length !== 0 &&
                  newBooks.map((item) => (
                    <StyledNotification key={item.id}>
                      <div onClick={(e) => handleClickNotification(e, item.id)}>
                        Добавлена книга {item.title} автор:{item.author}
                      </div>
                    </StyledNotification>
                  ))}
              </StyledHeaderNotification>
            </div>
          ) : (
            <>
              <Link to="/login">
                <StyledListItem>
                  <FiLogIn />
                </StyledListItem>
              </Link>
            </>
          )}
        </div>
      </IconContext.Provider>
    </StyledHeader>
  );
};

export default Header;
