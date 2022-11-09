import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../Chat.module.scss";

const cx = classNames.bind(styles);
function TypeMessage(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState("");

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!onSubmit || value === "") return;

    onSubmit(value);
    //set value after submit
    setValue("");
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit} className={cx("chatuser-typemessage")}>
        <input
          placeholder="Hãy viết một từ gì đó..."
          type="text"
          value={value}
          onChange={handleValueChange}
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
}

export default TypeMessage;
