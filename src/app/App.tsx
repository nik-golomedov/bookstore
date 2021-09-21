import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { io, Socket } from "socket.io-client";

import AddBook from "../components/AddBook";
import AddCategory from "../components/AddCategory";
import BookPage from "../components/BookPage";
import Favourites from "../components/Favourites";
import Header from "../components/Header";
import Login from "../components/Login";
import MainPage from "../components/MainPage";
import NavBar from "../components/NavBar";
import SignUp from "../components/SignUp";
import Spinner from "../components/Spinner";
import UserProfile from "../components/UserProfile";
import ProtectedRoute from "../routes/ProtectedRoute";
import SignRoute from "../routes/SignRoute";
import { useAppDispatch, useAppSelector } from "../store";
import {
  getUserProfile,
  isAuthSelector,
  isErrorUserSelector,
  isSuccessUserSelector,
} from "../store/userSlice";
import "./App.css";

const App: React.FC = () => {
  const [initialize, setInitialize] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  const isSuccessUser = useAppSelector(isSuccessUserSelector);
  const isErrorUser = useAppSelector(isErrorUserSelector);
  const isAuth = useAppSelector(isAuthSelector);

  useEffect(() => {
    if (isAuth) {
      const socketIO = io("http://localhost:8000", { forceNew: true });
      setSocket(socketIO);
      socketIO?.on("connect", () => {

      });
      socketIO.emit("checkUser", isAuth);
    } else {
      socket?.disconnect();
    }
    return () => {
      socket?.disconnect();
    };
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
            <NavBar />
            <Switch>
              <SignRoute path="/signup" exact component={SignUp} />
              <SignRoute
                path="/login"
                exact
                component={() => <Login socket={socket} />}
              />
              <ProtectedRoute path="/profile" exact component={UserProfile} />
              <ProtectedRoute path="/add-book" exact component={AddBook} />
              <ProtectedRoute path="/favourite" exact component={Favourites} />
              <ProtectedRoute
                path="/add-category"
                exact
                component={AddCategory}
              />
              <Route path="/books/:id" exact component={BookPage} />
              <Route path="/" exact component={MainPage} />
              <Redirect to="/" />
            </Switch>
          </>
        ) : (
          <Spinner />
        )}
      </Router>
    </main>
  );
};

export default App;
