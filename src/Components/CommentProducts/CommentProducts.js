import { Avatar, Comment, List, Tooltip } from "antd";
import moment from "moment-with-locales-es6";
import React, { useState } from "react";
import FormInput from "./FormInput/FormInput";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const CommentProducts = ({ comment, socket }) => {
  const [reply, setReply] = useState(false);
  const [tag, setTag] = useState(false);
  const user = useSelector((state) => state.auth.login);
  const handleReply = (id) => {
    setReply(id);
    setTag(!tag);
  };

  //
  const ExampleComment = ({ children, item, level }) => {
    return (
      <Comment
        actions={[
          <>
            {user !== null && level === 1 && (
              <>
                <span
                  style={{ fontSize: "14px" }}
                  onClick={() => handleReply(item._id)}
                  key="comment-nested-reply-to"
                >
                  Phản hồi
                </span>
                <span style={{ fontSize: "14px" }}>Ẩn phẩn hồi</span>
              </>
            )}
            {reply === item._id && (
              <FormInput
                id={item._id}
                socket={socket}
                name={item.username}
                setReply={setReply}
                send="replyComment"
              />
            )}
          </>,
        ]}
        author={<h3 style={{ color: "#000" }}>{item.username}</h3>}
        avatar={<Avatar icon={<UserOutlined />} alt={item.username} />}
        content={<div dangerouslySetInnerHTML={{ __html: item.content }} />}
        datetime={
          <Tooltip
            title={<span>{new Date(item.createdAt).toLocaleString()}</span>}
          >
            <strong>{moment(item.createdAt).locale("vi").fromNow()}</strong>
          </Tooltip>
        }
      >
        {children}
      </Comment>
    );
  };

  return (
    <>
      <br />
      <br />
      <br />
      <List
        className="comment-list"
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={comment}
        renderItem={(item) => (
          <li>
            <ExampleComment item={item} level={1}>
              {item.reply.map((rep) => (
                <ExampleComment item={rep} key={rep._id} />
              ))}
            </ExampleComment>
          </li>
        )}
      />
    </>
  );
};

export default CommentProducts;
