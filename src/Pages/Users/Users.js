import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Breadcrumb, Divider, Tabs } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Users.module.scss";
import InfomationUser from "./InfomationUser";
import ChangeInfoUser from "./ChangeInfoUser";
import ChangePassword from "./ChangePassword";

const cx = classNames.bind(styles);
const Users = () => {
  const items = [
    {
      label: "Thông tin tài khoản",
      key: "item-1",
      children: <InfomationUser />,
    },
    {
      label: "Thay đổi thông tin tài khoản",
      key: "item-2",
      children: <ChangeInfoUser />,
    },
    {
      label: "Thay đổi mật khẩu",
      key: "item-3",
      children: <ChangePassword />,
    },
  ];
  return (
    <div>
      <Header />
      <main className="minHeightBody">
        <div className="container">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/"}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tài khoản</Breadcrumb.Item>
          </Breadcrumb>
          <Divider />
          <div className={cx("userInfo")}>
            <h1>Tài khoản của bạn</h1>
            <Tabs
              style={{ fontSize: "1.7rem" }}
              tabPosition="left"
              size="large"
              items={items}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Users;
