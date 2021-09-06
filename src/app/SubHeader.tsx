import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../common/hooks";
import { StyledListItem, StyledSubHeader } from "../styledComponents/styled";

const SubHeader: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user?.user);
  return (
    <StyledSubHeader>
      <Link to="/">
        <StyledListItem>Книги</StyledListItem>
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
