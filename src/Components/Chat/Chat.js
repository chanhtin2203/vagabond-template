/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { LineOutlined, MessageOutlined } from "@ant-design/icons";
import ListMessage from "./ListMessage/ListMessage";
import TypeMessage from "./TypeMessage/TypeMessage";
import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import useConnectSocket from "../../Hooks/useConnectSocket";
import { Tooltip } from "antd";
import { createAxios } from "../../Utils/createInstance";
import { BASE_URL } from "../../Utils/BaseUrl";
import { loginSuccess } from "../../redux/slice/authSlice";

const cx = classNames.bind(styles);
const Chat = ({ openChat, setOpenChat }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const socket = useConnectSocket(io);

  const userInfo = useSelector((state) => state.auth.login);

  let axiosJWT = createAxios(userInfo, dispatch, loginSuccess);

  useEffect(() => {
    if (openChat) {
      const getAllMessageByConversation = async () => {
        const { data } = await axiosJWT.get(
          `${BASE_URL}/chat/message?idUser=${userInfo?._id}`,
          {
            headers: { token: `Beaer ${userInfo.accessToken}` },
          }
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
        const { data } = await axiosJWT.post(`${BASE_URL}/chat/save`, payload, {
          headers: { token: `Beaer ${userInfo.accessToken}` },
        });
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
      const { data } = await axiosJWT.post(`${BASE_URL}/chat/save`, payload, {
        headers: { token: `Beaer ${userInfo.accessToken}` },
      });
      socket.emit("chat", data);
    }
  };

  return (
    <div>
      <div className={cx("appchat")}>
        {userInfo === null ? (
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
