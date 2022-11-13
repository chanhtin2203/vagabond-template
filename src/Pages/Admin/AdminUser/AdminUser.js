/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../Utils/createInstance";
import {
  getAllUser,
  getDetailUser,
  updateUserByAdmin,
  deleteUserByAdmin,
  searchUser,
} from "../../../redux/slice/userSlice";
import { loginSuccess, updateAdmin } from "../../../redux/slice/authSlice";
import { getAllOrders } from "../../../redux/slice/orderSlice";

const AdminUser = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login);
  const allUsers = useSelector((state) => state.users.users);
  const isLoading = useSelector((state) => state.users.loading);
  const allOrders = useSelector((state) => state.orders.allOrders);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const showModal = async (id) => {
    const res = await dispatch(
      getDetailUser({ id, accessToken: user.accessToken, axiosJWT })
    );

    form.setFieldsValue({ ...res.payload });
    setIsModalOpen(true);
  };
  const onFinish = async (values) => {
    const res = await dispatch(
      updateUserByAdmin({
        id: values._id,
        values,
        accessToken: user.accessToken,
        axiosJWT,
      })
    );
    if (res.type.includes("fulfilled")) {
      message.success("Sửa thành công");
    } else {
      message.success("Sửa không thành công");
    }
    form.resetFields();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = async (id) => {
    const res = await dispatch(
      deleteUserByAdmin({
        id: id,
        accessToken: user.accessToken,
        axiosJWT,
      })
    );
    if (res.type.includes("fulfilled")) {
      message.success("xóa thành công");
    } else {
      message.error("xóa không thành công");
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(
        getAllUser({
          axiosJWT,
          accessToken: user?.accessToken,
        })
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(
        getAllOrders({
          axiosJWT,
          accessToken: user?.accessToken,
        })
      );
    })();
  }, []);

  const onChange = async (items, checked) => {
    const { password, ...others } = items;
    const res = await dispatch(
      updateUserByAdmin({
        id: others._id,
        values: { ...others, admin: checked },
        accessToken: user.accessToken,
        axiosJWT,
      })
    );

    if (res.type.includes("fulfilled")) {
      message.success("Sửa thành công");
    } else {
      message.error("Sửa không thành công");
    }
  };

  const columns = [
    {
      title: "Tên đầy đủ",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Đã mua",
      dataIndex: "_id",
      key: "_id",
      render: (record) => {
        const amount = allOrders
          ?.filter((item) => item.userId === record)
          .reduce((sum, record) => sum + record.amount, 0);
        return (
          <Tag color="green">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(amount)}
          </Tag>
        );
      },
      align: "center",
    },
    {
      title: "Cấp độ",
      key: "admin",
      dataIndex: "admin",
      render: (record, items) => (
        <div style={{ width: "100%" }}>
          {record ? (
            <a>
              <MdOutlineAdminPanelSettings /> Quản trị viên
              <Switch
                checked={record}
                style={{ float: "right" }}
                onClick={(checked) => onChange(items, checked)}
              />
            </a>
          ) : (
            <a>
              <FaRegUser /> Người dùng
              <Switch
                checked={record}
                style={{ float: "right" }}
                onClick={(checked) => onChange(items, checked)}
              />
            </a>
          )}
        </div>
      ),
      align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showModal(record._id)} type="primary">
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn xóa?"
            okText="Đồng ý"
            onConfirm={() => confirmDelete(record._id)}
            cancelText="Không"
          >
            <Button type="ghost">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
      align: "center",
    },
  ];

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  const onSearch = async (value) => {
    await dispatch(
      searchUser({
        search: value.toLowerCase(),
        axiosJWT,
        accessToken: user.accessToken,
      })
    );
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard"}>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
      </Breadcrumb>
      <Divider>Tìm kiếm thông tin</Divider>
      <Row>
        <Col xs={12}>
          <Input.Search
            placeholder="Tìm kiếm người dùng"
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
        <Table
          columns={columns}
          dataSource={allUsers}
          rowKey="_id"
          loading={isLoading}
        />
      </div>
      <Modal
        forceRender
        title="Thêm người dùng"
        open={isModalOpen}
        onCancel={handleCancel}
        key={"addUsers"}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Trở lại
          </Button>,
          <Button key="submit" form="form" htmlType="submit" type="primary">
            Sửa
          </Button>,
        ]}
      >
        <Form
          name="form"
          form={form}
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Id" name="_id">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Tên đầy đủ"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đầy đủ tên!",
              },
            ]}
          >
            <Input placeholder="Tên đầy đủ" />
          </Form.Item>

          <Form.Item
            label="Tên Đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đầy đủ tên đăng nhập!",
              },
            ]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đầy đủ Email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            style={{ paddingLeft: 10 }}
            rules={[
              {
                pattern: new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g),
                message: "Không phải là số điện thoại",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input.TextArea placeholder="Địa chỉ" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUser;
