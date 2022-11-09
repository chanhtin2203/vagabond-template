import React from "react";
import classNames from "classnames/bind";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
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
          <Badge count={""}>
            <div className={cx("contact-list-item-avatar")}>
              <Avatar icon={<UserOutlined />} />
            </div>
          </Badge>
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
