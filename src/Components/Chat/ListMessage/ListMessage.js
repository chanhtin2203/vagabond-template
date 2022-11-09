import React, { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "../Chat.module.scss";

const cx = classNames.bind(styles);
const ListMessage = (props) => {
  const { messages, user } = props;
  const divRef = useRef();

  useEffect(() => {
    const scrollMessage = () => {
      let element = document.getElementById("chatuser-listmessage");
      element.scrollTop = element.scrollHeight;
    };

    scrollMessage();
  }, [messages]);

  return (
    <div
      id="chatuser-listmessage"
      className={cx("chatuser-listmessage")}
      ref={divRef}
    >
      {messages.map((message) => (
        <div
          key={message._id}
          className={
            user?.fullname === message.sender
              ? cx("chatuser-listmessage-message", "me")
              : cx("chatuser-listmessage-message")
          }
        >
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ListMessage;
