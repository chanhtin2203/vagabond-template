import { Avatar, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRef } from "react";
import classNames from "classnames/bind";
import styles from "./FormInput.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const cx = classNames.bind(styles);
const FormInput = ({ id, socket, name, setReply, send }) => {
  const user = useSelector((state) => state.auth.login);
  const contentRef = useRef();

  useEffect(() => {
    if (name) {
      contentRef.current.innerHTML = `<a href="!#" style="background-color: rgba(24, 119, 242, 0.45);font-weight: 600;text-transform: capitalize;">${name}:</a>`;
    }
  }, []);

  const handleSubmitMessage = () => {
    const content = contentRef.current.innerHTML;
    if (content === "") {
      contentRef.current.focus();
      message.error("Vui lòng nhập nội dung bình luận");
      return;
    }
    const createdAt = new Date().toISOString();

    socket.emit("createComment", {
      username: user?.fullname,
      content: contentRef.current.innerHTML,
      product_id: id,
      createdAt,
      send,
    });

    contentRef.current.innerHTML = "";

    if (setReply) setReply(false);
  };
  return (
    <div className={cx("form_input")}>
      {user !== null ? (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar icon={<UserOutlined />} alt={user?.fullname} />
            <p style={{ marginBottom: 0, marginLeft: "10px" }}>
              {user?.fullname}
            </p>
          </div>
          <p></p>
          <div
            ref={contentRef}
            contentEditable="true"
            data-text={name && `Trả lời ${name}`}
            style={{
              height: "100px",
              width: "100%",
              border: "1px solid #ccc",
              padding: "5px 10px",
              outline: "none",
              color: "#000",
            }}
          />
          <p></p>
          <Button
            size="large"
            type="primary"
            style={{ width: 100 }}
            onClick={handleSubmitMessage}
          >
            Gửi
          </Button>
        </>
      ) : (
        <Link to={"/login"} style={{ textDecoration: "underline" }}>
          Vui lòng đăng nhập để bình luận sản phẩm
        </Link>
      )}
    </div>
  );
};

export default FormInput;
