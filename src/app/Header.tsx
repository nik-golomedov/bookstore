import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { GrLogin, GrLogout } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { clearUser } from "../features/userSlice";
import { StyledHeader, StyledListItem } from "../styledComponents/styled";

const Header: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user?.user);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleClick = (): void => {
    localStorage.removeItem("isAuth");
    dispatch(clearUser());
    history.push("/login");
  };

  return (
    <StyledHeader>
      {isAuth && (
        <>
          {" "}
          <Link to="/">
            <StyledListItem>Main Page</StyledListItem>
          </Link>
          <Link to="/addbook">
            <StyledListItem>Add Book</StyledListItem>
          </Link>
          <Link to="/profile">
            <StyledListItem>Profile</StyledListItem>
          </Link>
          <Link to="/secret">
            <StyledListItem>Secret</StyledListItem>
          </Link>
        </>
      )}
      {isAuth ? (
        <StyledListItem>
          <GrLogout onClick={handleClick} />
        </StyledListItem>
      ) : (
        <Link to="/login">
          <StyledListItem>
            <GrLogin />
          </StyledListItem>
        </Link>
      )}

      <StyledListItem>
        <AiOutlineStar />
      </StyledListItem>
    </StyledHeader>
  );
};

export default Header;
