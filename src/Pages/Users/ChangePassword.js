import { Button, Input, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordUser, loginSuccess } from "../../redux/slice/authSlice";
import { createAxios } from "../../Utils/createInstance";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [textOldPassword, setTextOldPassword] = useState("");
  const [errorsExists, setErrorsExists] = useState("");
  const user = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const onFinish = async (values) => {
    const res = await dispatch(
      changePasswordUser({
        values,
        id: user._id,
        axiosJWT,
        accessToken: user.accessToken,
      })
    );
    setErrorsExists(res.payload);
    if (!res.payload.message) {
      message.success("Thay đổi mật khẩu thành công", 2);
      form.resetFields();
    }
  };

  useEffect(() => {
    if (errorsExists?.message?.includes("password")) {
      form.validateFields(["oldPassword"]);
    }
  }, [errorsExists?.message, form]);

  useEffect(() => {
    setErrorsExists({});
  }, [textOldPassword]);
  return (
    <Form
      form={form}
      name="changePasswordUsers"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Mật khẩu cũ"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu cũ!",
          },
          {
            validator: () => {
              if (errorsExists?.message?.includes("password")) {
                return Promise.reject("Mật khẩu cũ nhập không đúng!");
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input.Password
          placeholder="Mật khẩu cũ"
          value={textOldPassword}
          onChange={(e) => setTextOldPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Mật khẩu mới"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới!",
          },
        ]}
      >
        <Input.Password placeholder="Mật khẩu mới" />
      </Form.Item>

      <Form.Item
        label="Nhập lại mật khẩu mới"
        name="Re-password"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập lại mật khẩu mới!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("Hai mật khẩu không khớp với nhau!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Nhập lại mật khẩu" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
