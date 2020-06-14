import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "../../reusable/button";
import history from "../../../services/history";
import socketIOClient from "socket.io-client";
import { Member } from './member';

import "./index.css";

const socketApi = process.env.REACT_APP_SOCKET_API;

const getChatId = (location) => {
  const path = location.split("/");
  const chatId = path[path.length - 1];
  return chatId;
};

const Chat = ({ userId, token }) => {
  const [message, setMessage] = useState("");
  const [pMessage, setPMessage] = useState("");
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState(null);

  const chatId = getChatId(history.location.pathname);
  const socket = socketIOClient(socketApi, {
    query: {
      token: token,
    },
  });

  useEffect(() => {
    socket.emit("entry_to_chat", { userId, chatId });
    socket.on(`chat_members/${chatId}`, (members) => {
      setMembers(members);
    });
    socket.on(`messages/${chatId}/${userId}`, (messages) => {
      setMessages(messages);
    });

    return () => {
      socket.emit("leave_chat", { userId, chatId });
      socket.off(`chat_members/${chatId}`);
      socket.off(`messages/${chatId}/${userId}`);
    };
  }, []);

  const postPublicMessage = () => {
    socket.emit("send_message", {
      msgOptions: {
        type: "public",
        message,
        chatId,
        userId,
        recipientId: null,
      },
      userOptions: { chatId, userId },
    });
    setMessage("");
  };

  const postPrivateMessage = () => {
    socket.emit("send_message", {
      msgOptions: {
        type: "private",
        message: pMessage,
        chatId,
        userId,
        recipientId: recipient.id,
      },
      userOptions: { chatId, userId },
    });
    setRecipient(null)
    setPMessage('')
  };

  return (
    <div className="chat_body">
      <div className="chat_body_leave">
        <Link to="/">
          <Button title="Leave Chat" />
        </Link>
      </div>
      <div className="chat_body_wrap">
        {recipient && (
          <div className="private">
            <div className="chat_body_leave">
              <Button
                title="Close"
                onClick={() => {
                  setRecipient(null)
                  setPMessage('')
                }}
              />
            </div>
            <TextareaAutosize
              aria-label="empty textarea"
              onChange={(e) => setPMessage(e.target.value)}
              value={pMessage}
            />
            <Button
              title="Send"
              onClick={postPrivateMessage}
              disabled={!pMessage}
            />
          </div>
        )}
        <div className="chat_body_members">
          {members.map((mem, i) => (
            <Member
              key={i}
              data={mem}
              onClick={setRecipient}
              userId={userId}
            />
          ))}
        </div>
        <div className="chat_body_messages">
          <div className="messages_list">
            {messages.map((msg) => (
              <div key={msg.id}>
                <span className="msg_name">{msg.user && msg.user.nick}</span>
                <span className="msg_msg">{msg.message}</span>
              </div>
            ))}
          </div>
          <div className="messages_inputs">
            <TextareaAutosize
              aria-label="empty textarea"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="message_input"
            />
            <Button
              title="Send"
              disabled={!message}
              onClick={postPublicMessage}
            />
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
  }),
  {}
)(Chat);
