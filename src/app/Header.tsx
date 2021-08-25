import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { GrLogout } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { auth } from "../features/loginSlice";
import { StyledHeader, StyledListItem } from "../styledComponents/styled";

const Header: React.FC = () => {
  const isAuth = useAppSelector(state=>state.login.auth)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleClick = (): void => {
    localStorage.removeItem("isAuth");
    dispatch(auth())
    history.push("/login")
  };

  return (
    <StyledHeader>
      {isAuth &&<> <Link to="/profile" ><StyledListItem>Profile</StyledListItem></Link><Link to="/secret"><StyledListItem>Secret</StyledListItem></Link></> }
      {isAuth ? (
        <StyledListItem>
          <GrLogout onClick={handleClick} />
        </StyledListItem>
      ) : (
        <Link to="/login">
          <StyledListItem>
            <BiUserCircle />
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
