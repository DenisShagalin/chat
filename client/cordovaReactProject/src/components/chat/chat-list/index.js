import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../reusable/button";
import "./index.css";
import history from "../../../services/history";

import socketIO from "../../../services/socket";

const ChatList = ({ token, id }) => {
  const [search, handleChangeSearch] = useState("");
  const [chats, handleSetChatsList] = useState([]);
  const socket = socketIO(token);

  useEffect(() => {
    socket.emit("chats", { search, userId: id });
    socket.on(`chats/${id}`, handleSetChatsList);
    return () => {
      socket.off(`chats/${id}`);
    };
  }, [search]);

  useEffect(() => {
    chats.forEach((chat) => {
      socket.on(`notifications/${chat.id}`, (data) => {
        if (window.cordova) {
          window.cordova.plugins.notification.local.schedule({
            id: data.chat.id,
            title: `You have new message in chat - ${data.chat.name}`,
            text: data.message,
            foreground: true,
          });

          window.cordova.plugins.notification.local.on("click", function (
            notification
          ) {
            if (notification.id == data.chat.id) {
              history.push(`/chat/${data.chat.id}`);
            }
          });
        }
      });
    });

    return () => {
      chats.forEach((chat) => {
        socket.off(`notifications/${chat.id}`);
      });
    };
  }, [chats]);

  return (
    <div className="chat__container">
      <div className="chat_plus">
        <Link to="/create">
          <Button title="+" />
        </Link>
      </div>
      <input
        value={search}
        placeholder="Search..."
        onChange={(e) => handleChangeSearch(e.target.value)}
      />
      <div className="chat_list">
        {chats.map((item, i) => {
          return (
            <Link key={i} to={`/chat/${item.id}`}>
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default connect(
  (store) => ({
    token: store.auth.token,
    id: store.auth.user.id,
  }),
  {}
)(ChatList);
