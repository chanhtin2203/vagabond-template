import React from "react";
import classNames from "classnames/bind";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";

const cx = classNames.bind(styles);

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
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
                  initialValues={{}}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item className={cx("largeForm")} name="username">
                    <Input type="text" placeholder="Tên đăng nhập" />
                  </Form.Item>

                  <Form.Item className={cx("largeForm")} name="password">
                    <Input.Password placeholder="Mật khẩu" />
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
