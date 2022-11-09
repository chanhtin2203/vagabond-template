import React from "react";
import classNames from "classnames/bind";
import styles from "../AdminChat.module.scss";

const cx = classNames.bind(styles);
const ListConversation = (props) => {
  const { conversationList, onConversationClick } = props;

  return (
    <div className={cx("contact-list")}>
      {conversationList.map((conversation) => (
        <div
          key={conversation._id}
          className={cx("contact-list-item")}
          onClick={() => onConversationClick(conversation)}
        >
          <div className={cx("contact-list-item-avarta")}>
            {conversation.nameConversation?.split("")[0]}
          </div>
          <div className={cx("contact-list-item-content")}>
            <p className={cx("contact-list-item-name")}>
              {conversation.nameConversation}
            </p>
            <span className={cx("contact-list-item-lastmessage")}>
              {conversation.lastMessage}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListConversation;
