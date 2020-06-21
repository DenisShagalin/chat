import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../reusable/button";
import "./index.css";

import socketIO from "../../../services/socket";

const ChatList = ({ token }) => {
  const [search, handleChangeSearch] = useState("");
  const [chats, handleSetChatsList] = useState([]);

  useEffect(() => {
    const socket = socketIO(token);
    socket.emit("chats", { search });
    socket.on("chats", handleSetChatsList);

    return () => {
      socket.off("chats");
    };
  }, [search]);

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
  }),
  {}
)(ChatList);
