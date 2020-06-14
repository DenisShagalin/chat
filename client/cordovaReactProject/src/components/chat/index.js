import React from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import history from "../../services/history";

import ChatList from "./chat-list";
import CreateChat from './chat-create';
import Chat from './chat';

const ChatContainer = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={ChatList} />
        <Route path="/create" component={CreateChat} />
        <Route path="/chat/:id" component={Chat} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default ChatContainer;
