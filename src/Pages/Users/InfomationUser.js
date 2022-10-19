import { Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Users.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginSuccess } from "../../redux/slice/userSlice";
import { createAxios } from "../../Utils/createInstance";

const cx = classNames.bind(styles);
const InfomationUser = () => {
  const [detailUser, setDetailUser] = useState({});
  const user = useSelector((state) => state.users.login);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    (async () => {
      const res = await dispatch(
        getUser({ id: user._id, axiosJWT, accessToken: user.accessToken })
      );
      setDetailUser(res.payload);
    })();
  }, []);
  return (
    <Row gutter={30}>
      <Col xs={12}>
        <div className={cx("InfoUsertitle")}>
          Tên khách hàng: <strong>{detailUser?.fullname}</strong>
        </div>
      </Col>
      <Col xs={12}>
        <div className={cx("InfoUsertitle")}>
          Tên đăng nhập: <strong>{detailUser?.username}</strong>
        </div>
      </Col>
      <Divider />
      <Col xs={12}>
        <div className={cx("InfoUsertitle")}>
          Email đăng ký: <strong>{detailUser?.email}</strong>
        </div>
      </Col>
      <Col xs={12}>
        <div className={cx("InfoUsertitle")}>
          Địa chỉ hiện tại: <strong>{detailUser?.address}</strong>
        </div>
      </Col>
      <Divider />
      <Col xs={12}>
        <div className={cx("InfoUsertitle")}>
          Số điện thoại: <strong>{detailUser?.phone}</strong>
        </div>
      </Col>
    </Row>
  );
};

export default InfomationUser;
