import React from "react";
import classNames from "classnames/bind";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { PhoneOutlined } from "@ant-design/icons";
import { FaFacebookF } from "react-icons/fa";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineGooglePlus,
  AiOutlineYoutube,
} from "react-icons/ai";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("mainFooter")}>
      <div className={cx("footerContainer")}>
        <div className={cx("footerExpand")}>
          <div className={cx("footerMainInfo")}>
            <div className="container">
              <Row gutter={32}>
                <Col xs={12}>
                  <h4 className={cx("titleFooter")}>Về VAGABOND</h4>
                  <div className={cx("contentFooter")}>
                    <Row gutter={30}>
                      <Col xs={12}>
                        <p className={cx("desc")}>
                          Cái tên Vagabond được tạo ra rất ngẫu hứng, xuất phát
                          từ “Chuỗi ngày u buồn về sự nghiệp, tương lai trong
                          quá khứ của chính mình”
                        </p>
                        <div className={cx("logoFooter")}>
                          <div className={cx("logoLink")}>
                            <img
                              className={cx("logoImg")}
                              src="https://file.hstatic.net/1000397797/file/logo-bct-min_5c275261c7204ddf9c30a3a2eb1534e5.png"
                              alt="Bộ công thương"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className={cx("addressFooter")}>
                          <ul>
                            <li className={cx("contact-1")}>
                              <b>Địa chỉ</b>
                              <br />
                              <br />
                              <b>- Sài gòn</b>
                              <br />
                              43 Huỳnh Văn Bánh P.17 Q.Phú Nhuận
                              <br />
                              1041 Luỹ Bán Bích P.Tân Thành Q.Tân Phú
                              <br />
                              26 Lý Tự Trọng Q.1 - The New Playground
                              <br />
                              <b>-Đà Lạt:</b>
                              <br />
                              11 Khu Hoà Bình P.1
                            </li>
                            <li className={cx("contact-2")}>
                              <b>Điện thoại: </b>
                              0123456789
                            </li>
                            <li className={cx("contact-3")}>
                              <b>Email: </b>
                              vagabond.vn@gmail.com
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xs={6}>
                  <h4 className={cx("titleFooter")}>Hỗ trợ khách hàng</h4>
                  <div className={cx("contentFooter")}>
                    <ul className={cx("footerLink")}>
                      <li>
                        <Link className={cx("footerName")} to={"/"}>
                          Hệ thống cửa hàng
                        </Link>
                      </li>
                      <li>
                        <Link className={cx("footerName")} to={"/"}>
                          Hướng dẫn đặt hàng
                        </Link>
                      </li>
                      <li>
                        <Link className={cx("footerName")} to={"/"}>
                          Chính sách và quy định
                        </Link>
                      </li>
                      <li>
                        <Link className={cx("footerName")} to={"/"}>
                          Chính sách bảo mật
                        </Link>
                      </li>
                      <li>
                        <Link className={cx("footerName")} to={"/"}>
                          Thông tin sở hữu
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col xs={6}>
                  <h4 className={cx("titleFooter")}>Chăm sóc khách hàng</h4>
                  <div className={cx("contentFooter")}>
                    <div className={cx("footerHotLine")}>
                      <div className={cx("boxIcon")}>
                        <PhoneOutlined className={cx("iconHotLine")} />
                      </div>
                      <div className={cx("boxContent")}>
                        <span>0924963557</span>
                        <u>vagabond.vn@gmail.com</u>
                      </div>
                    </div>
                    <h4 className={cx("footerTitle")}>Follow Us</h4>
                    <ul className={cx("footerNavSocial")}>
                      <li>
                        <Link to={"/"}>
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link to={"/"}>
                          <AiOutlineTwitter />
                        </Link>
                      </li>
                      <li>
                        <Link to={"/"}>
                          <AiOutlineInstagram />
                        </Link>
                      </li>
                      <li>
                        <Link to={"/"}>
                          <AiOutlineGooglePlus />
                        </Link>
                      </li>
                      <li>
                        <Link to={"/"}>
                          <AiOutlineYoutube />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className={cx("footerCopyRight")}>
            <div className="container">
              <p>
                Copyright © 2022
                <Link to={"/"}>
                  {" "}
                  Tham khảo ý tưởng về thiết kế website
                </Link>.{" "}
                <a target="_blank" href="https://degrey.vn/" rel="noreferrer">
                  Nguồn tham khảo: degrey.vn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
