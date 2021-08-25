import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import SaveComponent from "./SaveComponent";
import SignRoute from "./SignRoute";
import UserProfile from "./UserProfile";

const App = () => {
  return (
    <main className="App">
      <Router>
        <Header></Header>
        <Switch>
          <SignRoute path="/signup" exact component={SignUp}/>
          <SignRoute path="/login" exact component={Login}/>
          <ProtectedRoute path="/profile" exact component={UserProfile} />
          <ProtectedRoute path="/secret" exact component={SaveComponent} />
          <Route path="/" exact></Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
