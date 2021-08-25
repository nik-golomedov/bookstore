import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { getUserProfile } from "../features/userSlice";

interface UserI {
  fullName?:string,
  email?:string,
  dob?:string
}

const UserProfile:React.FC = () => {
  const dispatch = useAppDispatch();
  const userProfile:UserI = useAppSelector((state) => state.user.data);
  console.log(userProfile)
  useEffect(() => {
    dispatch(getUserProfile());
  }, [localStorage.getItem("isAuth")]);
  return (
    <div>
      <div></div>
      <div>{userProfile.fullName}</div>
      <div>{userProfile.email}</div>
      <div>{userProfile.dob?.slice(0,10)}</div>
    </div>
  );
};

export default UserProfile;
