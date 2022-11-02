/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Icon from "@ant-design/icons";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import classNames from "classnames/bind";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsBagCheck, BsBagX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginSuccess } from "../../../redux/slice/authSlice";
import {
  getAllOrders,
  getDetailOrders,
  updateOrders,
} from "../../../redux/slice/orderSlice";
import { getAllProducts } from "../../../redux/slice/productsSlice";
import { getAllUser } from "../../../redux/slice/userSlice";
import { createAxios } from "../../../Utils/createInstance";
import styles from "./AdminOrders.module.scss";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const cx = classNames.bind(styles);

const DescriptionItem = ({ title, content }) => (
  <div className={cx("site-description-item-profile-wrapper")}>
    <p className={cx("site-description-item-profile-p-label")}>{title}:</p>
    <strong>{content}</strong>
  </div>
);
const AdminOrders = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [tabsValue, setTabsValue] = useState("all");
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const user = useSelector((state) => state.auth.login);
  const detailOrder = useSelector((state) => state.orders.order);
  const allOrders = useSelector((state) => state.orders.allOrders);
  const allProducts = useSelector((state) => state.products.products);
  const allUsers = useSelector((state) => state.users.users);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    (async () => {
      await dispatch(
        getAllOrders({
          key: tabsValue,
          accessToken: user.accessToken,
          axiosJWT,
        })
      );
    })();
  }, [tabsValue]);

  useEffect(() => {
    (async () => {
      await dispatch(getAllUser({ accessToken: user.accessToken, axiosJWT }));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(getAllProducts());
    })();
  }, []);

  useEffect(() => {
    allUsers?.filter(
      (item) => item._id === detailOrder.userId && setName(item.fullname)
    );
  }, [detailOrder]);

  const onSearch = async (value) => {};

  const showDrawer = async (id) => {
    await dispatch(
      getDetailOrders({ id, accessToken: user.accessToken, axiosJWT })
    );
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      render: (_, record, index) => {
        const pageIndex = pagination.pageIndex;
        return <div>{index + 10 * (pageIndex - 1) + 1}</div>;
      },
      align: "center",
      width: 80,
    },
    {
      title: "Mã đơn",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      render: (record) => <Tag color="green">{record}</Tag>,
    },
    {
      title: "Tên khách hàng",
      key: "fullname",
      dataIndex: "userId",
      align: "center",
      render: (record) =>
        allUsers
          ?.filter((item) => item._id === record)
          .map((u) => <div key={u._id}>{u.fullname}</div>),
    },
    {
      title: "Ngày",
      dataIndex: "payDate",
      key: "payDate",
      align: "center",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      align: "center",
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
    {
      title: "Chi tiết",
      key: "detailOrder",
      align: "center",
      render: (_, record) => (
        <a
          style={{ color: "blue", textDecoration: "underline" }}
          onClick={() => showDrawer(record._id)}
        >
          Chi tiết hóa đơn
        </a>
      ),
    },
  ];

  const handleChangePagination = (page) => {
    setPagination({
      ...pagination,
      pageIndex: page.current,
      pageSize: page.pageSize,
    });
  };

  const onChangeTabs = async (key) => {
    setTabsValue(key);
  };

  const handleChangeStatus = async (status) => {
    await dispatch(
      updateOrders({
        id: detailOrder._id,
        values: { ...detailOrder, status },
        accessToken: user.accessToken,
        axiosJWT,
      })
    );
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard"}>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
      </Breadcrumb>
      <Divider>Tìm kiếm đơn hàng</Divider>
      <Row>
        <Col xs={12}>
          <Input.Search
            placeholder="Tìm kiếm đơn hàng"
            allowClear
            size="large"
            enterButton
            onSearch={onSearch}
          />
        </Col>
        <Col xs={12}>
          <DatePicker
            style={{ float: "right" }}
            size="large"
            defaultValue={moment(new Date(), dateFormatList[0])}
            format={dateFormatList}
          />
        </Col>
      </Row>
      <Divider>Bảng thông tin</Divider>
      <div className="tableUser">
        <Tabs
          onChange={onChangeTabs}
          items={[
            { key: "all", label: "Tất cả" },
            { key: "pending", label: "Đơn hàng chờ xác nhận" },
            { key: "success", label: "Đơn hàng xác nhận thành công" },
            { key: "reject", label: "Đơn hàng đã hủy" },
          ]}
        />
        <Table
          columns={columns}
          dataSource={allOrders}
          rowKey="_id"
          scroll={{ y: 500 }}
          pagination={{
            current: pagination.pageIndex,
            total: allOrders?.length,
            pageSize: pagination.pageSize,
          }}
          onChange={handleChangePagination}
          bordered
        />
      </div>
      <Drawer
        size="large"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <h4
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          Chi tiết đơn hàng
        </h4>
        {detailOrder.status === "success" || detailOrder.status === "reject" ? (
          ""
        ) : (
          <Space>
            <Popconfirm
              title="Bạn có chắc chắn xác nhận đơn hàng?"
              onConfirm={() => handleChangeStatus("success")}
              okText="Đồng ý"
              cancelText="Không"
              placement="bottom"
            >
              <Button
                icon={<Icon component={BsBagCheck} />}
                style={{
                  background: "green",
                  borderColor: "green",
                  color: "#fff",
                }}
              >
                Xác nhận đơn hàng
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Bạn có chắc chắn hủy đơn hàng?"
              onConfirm={() => handleChangeStatus("reject")}
              okText="Đồng ý"
              cancelText="Không"
              placement="bottom"
            >
              <Button
                icon={<Icon component={BsBagX} />}
                style={{
                  background: "#CF0A0A",
                  borderColor: "#CF0A0A",
                  color: "#fff",
                }}
              >
                Hủy đơn hàng
              </Button>
            </Popconfirm>
          </Space>
        )}

        <Divider />
        <h3 className="site-description-item-profile-p">Thông tin đơn hàng</h3>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Mã đơn hàng" content={detailOrder._id} />
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
            <DescriptionItem title="Tên khách hàng" content={name} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Số điện thoại"
              content={detailOrder.phone}
            />
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
        <Row>
          <Col span={12}>
            <DescriptionItem title="VNP Code" content={detailOrder.vnpCode} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Bank Code" content={detailOrder.bankCode} />
          </Col>
        </Row>
        <Row gutter={16}>
          {detailOrder.products?.map((dt) =>
            allProducts.map(
              (item) =>
                item._id === dt.productId && (
                  <Col span={8} key={item._id}>
                    <Badge.Ribbon text={dt.quantity} color="black">
                      <Card
                        hoverable
                        bordered={true}
                        cover={
                          <Tooltip title={item.title} color={"black"}>
                            <img alt={item.title} src={item.image} />
                          </Tooltip>
                        }
                      >
                        <Card.Meta
                          title={item.title}
                          description={new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        />
                      </Card>
                    </Badge.Ribbon>
                  </Col>
                )
            )
          )}
        </Row>
      </Drawer>
    </div>
  );
};

export default AdminOrders;
