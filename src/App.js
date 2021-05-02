import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./routing/PublicRoute";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Home from "./containers/Home";
import PrivateRoute from "./routing/PrivateRoute";
import Restaurant from "./containers/Restaurant";

function App() {
  const [isAuth, changeAuth] = useState(!!localStorage.getItem("authUser"));
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute
            restricted={isAuth ? true : false}
            component={SignIn}
            path="/sign-in"
            exact
            changeAuth={changeAuth}
          />
          <PublicRoute
            restricted={isAuth ? true : false}
            component={SignUp}
            path="/sign-up"
            exact
            changeAuth={changeAuth}
          />
          <PrivateRoute component={Restaurant} path="/restaurant/:id" />
          <PrivateRoute component={Home} path="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
