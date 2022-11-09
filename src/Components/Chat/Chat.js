/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { LineOutlined, MessageOutlined } from "@ant-design/icons";
import ListMessage from "./ListMessage/ListMessage";
import TypeMessage from "./TypeMessage/TypeMessage";
import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import useConnectSocket from "../../Hooks/useConnectSocket";
import { Tooltip } from "antd";
import { BASE_URL } from "../../Utils/BaseUrl";
import axios from "axios";

const cx = classNames.bind(styles);
const Chat = ({ openChat, setOpenChat }) => {
  const [messages, setMessages] = useState([]);
  const socket = useConnectSocket(io);

  const userInfo = useSelector((state) => state.users.user);
  const authLogin = useSelector((state) => state.auth.login);

  useEffect(() => {
    if (openChat) {
      const getAllMessageByConversation = async () => {
        const { data } = await axios.get(
          `${BASE_URL}/chat/message?idUser=${userInfo?._id}`
        );
        setMessages(data.messageList);
      };

      getAllMessageByConversation();
    }
  }, [openChat]);

  useEffect(() => {
    if (socket) {
      socket.emit("join_conversation", userInfo?._id);
      //setup response
      socket.on("newMessage", (message) => {
        setMessages([...messages, message]);
      });
    }
    // eslint-disable-next-line
  }, [messages, socket]);

  const handleNewUserMessage = async (message) => {
    const sender = userInfo?.fullname;
    if (messages.length === 0) {
      socket.emit("create_conversation", userInfo);

      socket.on("response_room", async (conversation) => {
        const payload = {
          sender,
          message,
          idConversation: conversation._id,
        };
        const { data } = await axios.post(`${BASE_URL}/chat/save`, payload);
        socket.emit("chat", data);
      });
    } else {
      const idConversation =
        messages[0].idConversation._id || messages[0].idConversation;
      // request save message
      const payload = {
        sender,
        message,
        idConversation,
      };
      const { data } = await axios.post(`${BASE_URL}/chat/save`, payload);
      socket.emit("chat", data);
    }
  };

  return (
    <div>
      <div className={cx("appchat")}>
        {authLogin === null ? (
          <Tooltip
            title="Vui lòng đăng nhập để được hỗ trợ"
            placement="topRight"
          >
            <div className={cx("openchat")}>
              <MessageOutlined />
            </div>
          </Tooltip>
        ) : openChat ? (
          ""
        ) : (
          <div
            className={cx("openchat")}
            onClick={() => setOpenChat(!openChat)}
          >
            <MessageOutlined />
          </div>
        )}

        {openChat ? (
          <div className={cx("chatuser")}>
            <div className={cx("chatuser-user")}>
              <span className={cx("chatuser-user-name")}>Hỗ trợ trực tiếp</span>
              <span
                className={cx("chatuser-user-line")}
                onClick={() => setOpenChat(!openChat)}
              >
                <LineOutlined />
              </span>
            </div>

            {messages ? (
              <ListMessage
                messages={messages}
                user={userInfo}
                openChat={openChat}
              />
            ) : (
              ""
            )}

            <TypeMessage onSubmit={handleNewUserMessage} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
