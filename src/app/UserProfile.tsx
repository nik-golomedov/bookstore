import React from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { getUserProfile } from "../features/userSlice";
import { StyledButton, StyledUserProfile } from "../styledComponents/styled";

interface UserI {
  fullName?: string;
  email?: string;
  dob?: string;
}

const UserProfile: React.FC = () => {

  const history = useHistory();
  const dispatch = useAppDispatch();
  const userProfile: UserI | null = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const handleClickAddCategory = () => {
    history.push("/addcategory")
  }

  const handleClickAddBook = () => {
    history.push("/addbook")
  }

  return (
    <StyledUserProfile>
      <div>
        {userProfile && (
          <>
            <div>
              <b> Имя пользователя:</b> {userProfile.fullName}
            </div>
            <div>
              <b>Email:</b> {userProfile.email}
            </div>
            <div>
              <b>Дата рождения:</b> {userProfile.dob?.slice(0, 10)}
            </div>
          </>
        )}
        <StyledButton onClick={handleClickAddCategory}>
          Добавить категорию
        </StyledButton>
        <StyledButton onClick={handleClickAddBook}>
          Добавить книгу
        </StyledButton>
      </div>
    </StyledUserProfile>
  );
};

export default UserProfile;
