import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header, { SocketI } from "./Header";
import Login from "../features/auth/Login";
import SignUp from "../features/auth/SignUp";
import ProtectedRoute from "../common/ProtectedRoute";
import SignRoute from "../common/SignRoute";
import UserProfile from "../features/auth/UserProfile";
import {
  getUserProfile,
  isAuthSelector,
  isErrorUserSelector,
  isSuccessUserSelector,
} from "../features/auth/userSlice";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import MainPage from "../features/books/MainPage";
import AddBook from "../features/books/AddBook";
import BookPage from "../features/books/Book";
import Favourites from "../features/books/Favourites";
import SubHeader from "./SubHeader";
import AddCategory from "../features/books/AddCategory";
import "./App.css";
import Spinner from "../common/Spinner";
import { io, Socket } from "socket.io-client";

const App: React.FC = () => {
  const [initialize, setInitialize] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  const isSuccessUser = useAppSelector(isSuccessUserSelector);
  const isErrorUser = useAppSelector(isErrorUserSelector);
  const isAuth = useAppSelector(isAuthSelector);

  useEffect(() => {
    if (isAuth) {
      const socket = io("http://localhost:8000");
      setSocket(socket);
      socket.on("connect", () => {
        socket.emit("checkUser", isAuth);
      });
    } else {
      socket?.disconnect();
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    if (isSuccessUser || isErrorUser) {
      setInitialize(true);
    }
  }, [isSuccessUser, isErrorUser]);
  return (
    <main className="App">
      <Router>
        {initialize ? (
          <>
            <Header socket={socket} />
            <SubHeader />
            <Switch>
              <SignRoute path="/signup" exact component={SignUp} />
              <SignRoute
                path="/login"
                exact
                component={() => <Login socket={socket} />}
              ></SignRoute>
              <ProtectedRoute path="/profile" exact component={UserProfile} />
              <ProtectedRoute path="/addbook" exact component={AddBook} />
              <ProtectedRoute path="/favourite" exact component={Favourites} />
              <ProtectedRoute
                path="/addcategory"
                exact
                component={AddCategory}
              />
              <Route path="/books/:id" exact component={BookPage} />
              <Route path="/" exact component={MainPage} />
              <Redirect to="/" />
            </Switch>{" "}
          </>
        ) : (
          <Spinner />
        )}
      </Router>
    </main>
  );
};

export default App;
