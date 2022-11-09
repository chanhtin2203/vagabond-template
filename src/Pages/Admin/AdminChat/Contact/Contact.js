/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import useConnectSocket from "../../../../Hooks/useConnectSocket";
import {
  getAllConversationList,
  updateIdConversation,
  updateLastMessageConversation,
  showConversation,
} from "../../../../redux/slice/chatSlice";
import ListConversation from "./ListConversation";
import classNames from "classnames/bind";
import styles from "../AdminChat.module.scss";

const cx = classNames.bind(styles);

const Contact = () => {
  const socket = useConnectSocket(io);
  const dispatch = useDispatch();
  const conversationList = useSelector((state) => state.chats.conversationList);
  const idConversation = useSelector((state) => state.chats.idConversation);

  useEffect(() => {
    dispatch(getAllConversationList());
  }, []);

  useEffect(() => {
    if (conversationList) {
      const filter = conversationList.filter(
        (item) => item._id === idConversation
      );
      dispatch(updateIdConversation(filter));
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("lastMessage", async (data) => {
        await dispatch(updateLastMessageConversation(data));
        dispatch(getAllConversationList());
      });

      socket.on("show-me", (data) => {
        dispatch(showConversation(data));
      });
    }
  }, [socket, dispatch]);

  const onConversationClick = (conversation) => {
    dispatch(updateIdConversation(conversation));
  };

  return (
    <div className={cx("contact")}>
      {conversationList ? (
        <ListConversation
          conversationList={conversationList}
          onConversationClick={onConversationClick}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Contact;
