/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { Link, useHistory } from "react-router-dom";

import Time from "../Time";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteNotification,
  getNotification,
  notificationSelector,
} from "../../store/notificationSlice";
import { clearUser, isAuthSelector } from "../../store/userSlice";
import { socketSelector } from "../../store/appSlice";
import { DataNotificationI } from "../../../interfaces";
import { StyledListItem } from "../../UI/listItem/styledListItem";
import {
  StyledHeader,
  StyledHeaderNotification,
  StyledNotification,
} from "./styles";

const Header: React.FC = () => {
  const isAuth = useAppSelector(isAuthSelector);
  const dispatch = useAppDispatch();
  const socket = useAppSelector(socketSelector);
  const notification = useAppSelector(notificationSelector);
  const history = useHistory();
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [newNotification, setNewNotification] = useState<DataNotificationI[]>(
    [],
  );

  const handleClick = (): void => {
    localStorage.removeItem("isAuth");
    dispatch(clearUser());
    socket?.disconnect();
    history.push("/login");
  };

  const handleClickNewNotification = (
    e: React.MouseEvent<HTMLDivElement>,
    bookId: number,
    id: number,
  ) => {
    e.stopPropagation();
    setNewNotification((prev) => prev.filter((item) => item.id !== id));
    dispatch(deleteNotification(id));
    history.push(`/books/${bookId}`);
    setIsNotification(true);
  };

  const showNotificationWindow = (): void => {
    setIsNotification(!isNotification);
  };

  useEffect(() => {
    socket?.on("bookAdded", (data: DataNotificationI) => {
      setNewNotification((prev) => [...prev, data]);
    });
    socket?.on("newComment", (data: DataNotificationI) => {
      setNewNotification((prev) => [...prev, data]);
    });
    socket?.on("disconnect", () => {
      setNewNotification([]);
    });
  }, [socket]);

  useEffect(() => {
    if (newNotification.length === 0) {
      setIsNotification(false);
    }
  }, [newNotification]);

  useEffect(() => {
    dispatch(getNotification());
  }, [isAuth]);

  useEffect(() => {
    setNewNotification(notification);
  }, [notification]);

  useEffect(() => {
    setNewNotification(newNotification);
  }, [newNotification]);

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
                {!!newNotification.length && (
                  <div className="notification-count">
                    {+newNotification.length}
                  </div>
                )}
              </div>
              <StyledListItem className="logout-btn">
                <FiLogOut onClick={handleClick} />
              </StyledListItem>
              <StyledHeaderNotification displayNone={!isNotification}>
                {!!newNotification.length
                  && newNotification.map((item) => (
                    <StyledNotification key={item.id}>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleClickNewNotification(e, item.bookId!, item.id!)}
                      >
                        <span>{item.message}</span>
                        {item.createdAt && (
                          <div className="notification-time">
                            <Time createTime={item.createdAt!} />
                          </div>
                        )}
                      </div>
                    </StyledNotification>
                  ))}
                {newNotification.length === 0 && (
                  <span>Новых оповещений нет</span>
                )}
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
