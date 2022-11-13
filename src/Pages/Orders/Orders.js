/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Badge,
  Breadcrumb,
  Card,
  Col,
  Divider,
  Drawer,
  Row,
  Tag,
  Tooltip,
} from "antd";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { loginSuccess } from "../../redux/slice/authSlice";
import { getAllOrdersUser } from "../../redux/slice/orderSlice";
import { getAllProducts } from "../../redux/slice/productsSlice";
import { createAxios } from "../../Utils/createInstance";
import styles from "./Orders.module.scss";

const cx = classNames.bind(styles);
const DescriptionItem = ({ title, content }) => (
  <div className={cx("site-description-item-profile-wrapper")}>
    <p className={cx("site-description-item-profile-p-label")}>{title}:</p>
    <strong>{content}</strong>
  </div>
);
const Orders = () => {
  const [open, setOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState({});
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.auth.login);
  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) navigate("/");
    dispatch(getAllProducts());
  }, []);

  const showDrawer = (record) => {
    orders?.filter((item) => item._id === record && setDetailOrder(item));
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    (async () => {
      await dispatch(
        getAllOrdersUser({
          id: user?._id,
          accessToken: user?.accessToken,
          axiosJWT,
        })
      );
    })();
  }, []);

  return (
    <>
      <Header />
      <main className="minHeightBody">
        <div className="container">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/"}>Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Đơn hàng</Breadcrumb.Item>
          </Breadcrumb>

          <div className={cx("pageOrders")}>
            <div className={cx("headingPageOrders")}>
              <h1>Đơn hàng của bạn</h1>
            </div>
            <div className={cx("contentPageOrders")}>
              <div className="site-card-wrapper">
                <Row gutter={16}>
                  {orders.map((item) => (
                    <Col span={8} key={item._id}>
                      <Card
                        onClick={() => showDrawer(item._id)}
                        hoverable
                        cover={
                          <div style={{ padding: 10 }}>
                            <p>
                              Mã đơn: <strong>{item._id}</strong>
                            </p>
                            <p>
                              Tên khách hàng: <strong>{item.fullname}</strong>
                            </p>
                            <p>
                              Thanh toán:{" "}
                              <strong>
                                {item.payment ? (
                                  <Tag color="orange">Thanh toán bằng thẻ</Tag>
                                ) : (
                                  <Tag color="blue">
                                    Thanh toán bằng tiền mặt
                                  </Tag>
                                )}
                              </strong>
                            </p>
                            <p>
                              Trạng thái:{" "}
                              <strong>
                                {item.status === "success" ? (
                                  <Tag color="green">
                                    Đơn hàng xác nhận thành công
                                  </Tag>
                                ) : item.status === "pending" ? (
                                  <Tag color="volcano">
                                    Đơn hàng chờ xác nhận
                                  </Tag>
                                ) : (
                                  <Tag color="red">Đơn hàng đã hủy</Tag>
                                )}
                              </strong>
                            </p>
                            <p>
                              Ngày mua: <strong>{item.payDate}</strong>
                            </p>
                          </div>
                        }
                      >
                        <Card.Meta
                          title={
                            <a style={{ color: "blue" }}>
                              Xem chi tiết đơn hàng
                            </a>
                          }
                        />
                      </Card>
                      <Divider />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Drawer
        size="large"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <h3
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          Chi tiết đơn hàng
        </h3>

        <Divider />
        <h4 className="site-description-item-profile-p">Thông tin đơn hàng</h4>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Tên khách hàng"
              content={detailOrder.fullname}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Tổng tiền"
              content={new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(detailOrder.amount)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Số điện thoại"
              content={detailOrder.phone}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Ghi chú" content={detailOrder.note} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Địa chỉ" content={detailOrder.address} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Trạng thái"
              content={
                detailOrder.status === "success"
                  ? "Xác nhận thành công"
                  : detailOrder.status === "reject"
                  ? "Hủy đơn hàng"
                  : "Đang chờ xác nhận"
              }
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Thanh toán"
              content={
                detailOrder.payment ? "Thanh toán thẻ" : "Thanh toán tiền mặt"
              }
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Ngày thanh toán"
              content={detailOrder.payDate}
            />
          </Col>
        </Row>
        {detailOrder.vnpCode !== "" && (
          <Row>
            <Col span={12}>
              <DescriptionItem title="VNP Code" content={detailOrder.vnpCode} />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Bank Code"
                content={detailOrder.bankCode}
              />
            </Col>
          </Row>
        )}

        <br />
        <Row gutter={16}>
          {detailOrder.products?.map((dt) =>
            products.map(
              (item) =>
                item._id === dt.productId && (
                  <Col span={8} key={item._id}>
                    <Badge.Ribbon text={dt.quantity} color="black">
                      <Tooltip title={item.title} color={"black"}>
                        <Card
                          hoverable
                          bordered={true}
                          cover={<img alt={item.title} src={item.image} />}
                        >
                          <Card.Meta
                            title={item.title}
                            description={
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span style={{ color: "red" }}>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.price)}
                                </span>
                                <strong>{dt.size}</strong>
                              </div>
                            }
                          />
                        </Card>
                      </Tooltip>
                    </Badge.Ribbon>
                  </Col>
                )
            )
          )}
        </Row>
      </Drawer>
      <Footer />
    </>
  );
};

export default Orders;
