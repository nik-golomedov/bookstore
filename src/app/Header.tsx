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
import { AddReviewI } from "../features/books/Book";
import Time from "../common/Time";

export interface SocketI {
  socket: Socket | null;
}

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
  const userId = useAppSelector(userIdSelector);

  const [newBooksNotification, setNewBooksNotification] = useState<NotifI[]>(
    []
  );

  const handleClick = (): void => {
    localStorage.removeItem("isAuth");
    dispatch(clearUser());
    socket?.disconnect();
    history.push("/login");
  };

  const handleClickNewBookNotification = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number
  ) => {
    e.stopPropagation();
    history.push(`/books/${id}`);
    setNewBooksNotification(
      newBooksNotification.filter((item) => item.id !== id)
    );
    setIsNotification(true);
  };

  const handleClickCommentNotification = (
    e: React.MouseEvent<HTMLDivElement>,
    bookId: number,
    id: number
  ) => {
    e.stopPropagation();
    history.push(`/books/${bookId}`);
    setNewCommentNotification(
      newCommentNotification.filter((item) => item.id !== id)
    );
  };

  const showNotificationWindow = (): void => {
    if (
      newBooksNotification.length !== 0 ||
      newCommentNotification.length !== 0
    ) {
      setIsNotification(!isNotification ? true : false);
    }
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
      newBooksNotification.length === 0 &&
      newCommentNotification.length === 0
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
                className="header-notification"
                onClick={showNotificationWindow}
              >
                <IoMdNotificationsOutline />
                {(newBooksNotification.length !== 0 ||
                  newCommentNotification.length !== 0) && (
                  <div className="notification-count">
                    {+newBooksNotification.length +
                      +newCommentNotification.length}
                  </div>
                )}
              </div>
              <StyledListItem className="logout-btn">
                <FiLogOut onClick={handleClick} />
              </StyledListItem>
              <StyledHeaderNotification
                displayNone={isNotification ? false : true}
              >
                {newBooksNotification.length !== 0 &&
                  newBooksNotification.map((item) => (
                    <StyledNotification key={item.id}>
                      <div
                        onClick={(e) =>
                          handleClickNewBookNotification(e, item.id)
                        }
                      >
                        Добавлена книга {item.title} автор:{item.author}
                        {item.createdAt && (
                          <div className="notification-time">
                            <Time createTime={item.createdAt!} />
                          </div>
                        )}
                      </div>
                    </StyledNotification>
                  ))}
                {newCommentNotification.length !== 0 &&
                  newCommentNotification.map((item) => (
                    <StyledNotification key={item.id}>
                      <div
                        onClick={(e) =>
                          handleClickCommentNotification(
                            e,
                            +item.bookId,
                            +item.id!
                          )
                        }
                      >
                        На ваш комментарий ответили {item.text.slice(0, 30)}
                        {item.createdAt && (
                          <div className="notification-time">
                            <Time createTime={item.createdAt!} />
                          </div>
                        )}
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
