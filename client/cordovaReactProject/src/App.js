import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import history from "./services/history";
import "./index.css";

import SignIn from "./components/signin/signin";
import SignUp from "./components/signup/signup";
import ChatApp from "./components/chat";

const App = ({ token }) => (
  <Router history={history}>
    <div className="app">
      {token ? (
        <Switch>
          <Route path="/" component={ChatApp} />
          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Redirect to="/signin" />
        </Switch>
      )}
    </div>
  </Router>
);

export default connect(
  (store) => ({
    token: store.auth.token,
  }),
  {}
)(App);
