import React from "react";
import classNames from "classnames/bind";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./Orders.module.scss";
import { Breadcrumb, Col, Row } from "antd";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const Orders = () => {
  return (
    <>
      <Header />
      <main className="minHeightBody">
        <div className="container">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/"}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Đơn hàng của bạn</Breadcrumb.Item>
          </Breadcrumb>
          <Row gutter={30}>
            <Col md={18} sm={16} xs={24}>
              
            </Col>
            <Col md={6} sm={8} xs={24}></Col>
          </Row>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
