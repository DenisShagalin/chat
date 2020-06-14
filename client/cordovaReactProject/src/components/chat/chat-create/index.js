import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../reusable/input";
import Button from "../../reusable/button";
import { createChat } from '../../../common/actions/chat';
import history from '../../../services/history';

import "./index.css";

const CreateChat = ({ id, createChat }) => {
  const [name, setName] = useState("");

  return (
    <div className="create-chat__container">
      <div className="chat_plus">
        <Link to="/">
          <Button title="Back" />
        </Link>
      </div>
      <div className="create-chat__data">
        <Input
          label="Chat Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="s_input"
        />
        <Button
          title="Create"
          disabled={!name}
          onClick={() => {
            createChat(name, id);
            history.push('/');
          }}
        />
      </div>
    </div>
  );
};

export default connect((store) => ({
  id: store.auth.user.id,
}), {
  createChat,
})(CreateChat);
