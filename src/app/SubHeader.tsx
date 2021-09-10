import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

import { useAppSelector } from "../common/hooks";
import {
  StyledListItem,
  StyledNotification,
  StyledSubHeader,
} from "../styledComponents/styled";

const SubHeader: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user?.user);
  const notification = useAppSelector((state) => state.books.notification);

  return (
    <>
      <StyledSubHeader>
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
    </>
  );
};

export default SubHeader;
