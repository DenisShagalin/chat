import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "../../reusable/button";
import MultiSelect from "../../reusable/multi-select";
import history from "../../../services/history";
import { Member } from "./member";
import { loadUsers } from "../../../common/actions/auth";
import socketIO from "../../../services/socket";
import isBase64 from "is-base64";
import "./index.css";

const getChatId = (location) => {
  const path = location.split("/");
  const chatId = path[path.length - 1];
  return chatId;
};

const Chat = ({ userId, token, loadUsers, users }) => {
  const [message, handleSetMessage] = useState("");
  const [members, handleMembersFromSocket] = useState([]);
  const [messages, handleMessagesFromSocket] = useState([]);
  const [isPopupOpen, handleTogglePopup] = useState(false);
  const [usersName, handleSetUsersName] = useState([]);
  const [filteredUsers, handleSetFilteredUsers] = useState([]);

  const handleChange = (event) => {
    handleSetUsersName(event.target.value);
  };

  const chatId = getChatId(history.location.pathname);
  const socket = socketIO(token);

  useEffect(() => {
    const filteredUsers = [];
    users.forEach((user) => {
      const isMember = members.find((m) => m.user.id === user.id);
      if (!isMember) {
        filteredUsers.push(user);
      }
    });
    handleSetFilteredUsers(filteredUsers);
  }, [users, members]);

  useEffect(() => {
    socket.emit("entry_to_chat", { userId, chatId });
    socket.on(`chat_members/${chatId}`, handleMembersFromSocket);
    socket.on(`messages/${chatId}`, handleMessagesFromSocket);

    return () => {
      socket.off(`chat_members/${chatId}`);
      socket.off(`messages/${chatId}/${userId}`);
    };
  }, []);

  const postMessage = () => {
    socket.emit("send_message", {
      msgOptions: {
        message,
        chatId,
        userId,
      },
      userOptions: { chatId, userId },
    });
    handleSetMessage("");
  };

  const postPicture = () => {
    if (!window.cordova) return;

    navigator.camera.getPicture(
      (image) => {
        socket.emit("send_message", {
          msgOptions: {
            message: "data:image/png;base64," + image,
            chatId,
            userId,
          },
          userOptions: { chatId, userId },
        });
      },
      (error) => console.log(error),
      {
        destinationType: navigator.camera.DestinationType.DATA_URL,
      }
    );
  };

  const renderMessage = (msg) => {
    if (isBase64(msg, { mimeRequired: true })) {
      return <img src={msg} />;
    }
    return msg;
  };

  return (
    <div className="chat_body">
      <div className="chat_body_leave">
        <Link to="/">
          <Button title="Back" />
        </Link>
        <a>
          <Button
            title="Add users"
            onClick={() => {
              handleTogglePopup(true);
              loadUsers(userId);
            }}
          />
        </a>
        <Link to="/">
          <Button
            title="Leave Chat"
            onClick={() => {
              socket.emit("leave_chat", { userId, chatId });
            }}
          />
        </Link>
      </div>
      <div className="chat_body_wrap">
        {isPopupOpen && (
          <div className="private">
            <div className="chat_body_leave">
              <Button
                title="Close"
                onClick={() => {
                  handleTogglePopup(false);
                  handleSetUsersName([]);
                }}
              />
            </div>
            <MultiSelect
              handleChange={handleChange}
              values={usersName}
              users={filteredUsers}
            />
            <Button
              title="Add Users"
              onClick={() => {
                socket.emit("add_new_members_to_chat", {
                  chatId,
                  users: usersName.map((user) => user.id),
                });
                handleTogglePopup(false);
                handleSetUsersName([]);
              }}
            />
          </div>
        )}
        <div className="chat_body_members">
          {members.map((mem, i) => (
            <Member key={i} data={mem} />
          ))}
        </div>
        <div className="chat_body_messages">
          <div className="messages_list">
            {messages.map((msg) => (
              <div key={msg.id}>
                <span className="msg_name">{msg.user && msg.user.nick}</span>
                <span className="msg_msg">{renderMessage(msg.message)}</span>
              </div>
            ))}
          </div>
          <div className="messages_inputs">
            <TextareaAutosize
              aria-label="empty textarea"
              onChange={(e) => handleSetMessage(e.target.value)}
              value={message}
              className="message_input"
            />
            <Button title="Send" disabled={!message} onClick={postMessage} />
            <Button title="Picture" onClick={postPicture} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (store) => ({
    userId: store.auth.user.id,
    token: store.auth.token,
    users: store.auth.users,
  }),
  { loadUsers }
)(Chat);
