import React, { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "../Chat.module.scss";

const cx = classNames.bind(styles);
const ListMessage = (props) => {
  const { messages, user, openChat } = props;
  const divRef = useRef();

  useEffect(() => {
    const scrollMessage = () => {
      divRef.current.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    };
    if (openChat) {
      scrollMessage();
    }
  }, [openChat]);

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
