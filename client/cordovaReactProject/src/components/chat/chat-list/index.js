import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../reusable/button";
import { loadAllChats } from "../../../common/actions/chat";
import "./index.css";

const ChatList = ({ chats, loadAllChats }) => {
  const [search, changeSearch] = useState("");

  useEffect(() => {
    loadAllChats(search);
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
        onChange={(e) => changeSearch(e.target.value)}
      />
      <div className="chat_list">
        {chats.map((item, i) => {
          return <Link key={i} to={`/chat/${item.id}`}>{item.name}</Link>;
        })}
      </div>
    </div>
  );
};

export default connect(
  (store) => ({
    chats: store.chat.chats,
  }),
  {
    loadAllChats,
  }
)(ChatList);
