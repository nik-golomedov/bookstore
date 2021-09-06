import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from "./Header";
import Login from "../features/auth/Login";
import SignUp from "../features/auth/SignUp";
import ProtectedRoute from "../common/ProtectedRoute";
import SignRoute from "../common/SignRoute";
import UserProfile from "../features/auth/UserProfile";
import { getUserProfile } from "../features/auth/userSlice";
import { useAppDispatch } from "../common/hooks";
import MainPage from "../features/books/MainPage";
import AddBook from "../features/books/AddBook";
import BookPage from "../features/books/Book";
import Favourites from "../features/books/Favourites";
import SubHeader from "./SubHeader";
import AddCategory from "../features/books/AddCategory";
import "./App.css";

const App:React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <main className="App">
      <Router>
        <Header></Header>
       <SubHeader />
        <Switch>
          <SignRoute path="/signup" exact component={SignUp} />
          <SignRoute path="/login" exact component={Login} />
          <ProtectedRoute path="/profile" exact component={UserProfile} />
          <ProtectedRoute path="/addbook" exact component={AddBook} />
          <ProtectedRoute path="/favourite" exact component={Favourites} />
          <ProtectedRoute path="/addcategory" exact component={AddCategory} />
          <Route path="/:id" exact component={BookPage} />
          <Route path="/" exact component={MainPage} />
          <Redirect to="/"/>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
