import React, { useEffect } from "react";
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
import { loginUser } from "../../redux/slice/userSlice";

const cx = classNames.bind(styles);

const Login = () => {
  const selectorUser = useSelector((state) => state.users.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const res = await dispatch(loginUser(values));
    if (res.type.includes("rejected")) {
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
      navigate("/");
    }
  };

  useEffect(() => {
    selectorUser !== null && navigate("/");
  }, []);
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
                    <Input
                      type="text"
                      placeholder="Tên đăng nhập"
                      prefix={<AiOutlineUser />}
                    />
                  </Form.Item>

                  <Form.Item className={cx("largeForm")} name="password">
                    <Input.Password
                      placeholder="Mật khẩu"
                      prefix={<RiLockPasswordLine />}
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
