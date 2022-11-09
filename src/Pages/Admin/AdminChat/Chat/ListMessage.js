import React, { useEffect } from "react";

const ListMessage = (props) => {
  const { messages, user, cx } = props;
  useEffect(() => {
    const scrollMessage = () => {
      var element = document.getElementById("chatuser-listmessage");
      element.scrollTop = element.scrollHeight;
    };

    scrollMessage();
  }, [messages]);
  return (
    <div id="chatuser-listmessage" className={cx("ad-chatuser-listmessage")}>
      {messages.length > 0
        ? messages.map((message) => (
            <div
              key={message._id}
              className={
                user.fullname === message.sender
                  ? cx("ad-chatuser-listmessage-message", "me")
                  : cx("ad-chatuser-listmessage-message")
              }
            >
              <p>{message.message}</p>
            </div>
          ))
        : ""}
    </div>
  );
};

export default ListMessage;
