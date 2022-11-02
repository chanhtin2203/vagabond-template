/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegSadCry } from "react-icons/fa";
import { BiWinkSmile } from "react-icons/bi";
import { Form, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/authSlice";

const cx = classNames.bind(styles);

const Login = () => {
  const [form] = Form.useForm();
  const [errorsExists, setErrorsExists] = useState({});
  const [valueInput, setValueInput] = useState("");
  const selectorUser = useSelector((state) => state.auth.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const res = await dispatch(loginUser(values));
    if (res.payload.message) {
      setErrorsExists(res.payload);
      notification.open({
        duration: 1.5,
        message: "Thông báo",
        description: "Đăng nhập không thành công",
        icon: (
          <FaRegSadCry
            style={{
              color: "#108ee9",
            }}
          />
        ),
      });
    } else {
      notification.open({
        duration: 1,
        message: "Thông báo",
        description: "Đăng nhập thành công",
        icon: (
          <BiWinkSmile
            style={{
              color: "#108ee9",
            }}
          />
        ),
      });
      navigate(-1);
    }
  };

  useEffect(() => {
    selectorUser !== null && navigate("/");
  }, []);

  useEffect(() => {
    if (errorsExists?.message?.includes("username")) {
      form.validateFields(["username"]);
    }
    if (errorsExists?.message?.includes("password")) {
      form.validateFields(["password"]);
    }
  }, [errorsExists?.message, form]);

  useEffect(() => {
    setErrorsExists({});
  }, [valueInput]);
  return (
    <div>
      <Header />
      <main className="minHeightBody">
        <div className="container">
          <div className={cx("wrapperAccount")}>
            <div className={cx("customersAccount")}>
              <div className={cx("headerPageAccount")}>
                <h1>Đăng nhập</h1>
              </div>
              <div className={cx("login")}>
                <div className={cx("accountType")}>
                  <div className={cx("title")}></div>
                </div>
                <Form
                  name="login"
                  form={form}
                  initialValues={{}}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    className={cx("largeForm")}
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập!",
                      },
                      {
                        validator: () => {
                          if (errorsExists?.message?.includes("username")) {
                            return Promise.reject("Sai tên đăng nhập!");
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Tên đăng nhập"
                      prefix={<AiOutlineUser />}
                      onChange={(e) => setValueInput(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    className={cx("largeForm")}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu!",
                      },
                      {
                        validator: () => {
                          if (errorsExists?.message?.includes("password")) {
                            return Promise.reject("Sai mật khẩu!");
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Mật khẩu"
                      prefix={<RiLockPasswordLine />}
                      onChange={(e) => setValueInput(e.target.value)}
                    />
                  </Form.Item>

                  <div className={cx("largeForm", "siteboxRecaptcha")}>
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy{" "}
                    </a>
                    and{" "}
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Service{" "}
                    </a>
                    apply.
                  </div>

                  <Form.Item>
                    <div className={cx("customersAccount")}>
                      <div className={cx("actionButton")}>
                        <button type="submit" className={cx("button", "btn")}>
                          Đăng nhập
                        </button>
                        <div className={cx("reqPass")}>
                          <Link to={"/register"}>Đăng ký</Link>
                        </div>
                      </div>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
