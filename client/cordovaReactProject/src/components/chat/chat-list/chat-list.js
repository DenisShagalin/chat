import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import Input from "../reusable/input";
import Button from "../../reusable/button";
import './chat.css';

const arr = ['chat1', 'chat2'];

const ChatList = ({ signIn }) => {
  return (
    <div className="chat__container">
      <div className="chat_plus">
        <Button title="+" />
      </div>
      <input placeholder='Search...'/>
      <div className="chat_list">
        {arr.map(item => {
          return <span>{item}</span>
        })}
      </div>
    </div>
  );
};

export default connect(() => ({}), {})(ChatList);
