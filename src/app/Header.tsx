import React from "react";
import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
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
      <div className="header-logo">Bookstore</div>
      <div className="header-search">
        <input placeholder={"Поиск..."} />
        <button>
          <AiOutlineSearch />
        </button>
      </div>
      <div className="header-nav">
        {isAuth ? (
          <>
            <StyledListItem>
              <GrLogout onClick={handleClick} />
            </StyledListItem>
          </>
        ) : (
          <>
            <Link to="/login">
              <StyledListItem>
                <GrLogin />
              </StyledListItem>
            </Link>
          </>
        )}
      </div>
    </StyledHeader>
  );
};

export default Header;
