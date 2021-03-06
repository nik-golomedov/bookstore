import React, { useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../store";
import { getUserProfile, isAuthSelector } from "../../store/userSlice";
import StyledButton from "../../UI/buttons/styledButton";

interface UserI {
  fullName: string;
  email: string;
  dob: string;
}

const UserProfile: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userProfile: UserI | null = useAppSelector(isAuthSelector);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const handleClickAddCategory = () => {
    history.push("/add-category");
  };

  const handleClickAddBook = () => {
    history.push("/add-book");
  };

  return (
    <StyledUserProfile>
      {userProfile && (
        <>
          <div className="user-fullName">
            <b> Имя пользователя: </b>
            {userProfile.fullName}
          </div>
          <div className="user-email">
            <b>Email: </b>
            {userProfile.email}
          </div>
          <div className="user-dob">
            <b>Дата рождения: </b>
            {moment(userProfile.dob).format("DD-MM-YYYY")}
          </div>
        </>
      )}
      <StyledButton onClick={handleClickAddCategory}>
        Добавить категорию
      </StyledButton>
      <StyledButton onClick={handleClickAddBook}>Добавить книгу</StyledButton>
    </StyledUserProfile>
  );
};

export default UserProfile;

const StyledUserProfile = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 400px;

  & > div {
    margin-bottom: 10px;
  }
  button {
    margin-top: 20px;
  }
`;
