import React from "react";
import classNames from "classnames/bind";
import styles from "./AdminChat.module.scss";

const cx = classNames.bind();
const AdminChat = () => {
  return (
    <section id={cx("appchat")}>
      <div className={cx("appchat")}>
        {/* <Contact></Contact> */}
        <div className={cx("chat")}>
          {/* <Chat></Chat> */}
        </div>
      </div>
    </section>
  );
};

export default AdminChat;
