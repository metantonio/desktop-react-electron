import React, { useState, useContext } from "react";
import { Context } from "./store/appContext.js";
import { BrowserRouter, Route, Router, Switch, Suspense, lazy } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop.js";
import { Spinner } from "reactstrap";

import injectContext from "./store/appContext.js";

//import { Navbar } from "./components/Navbar2/navbar.jsx";

import Error404 from "./views/404/404.jsx";

import Login from "./views/Login/login.jsx";

const LoadingComponent2 = () => {
  return (
    <div className="spinner-border text-warning" role="status" aria-hidden="true">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  const { store, actions } = useContext(Context)

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          {/* {store.logOutConfirmation ? <Navbar /> : <></>} */}
          <Switch>            
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="*">
              <Error404 />
            </Route>
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
