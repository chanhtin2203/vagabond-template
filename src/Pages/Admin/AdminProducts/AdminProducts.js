/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import {
  AppstoreAddOutlined,
  MinusCircleTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../Utils/createInstance";
import {
  loginSuccess,
  getAllUser,
  getDetailUser,
  updateUserByAdmin,
  deleteUserByAdmin,
  searchUser,
} from "../../../redux/slice/userSlice";
import { getProductByPagination } from "../../../redux/slice/productsSlice";

const AdminProducts = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    search: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.login);
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.isLoading);
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
        getProductByPagination({
          ...pagination,
          current: pagination.pageIndex,
          pageSize: pagination.pageSize,
          search: pagination.search,
        })
      );
    })();
  }, [
    pagination,
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    pagination.search,
  ]);

  const handleChangePagination = (page) => {
    setPagination({
      ...pagination,
      pageIndex: page.current,
      pageSize: page.pageSize,
    });
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      width: 200,
      fixed: "left",
      height: 200,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 200,
      render: (record) => <Image src={record} />,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 200,
    },
    {
      title: "Trong kho",
      dataIndex: "inStock",
      key: "inStock",
      width: 200,
      render: (record) => {
        let title = record ? "Còn hàng" : "Hết hàng";
        let color = record ? "green" : "volcano";
        return <Tag color={color}>{title}</Tag>;
      },
    },
  ];

  const nestedColumns = [
    {
      title: "Miêu tả",
      dataIndex: "description",
      key: "description",
      ellipsis: {
        showTitle: false,
      },
      width: 250,
      render: (description) => (
        <Tooltip
          placement="topLeft"
          title={<div dangerouslySetInnerHTML={{ __html: description }} />}
        >
          {description}
        </Tooltip>
      ),
    },

    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      width: 200,
    },
    {
      title: "Danh mục phụ",
      key: "subCategory",
      dataIndex: "subCategory",
      width: 200,
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      key: "size",
      width: 200,
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
      width: 200,
      render: (record) => {
        return <Tag color={record}>{record}</Tag>;
      },
    },
  ];

  const onSearch = async (value) => {
    setPagination({ ...pagination, search: value });
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard"}>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <Divider>Tìm kiếm sản phẩm</Divider>
      <Row>
        <Col xs={12}>
          <Input.Search
            placeholder="Tìm kiếm sản phẩm"
            allowClear
            size="large"
            enterButton
            onSearch={onSearch}
          />
        </Col>
        <Col xs={12}>
          <Button
            type="primary"
            icon={<AppstoreAddOutlined />}
            size="large"
            style={{ float: "right" }}
          >
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>
      <Divider>Bảng thông tin</Divider>
      <div className="tableUser">
        <Table
          loading={loading}
          columns={columns}
          dataSource={products.products}
          rowKey="_id"
          scroll={{ x: 500, y: 500 }}
          sticky
          pagination={{
            total: products.total,
            pageSize: pagination.pageSize,
          }}
          bordered
          onChange={handleChangePagination}
          expandable={{
            rowExpandable: (record) => true,
            expandedRowRender: (record) => {
              return (
                <Table
                  columns={nestedColumns}
                  dataSource={products.products.filter(
                    (item) => item._id === record._id
                  )}
                  rowKey="_id"
                  pagination={false}
                  tableLayout="fixed"
                  bordered
                />
              );
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
        />
      </div>
      <Modal
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
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProducts;
