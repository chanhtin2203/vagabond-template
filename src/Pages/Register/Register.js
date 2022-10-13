import { Form, Input, notification } from "antd";
import axios from "axios";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiWinkSmile } from "react-icons/bi";
import { FaRegSadCry } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { BASE_URL } from "../../Utils/BaseUrl";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errorsExists, setErrorsExists] = useState({});
  const [valueInput, setValueInput] = useState("");
  const onFinish = async (values) => {
    await axios
      .post(`${BASE_URL}/auth/register`, values)
      .then((result) => {
        if (result.data) {
          notification.open({
            duration: 1,
            message: "Thông báo",
            description: "Đăng ký thành công",
            icon: (
              <BiWinkSmile
                style={{
                  color: "#108ee9",
                }}
              />
            ),
          });
          navigate("/login");
        }
      })
      .catch(function (error) {
        if (error.response) {
          notification.open({
            duration: 1.5,
            message: "Thông báo",
            description: "Đăng ký không thành công",
            icon: (
              <FaRegSadCry
                style={{
                  color: "#108ee9",
                }}
              />
            ),
          });
          setErrorsExists(error.response.data);
        }
      });
  };

  useEffect(() => {
    if (errorsExists?.message?.includes("username")) {
      form.validateFields(["username"]);
    }
    if (errorsExists?.message?.includes("email")) {
      form.validateFields(["email"]);
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
                <h1>Đăng ký</h1>
              </div>
              <div className={cx("login")}>
                <div className={cx("accountType")}>
                  <div className={cx("title")}></div>
                </div>
                <Form
                  form={form}
                  name="register"
                  initialValues={{}}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    className={cx("largeForm")}
                    name="username"
                    rules={[
                      {
                        max: 20,
                        message: "Tên đăng nhập tối đa 20 kí tự!",
                      },
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập!",
                      },
                      {
                        validator: () => {
                          if (errorsExists?.message?.includes("username")) {
                            return Promise.reject(
                              "Tên Email này đã có người sử dụng, Vui lòng sử dụng tên khác!"
                            );
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
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Email! không đúng định dạng",
                      },
                      {
                        required: true,
                        message: "Vui lòng nhập E-mail!",
                      },
                      {
                        validator: () => {
                          if (errorsExists?.message?.includes("email")) {
                            return Promise.reject(
                              "Tên Email này đã có người sử dụng, Vui lòng sử dụng tên khác!"
                            );
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                  >
                    <Input
                      placeholder="Email"
                      prefix={<AiOutlineMail />}
                      onChange={(e) => setValueInput(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    className={cx("largeForm")}
                    name="password"
                    rules={[
                      {
                        min: 6,
                        message: "Mật khẩu phải tối thiểu 6 kí tự",
                      },
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Mật khẩu"
                      prefix={<RiLockPasswordLine />}
                    />
                  </Form.Item>

                  <Form.Item
                    className={cx("largeForm")}
                    name="Re-password"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập lại mật khẩu!",
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
                    <Input.Password
                      placeholder="Nhập lại mật khẩu"
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
                          Đăng ký
                        </button>
                        <div className={cx("reqPass")}>
                          <Link to={"/login"}>Đăng nhập</Link>
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

export default Register;
