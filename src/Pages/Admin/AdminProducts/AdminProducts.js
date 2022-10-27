/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import {
  AppstoreAddOutlined,
  MinusCircleTwoTone,
  PlusCircleTwoTone,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../Utils/createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import {
  addProductsByAdmin,
  deleteProductsByAdmin,
  getProductByPagination,
  getDetailProduct,
  updateProductsByAdmin,
} from "../../../redux/slice/productsSlice";

const { Option } = Select;
const size = ["S", "M", "L", "XL"];
const AdminProducts = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    search: "",
    tabs: "Tất cả",
  });
  const [valueEditor, setValueEditor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsCategory, setItemsCategory] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [itemsSubCategory, setItemsSubCategory] = useState([]);
  const [nameSubCategory, setNameSubCategory] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login);
  const products = useSelector((state) => state.products.productsPagination);
  const loading = useSelector((state) => state.products.isLoading);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const showModal = async (id) => {
    const res = await dispatch(getDetailProduct(id));
    if (res.payload) {
      form.setFieldsValue({
        ...res.payload,
      });
      setImageUrl(res.payload.image);
    }
    setIsModalOpen(true);
  };
  const onFinish = async (values) => {
    if (values._id) {
      const res = await dispatch(
        updateProductsByAdmin({
          id: values._id,
          values,
          accessToken: user?.accessToken,
          axiosJWT,
        })
      );

      if (res.type.includes("fulfilled")) {
        form.resetFields();
        setIsModalOpen(false);
        message.success("Sửa sản phẩm thành công");
      } else {
        message.error("Sửa sản phẩm thất bại");
      }
    } else {
      if (values.image === undefined) {
        message.error("Vui lòng chọn hình ảnh");
        return;
      }
      const res = await dispatch(
        addProductsByAdmin({ values, accessToken: user?.accessToken, axiosJWT })
      );
      if (res.type.includes("fulfilled")) {
        form.resetFields();
        setIsModalOpen(false);
        setImageUrl("");
        message.success("Thêm sản phẩm thành công");
      } else {
        message.error("Thêm sản phẩm thất bại");
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setImageUrl("");
  };

  const confirmDelete = async (id) => {
    const res = await dispatch(
      deleteProductsByAdmin({ id, accessToken: user?.accessToken, axiosJWT })
    );
    if (res.type.includes("fulfilled")) {
      message.success("Xóa sản phẩm thành công");
    } else {
      message.error("Xóa sản phẩm thất bại");
    }
  };

  useEffect(() => {
    (async () => {
      const res = await dispatch(
        getProductByPagination({
          ...pagination,
          current: pagination.pageIndex,
          pageSize: pagination.pageSize,
          search: pagination.search,
          tabs: pagination.tabs,
        })
      );
      setItemsCategory(res.payload.category);
      setItemsSubCategory(res.payload.subCategory);
    })();
  }, [dispatch, pagination]);

  const handleChangePagination = (page) => {
    setPagination({
      ...pagination,
      pageIndex: page.current,
      pageSize: page.pageSize,
    });
  };

  const onChangeTabs = (key) => {
    setPagination({
      ...pagination,
      pageIndex: 1,
      tabs: key,
    });
  };

  // Upload file
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const handleFileInputChange = (e) => {
    getBase64(e.target.files[0])
      .then((result) => {
        form.setFieldsValue({
          image: result,
        });
        setImageUrl(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // // Upload file

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      render: (_, record, index) => {
        const pageIndex = pagination.pageIndex;
        return <h4>{index + 10 * (pageIndex - 1) + 1}</h4>;
      },
      width: 50,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 105,
      render: (record) => <Image src={record} width={150} height={150} />,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (record) => (
        <Tag color="cyan">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(record)}
        </Tag>
      ),
    },
    {
      title: "Trong kho",
      dataIndex: "inStock",
      key: "inStock",
      width: 110,
      render: (record) => {
        let title = record ? "Còn hàng" : "Hết hàng";
        let color = record ? "green" : "volcano";
        return <Tag color={color}>{title}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
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
      render: (record) => {
        return <div>{record.join(", ")}</div>;
      },
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

  // Search
  const onSearch = async (value) => {
    setPagination({ ...pagination, search: value });
  };
  // Search

  // select category
  const onNameChange = (event) => {
    setNameCategory(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    nameCategory !== "" && setItemsCategory([...itemsCategory, nameCategory]);
    setNameCategory("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChangeSelectCategory = (value) => {
    const res = itemsSubCategory.filter((item) =>
      item.toLowerCase().includes(value)
    );
    res.length > 0 &&
      form.setFieldsValue({
        subCategory: res.join(""),
      });
  };
  // select category

  // select subCategory
  const onNameSubCategoryChange = (event) => {
    setNameSubCategory(event.target.value);
  };
  const addItemSubCategory = (e) => {
    e.preventDefault();
    nameSubCategory !== "" &&
      setItemsSubCategory([...itemsSubCategory, nameSubCategory]);
    setNameSubCategory("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const handleChangeSelectSubCategory = (value) => {
    const res = itemsCategory.filter((item) =>
      value.includes(item.toLowerCase())
    );
    res.length > 0 &&
      form.setFieldsValue({
        category: res.join(""),
      });
  };
  // select subCategory

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
            onClick={showModal}
          >
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>
      <Divider>Bảng thông tin</Divider>
      <Tabs
        onChange={onChangeTabs}
        items={itemsSubCategory.map((item) => {
          return {
            key: item,
            label: item.replace(
              /(^|\s+)(\S)(\S*)/g,
              function (match, whitespace, firstLetter, rest) {
                return (
                  whitespace + firstLetter.toUpperCase() + rest.toLowerCase()
                );
              }
            ),
          };
        })}
      />
      <div className="tableUser">
        <Table
          loading={loading}
          columns={columns}
          dataSource={products.products}
          rowKey="_id"
          scroll={{ x: 500, y: 500 }}
          sticky
          pagination={{
            current: pagination.pageIndex,
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
        style={{
          top: 20,
        }}
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 150px)" }}
        title="Thêm sản phẩm"
        open={isModalOpen}
        forceRender
        onCancel={handleCancel}
        key={"addProducts"}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Trở lại
          </Button>,
          <Button key="submit" form="products" htmlType="submit" type="primary">
            Tiếp tục
          </Button>,
        ]}
      >
        <Form
          name="products"
          form={form}
          initialValues={{ size: [] }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Id" name="_id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Tên sản phẩm"
            name="title"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên sản phẩm!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Upload">
            <Input
              type="file"
              name="file"
              id="file"
              onChange={(e) => handleFileInputChange(e)}
              hidden
            />
            <label
              htmlFor="file"
              style={{
                border: "1px solid #dddddd",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              <UploadOutlined />
              Tải ảnh lên
            </label>
            {imageUrl !== "" && (
              <Form.Item name="image" label="Hình ảnh">
                <Image
                  src={imageUrl}
                  width={150}
                  height={150}
                  style={{ objectFit: "contain" }}
                />
              </Form.Item>
            )}
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả!",
              },
            ]}
          >
            <ReactQuill
              theme="snow"
              value={valueEditor}
              onChange={setValueEditor}
              modules={AdminProducts.modules}
              formats={AdminProducts.formats}
            />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên danh mục!",
              },
            ]}
          >
            <Select
              allowClear
              onChange={handleChangeSelectCategory}
              placeholder="Chọn danh mục sản phẩm"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                  <Space
                    style={{
                      padding: "0 8px 4px",
                    }}
                  >
                    <Input
                      placeholder="Thêm danh mục mới?"
                      ref={inputRef}
                      value={nameCategory}
                      onChange={onNameChange}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Thêm danh mục
                    </Button>
                  </Space>
                </>
              )}
            >
              {itemsCategory?.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Danh mục Phụ"
            name="subCategory"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên danh mục phụ!",
              },
            ]}
          >
            <Select
              allowClear
              placeholder="Chọn danh mục sản phẩm phụ"
              onChange={handleChangeSelectSubCategory}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                  <Space
                    style={{
                      padding: "0 8px 4px",
                    }}
                  >
                    <Input
                      placeholder="Thêm danh mục phụ?"
                      ref={inputRef}
                      value={nameSubCategory}
                      onChange={onNameSubCategoryChange}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItemSubCategory}
                    >
                      Thêm danh mục phụ
                    </Button>
                  </Space>
                </>
              )}
            >
              {itemsSubCategory.slice(1).map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Kích cỡ" name="size">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Chọn kích cỡ"
            >
              {size.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá tiền!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "50%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              addonAfter="₫"
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

AdminProducts.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

AdminProducts.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default AdminProducts;
