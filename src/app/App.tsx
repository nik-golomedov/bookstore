import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import SignRoute from "./SignRoute";
import UserProfile from "./UserProfile";
import { getUserProfile } from "../features/userSlice";
import { useAppDispatch } from "../common/hooks";
import MainPage from "./MainPage";
import AddBook from "./AddBook";
import BookPage from "./Book";
import Favourites from "./Favourites";
import SubHeader from "./SubHeader";
import AddCategory from "./AddCategory";

const App = () => {
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
          <Route path="/" exact component={MainPage}></Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
