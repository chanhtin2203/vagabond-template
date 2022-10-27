import { Col, Divider, Row } from "antd";
import React from "react";
import classNames from "classnames/bind";
import styles from "./Users.module.scss";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
const InfomationUser = () => {
  const user = useSelector((state) => state.users.user);

  return (
    <Row gutter={30}>
      <Col xs={12}>
        <div className={cx("InfoUsertitle")}>
          Tên khách hàng: <strong>{user?.fullname}</strong>
        </div>
      </Col>
      <Col xs={12}>
        <div className={cx("InfoUsertitle")}>
          Tên đăng nhập: <strong>{user?.username}</strong>
        </div>
      </Col>
      <Divider />
      <Col xs={12}>
        <div className={cx("InfoUsertitle")}>
          Email đăng ký: <strong>{user?.email}</strong>
        </div>
      </Col>
      <Col xs={12}>
        <div className={cx("InfoUsertitle")}>
          Địa chỉ hiện tại: <strong>{user?.address}</strong>
        </div>
      </Col>
      <Divider />
      <Col xs={12}>
        <div className={cx("InfoUsertitle")}>
          Số điện thoại: <strong>{user?.phone}</strong>
        </div>
      </Col>
    </Row>
  );
};

export default InfomationUser;
