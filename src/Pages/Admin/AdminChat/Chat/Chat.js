/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import ListMessage from "./ListMessage";
import TypeMessage from "./TypeMessage";
import useConnectSocket from "../../../../Hooks/useConnectSocket";
import { BASE_URL } from "../../../../Utils/BaseUrl";
import classNames from "classnames/bind";
import styles from "../AdminChat.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function Chat(props) {
  const socket = useConnectSocket(io);
  const [messages, setMessages] = useState([]);
  const userInfo = useSelector((state) => state.auth.login);
  const idConversation = useSelector((state) => state.chats.idConversation);
  const nameConversation = useSelector((state) => state.chats.nameConversation);

  useEffect(() => {
    if (idConversation) {
      const getAllMessageByConversation = async () => {
        const { data } = await axios.get(
          `${BASE_URL}/chat/message?idConversation=${idConversation}`
        );
        setMessages(data.messageList);
      };

      getAllMessageByConversation();
    }
  }, [idConversation]);

  useEffect(() => {
    if (socket) {
      socket.emit("admin_join_conversation", idConversation);

      socket.on("newMessage", (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [socket, messages]);

  const handleFormSubmit = async (message) => {
    const sender = userInfo.fullname;

    const payload = {
      sender,
      message,
      idConversation,
    };
    const { data } = await axios.post(`${BASE_URL}/chat/save`, payload);
    socket.emit("chat", data);
  };
  return (
    <div className={cx("ad-chatuser")}>
      <div className={cx("ad-chatuser-user")}>
        <span className={cx("ad-chatuser-user-name")}>{nameConversation}</span>
      </div>

      {messages ? (
        <ListMessage cx={cx} messages={messages} user={userInfo}></ListMessage>
      ) : (
        ""
      )}

      <TypeMessage cx={cx} onSubmit={handleFormSubmit}></TypeMessage>
    </div>
  );
}

export default Chat;
