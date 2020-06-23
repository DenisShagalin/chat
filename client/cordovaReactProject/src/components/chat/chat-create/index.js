import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../reusable/input";
import Button from "../../reusable/button";
import MultiSelect from "../../reusable/multi-select";
import history from "../../../services/history";
import "./index.css";
import { loadUsers } from "../../../common/actions/auth";

import socketIO from "../../../services/socket";

const CreateChat = ({ id, token, loadUsers, users }) => {
  const [name, setName] = useState("");
  const socket = socketIO(token);

  useEffect(() => {
    loadUsers(id);
  }, []);

  const [usersName, handleSetUsersName] = useState([]);

  const handleChange = (event) => {
    handleSetUsersName(event.target.value);
  };

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
        <MultiSelect
          handleChange={handleChange}
          values={usersName}
          users={users}
        />
        <Button
          title="Create"
          disabled={!name}
          onClick={() => {
            socket.emit("create_chat",
              {
                name,
                creator: id,
                type: 'public',
                users: [id, ...usersName.map(user => user.id)],
              }
            );
            history.push("/");
          }}
        />
      </div>
    </div>
  );
};

export default connect(
  (store) => ({
    id: store.auth.user.id,
    token: store.auth.token,
    users: store.auth.users,
  }),
  {
    loadUsers,
  }
)(CreateChat);
