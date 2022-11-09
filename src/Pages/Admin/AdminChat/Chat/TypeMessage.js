import React, { useState } from "react";

const TypeMessage = (props) => {
  const { onSubmit, cx } = props;
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
    <form onSubmit={handleFormSubmit} className={cx("ad-chatuser-typemessage")}>
      <input
        placeholder="Hãy viết 1 từ gì đó"
        type="text"
        value={value}
        onChange={handleValueChange}
      />
      <button type="submit">Gửi</button>
    </form>
  );
};

export default TypeMessage;
