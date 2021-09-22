import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useAppSelector } from "../../store";
import { isAuthSelector } from "../../store/userSlice";
import { StyledListItem } from "../../UI/listItem/styledListItem";

const NavBar: React.FC = () => {
  const isAuth = useAppSelector(isAuthSelector);

  return (
    <StyledNavBar>
      <Link to="/">
        <StyledListItem>Книги </StyledListItem>
      </Link>
      {isAuth && (
        <>
          <Link to="/profile">
            <StyledListItem>Профиль пользователя</StyledListItem>
          </Link>
          <Link to="/favorite">
            <StyledListItem>Избранное</StyledListItem>
          </Link>
        </>
      )}
    </StyledNavBar>
  );
};

export default NavBar;

const StyledNavBar = styled.div`
  display: flex;
  width: 100%;
  height: 25px;
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
  border-bottom: 0.5px solid #555;
  & li {
    padding: 0;
    margin: 0;
  }
  & a {
    margin: 0;
    margin-right: 10px;
  }
  & a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: #333;
  }
  & li:hover {
    padding-bottom: 3px;
    color: #26a9e0;
    border-bottom: 5px solid #26a9e0;
  }
`;
