import React from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import history from "../../services/history";

import ChatList from "./chat-list/chat-list";

const ChatContainer = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={ChatList} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default ChatContainer;
