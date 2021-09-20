import React, { useEffect, useState } from "react";

import { FiLogOut, FiLogIn } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { Link, useHistory } from "react-router-dom";

import { AddReviewI, BookI, SocketI } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  clearUser,
  isAuthSelector,
} from "../../store/userSlice";
import { StyledListItem } from "../../UI/listItem/styledListItem";
import Time from "../Time";
import { StyledHeader, StyledHeaderNotification, StyledNotification } from "./StyledHeader";

interface NotifI {
  id: number;
  author: string;
  title: string;
  createdAt?: string;
}

const Header: React.FC<SocketI> = ({ socket }) => {
  const isAuth = useAppSelector(isAuthSelector);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [newCommentNotification, setNewCommentNotification] = useState<
    AddReviewI[]
  >([]);

  const [newBooksNotification, setNewBooksNotification] = useState<NotifI[]>(
    [],
  );
  const handleClick = (): void => {
    localStorage.removeItem("isAuth");
    dispatch(clearUser());
    socket?.disconnect();
    history.push("/login");
  };

  const handleClickNewBookNotification = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number,
  ) => {
    e.stopPropagation();
    history.push(`/books/${id}`);
    setNewBooksNotification(
      newBooksNotification.filter((item) => item.id !== id),
    );
    setIsNotification(true);
  };

  const handleClickCommentNotification = (
    e: React.MouseEvent<HTMLDivElement>,
    bookId: number,
    id: number,
  ) => {
    e.stopPropagation();
    history.push(`/books/${bookId}`);
    setNewCommentNotification(
      newCommentNotification.filter((item) => item.id !== id),
    );
  };

  const showNotificationWindow = (): void => {
    setIsNotification(!isNotification);
  };

  useEffect(() => {
    socket?.on("bookAdded", (data: BookI) => {
      setNewBooksNotification((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    socket?.on("newComment", (data) => {
      setNewCommentNotification((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    if (
      newBooksNotification.length === 0
      && newCommentNotification.length === 0
    ) {
      setIsNotification(false);
    }
  }, [newBooksNotification, newCommentNotification]);

  return (
    <StyledHeader>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="header-logo">Bookstore</div>
        <div className="header-nav">
          {isAuth ? (
            <div className="header-notification">
              <div
                role="button"
                tabIndex={0}
                className="header-notification"
                onClick={showNotificationWindow}
              >
                <IoMdNotificationsOutline />
                {(newBooksNotification.length !== 0
                  || newCommentNotification.length !== 0) && (
                  <div className="notification-count">
                    {+newBooksNotification.length
                      + +newCommentNotification.length}
                  </div>
                )}
              </div>
              <StyledListItem className="logout-btn">
                <FiLogOut onClick={handleClick} />
              </StyledListItem>
              <StyledHeaderNotification displayNone={!isNotification}>
                {newBooksNotification.length !== 0
                  && newBooksNotification.map((item) => (
                    <StyledNotification key={item.id}>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleClickNewBookNotification(e, item.id)}
                      >
                        <span>Добавлена книга </span>
                        {item.title}
                        <span>автор: </span>
                        {item.author}
                        {item.createdAt && (
                          <div className="notification-time">
                            <Time createTime={item.createdAt!} />
                          </div>
                        )}
                      </div>
                    </StyledNotification>
                  ))}
                {newCommentNotification.length !== 0
                  && newCommentNotification.map((item) => (
                    <StyledNotification key={item.id}>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleClickCommentNotification(
                          e,
                          +item.bookId,
                          +item.id!,
                        )}
                      >
                        <span>На ваш комментарий ответили </span>
                        {item.text.slice(0, 30)}
                        {item.createdAt && (
                          <div className="notification-time">
                            <Time createTime={item.createdAt!} />
                          </div>
                        )}
                      </div>

                    </StyledNotification>
                  ))}
                {(newBooksNotification.length === 0
                         && newCommentNotification.length === 0)
                         && <span>Новых оповещений нет</span>}
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
