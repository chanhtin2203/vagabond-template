/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./Orders.module.scss";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Drawer,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../Utils/createInstance";
import { getAllOrdersUser } from "../../redux/slice/orderSlice";
import { loginSuccess } from "../../redux/slice/authSlice";
import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import { getAllProducts } from "../../redux/slice/productsSlice";

const cx = classNames.bind(styles);
const Orders = () => {
  const [open, setOpen] = useState(false);
  const [detailProduct, setdetailProduct] = useState({});
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
    products?.filter((item) => item._id === record && setdetailProduct(item));
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
      key: "_id",
      width: 250,
      fixed: "left",
      render: (text) => <a style={{ color: "#5800FF" }}>{text}</a>,
    },
    {
      title: "Tên Khách hàng",
      dataIndex: "userId",
      key: "userId",
      width: 250,
      render: () => <div>{user?.fullname}</div>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 250,
      render: (record) => <div>{record}</div>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
      width: 250,
      render: (record) => (
        <div>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(record)}
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 300,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      width: 300,
    },
    {
      title: "Ngày",
      dataIndex: "payDate",
      key: "payDate",
      width: 300,
      fixed: "right",
    },
    {
      title: "Thanh toán",
      key: "payment",
      dataIndex: "payment",
      width: 200,
      fixed: "right",
      render: (record) => {
        let color = record ? "green" : "geekblue";
        let text = record ? "Thanh toán bằng thẻ" : "Thanh toán bằng tiền mặt";
        return (
          <Tag color={color} key={record}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: 250,
      fixed: "right",
      render: (record) => {
        let text = "";
        let color = "";
        switch (record) {
          case "pending":
            text = "Đang chờ xác nhận đơn hàng";
            color = "orange";
            break;
          case "reject":
            text = "Hủy đơn hàng";
            color = "magenta";
            break;
          case "success":
            text = "Xác nhận đơn hàng thành công";
            color = "green";
            break;
          default:
            break;
        }
        return (
          <Tag color={color} key={record}>
            {text}
          </Tag>
        );
      },
    },
  ];

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

  const nestedColumns = [
    {
      title: "Sản phẩm đã mua",
      dataIndex: "products",
      key: "products",
      width: 250,
      children: [
        {
          title: "Tên sản phẩm",
          dataIndex: "productId",
          key: "productId",
          width: 250,
          render: (record) =>
            products?.map(
              (item, index) =>
                item._id === record && (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <a
                      style={{ color: "#EB5353" }}
                      onClick={() => showDrawer(record)}
                    >
                      {item.title}
                    </a>
                    <a
                      style={{ textDecoration: "underline" }}
                      onClick={() => showDrawer(record)}
                    >
                      Xem sản phẩm
                    </a>
                  </div>
                )
            ),
        },
        {
          title: "Số lượng",
          dataIndex: "quantity",
          key: "quantity",
          width: 250,
        },
        {
          title: "Size",
          dataIndex: "size",
          key: "size",
          width: 250,
        },
      ],
    },
  ];
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
        </div>
        <div className={cx("pageOrders")}>
          <div className={cx("headingPageOrders")}>
            <h1>Đơn hàng của bạn</h1>
          </div>
          <div className={cx("contentPageOrders")}>
            <Table
              columns={columns}
              bordered
              expandable={{
                rowExpandable: (record) => true,
                expandedRowRender: (record) => {
                  if (record.products) {
                    return (
                      <Table
                        columns={nestedColumns}
                        dataSource={record.products}
                        rowKey="_id"
                        pagination={false}
                        bordered
                      />
                    );
                  }
                },
                expandIcon: ({ expanded, onExpand, record }) => {
                  return expanded ? (
                    <MinusCircleTwoTone
                      onClick={(e) => {
                        onExpand(record, e);
                      }}
                    />
                  ) : (
                    <PlusCircleTwoTone
                      onClick={(e) => {
                        onExpand(record, e);
                      }}
                    />
                  );
                },
              }}
              sticky
              dataSource={orders}
              rowKey={"_id"}
              scroll={{
                x: 1000,
              }}
            />
          </div>
        </div>
      </main>
      <Drawer
        title="Chi tiết sản phẩm"
        placement="right"
        size="large"
        closable={false}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
          </Space>
        }
      >
        <Row gutter={30}>
          <Col xs={16}>
            <div>
              Tên sản phẩm: <strong>{detailProduct.title}</strong>
            </div>
          </Col>
          <Col xs={8}>
            <div>
              Giá sản phẩm:{" "}
              <strong style={{ color: "red" }}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(detailProduct.price)}
              </strong>
            </div>
          </Col>
          <Divider />
          <Col xs={24}>
            <div>
              Hình ảnh:{" "}
              <img src={detailProduct.image} alt={detailProduct.title} />
            </div>
          </Col>
        </Row>
      </Drawer>
      <Footer />
    </>
  );
};

export default Orders;
