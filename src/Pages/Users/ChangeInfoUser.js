import { Button, Col, Input, Row, Form, message, InputNumber } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUser, loginSuccess } from "../../redux/slice/userSlice";
import { createAxios } from "../../Utils/createInstance";

const ChangeInfoUser = () => {
  const [textInput, setTextInput] = useState("");
  const getUser = useSelector((state) => state.users.login);
  const user = useSelector((state) => state.users.login);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleChangeText = (e) => {
    setTextInput(
      e.target.value.replace(
        /(^|\s+)(\S)(\S*)/g,
        function (match, whitespace, firstLetter, rest) {
          return whitespace + firstLetter.toUpperCase() + rest.toLowerCase();
        }
      )
    );
  };

  const onFinish = async (values) => {
    const res = await dispatch(
      editUser({
        values,
        id: user._id,
        axiosJWT,
        accessToken: user.accessToken,
      })
    );
    if (res.payload !== undefined) {
      window.location.reload();
      message.success("Thay đổi thông tin thành công");
    }
  };

  return (
    <Row gutter={30}>
      <Col xs={24}>
        <Form
          name="changeUsers"
          initialValues={{
            ...getUser,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row>
            <Col xs={12}>
              <Form.Item label="Họ và tên" name="fullname">
                <Input
                  value={textInput}
                  onChange={handleChangeText}
                  placeholder="Họ và tên"
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label="Email" name="email" style={{ paddingLeft: 10 }}>
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={16}>
              <Form.Item label="Địa chỉ" name="address">
                <Input.TextArea placeholder="Địa chỉ" />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                style={{ paddingLeft: 10 }}
                rules={[
                  {
                    pattern: new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g),
                    message: "Không phải là số điện thoại",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            wrapperCol={{
              offset: 12,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ChangeInfoUser;
