import React from "react";
import Contact from "./Contact/Contact";
import classNames from "classnames/bind";
import styles from "./AdminChat.module.scss";
import Chat from "./Chat/Chat";

const cx = classNames.bind(styles);
const AdminChat = () => {
  return (
    <section id={cx("appchat")}>
      <div className={cx("appchat")}>
        <Contact />
        <div className={cx("chat")}>
          <Chat />
        </div>
      </div>
    </section>
  );
};

export default AdminChat;
