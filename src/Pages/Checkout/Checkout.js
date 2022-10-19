import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Input,
  message,
  Result,
} from "antd";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createAxios } from "../../Utils/createInstance";
import { loginSuccess } from "../../redux/slice/userSlice";
import { deleteAllCart } from "../../redux/slice/cartSlice";
import { createNewOrder } from "../../redux/slice/orderSlice";
import styles from "./Checkout.module.scss";
import { BASE_URL } from "../../Utils/BaseUrl";

const cx = classNames.bind(styles);
const Checkout = () => {
  const [result, setResult] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.login);
  const cart = useSelector((state) => state.carts.products);
  const total = useSelector((state) => state.carts.total);

  const onFinish = async (values) => {
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const dataOrders = {
      ...values,
      userId: user._id,
      products: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        size: item.size,
      })),
      amount: total,
    };
    if (location.pathname.includes("/checkoutPayment")) {
      const { data } = await axiosJWT.post(
        `${BASE_URL}/payment/create`,
        dataOrders,
        {
          headers: { token: `Beaer ${user?.accessToken}` },
        }
      );

      if (data.code === "00") {
        document.location = data.data;
      }
    } else {
      const res = await dispatch(
        createNewOrder({
          id: user._id,
          dataOrders,
          accessToken: user?.accessToken,
          axiosJWT,
        })
      );
      if (res.payload !== undefined) {
        setResult(true);
        dispatch(deleteAllCart());
      } else {
        setResult(false);
        message.error("Đã xảy ra lỗi khi mua hàng", 1.5);
      }
    }
  };
  useEffect(() => {
    cart.length === 0 && navigate("/");
  }, []);

  return (
    <>
      {result === false ? (
        <div className={cx("content")}>
          <div className={cx("wrap")}>
            <div className={cx("sidebar")}>
              <div className={cx("orderSumary")}>
                <div className={cx("orderSumarySections")}>
                  <div className={cx("orderSumarySection")}>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">
                            <span className={cx("visually-hidden")}>
                              Hình ảnh
                            </span>
                          </th>
                          <th scope="col">
                            <span className={cx("visually-hidden")}>Mô tả</span>
                          </th>
                          <th scope="col">
                            <span className={cx("visually-hidden")}>
                              Số lượng
                            </span>
                          </th>
                          <th scope="col">
                            <span className={cx("visually-hidden")}>Giá</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item, index) => (
                          <tr className={cx("product")} key={index}>
                            <td className={cx("productImage")}>
                              <div className={cx("productThumbnail")}>
                                <div className={cx("productThumbnailWrapper")}>
                                  <img
                                    className={cx("productThumbnailImage")}
                                    alt={item.title}
                                    src={item.image}
                                  />
                                </div>
                                <span
                                  className={cx("productThumbnailQuantity")}
                                >
                                  {item.quantity}
                                </span>
                              </div>
                            </td>
                            <td className={cx("productDescription")}>
                              <span
                                className={cx(
                                  "productDescriptionName",
                                  "orderSummaryEmphasis"
                                )}
                              >
                                {item.title}
                              </span>
                              <span
                                className={cx(
                                  "productDescriptionVariant",
                                  "orderSummarySmallText"
                                )}
                              >
                                {item.size}
                              </span>
                            </td>
                            <td
                              className={cx(
                                "productQuantity",
                                "visuallyHidden"
                              )}
                            ></td>
                            <td className={cx("productPrice")}>
                              <span className={cx("orderSummaryEmphasis")}>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.price)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className={cx("orderSumarySection", "paymentLines")}>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">
                            <span className={cx("visually-hidden")}>Mô tả</span>
                          </th>
                          <th scope="col">
                            <span className={cx("visually-hidden")}>Giá</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={cx("totalLine")}>
                          <td className={cx("totalLineName")}>Tạm tính</td>
                          <td className={cx("totalLinePrice")}>
                            <span className={cx("orderSummaryEmphasis")}>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(total)}
                            </span>
                          </td>
                        </tr>
                        <tr className={cx("totalLine")}>
                          <td className={cx("totalLineName")}>
                            Phí vận chuyển
                          </td>
                          <td className={cx("totalLinePrice")}>
                            <span className={cx("orderSummaryEmphasis")}>
                              —
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className={cx("totalLineTableFooter")}>
                        <tr className={cx("totalLine")}>
                          <td>
                            <span className={cx("paymentDueLabelTotal")}>
                              Tổng cộng
                            </span>
                          </td>
                          <td>
                            <span className={cx("paymentDueCurrency")}>
                              VND
                            </span>
                            <span className={cx("paymentDuePrice")}>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(total)}
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* main */}
            <div className={cx("main")}>
              <div className={cx("mainHeader")}>
                <a className={cx("logo")}>
                  <h1 className={cx("logoText")}>Vagabond VietNam</h1>
                </a>
                <Breadcrumb separator=">">
                  <Breadcrumb.Item href="/cart">Giỏ hàng</Breadcrumb.Item>
                  <Breadcrumb.Item>Thông tin giao hàng</Breadcrumb.Item>
                  <Breadcrumb.Item>Phương thức thanh toán</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className={cx("mainContent")}>
                <div className={cx("step")}>
                  <div className={cx("stepActions")}>
                    <div className={cx("section")}>
                      <div className={cx("sectionHeader")}>
                        <h2 className={cx("sectionTitle")}>
                          Thông tin giao hàng
                        </h2>
                      </div>
                      <div className={cx("sectionContent")}>
                        <Form
                          form={form}
                          name="checkout"
                          initialValues={{ ...user }}
                          layout="inline"
                          onFinish={onFinish}
                          autoComplete="off"
                        >
                          <Form.Item
                            name="fullname"
                            wrapperCol={{ sm: 24 }}
                            style={{
                              width: "100%",
                              height: 70,
                              marginBottom: 0,
                              marginRight: 0,
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Họ và tên không được để trống!",
                              },
                            ]}
                          >
                            <Input
                              style={{ borderRadius: "4px", padding: 10 }}
                              placeholder="Họ và tên"
                            />
                          </Form.Item>

                          <Form.Item
                            name="email"
                            wrapperCol={{ sm: 24 }}
                            style={{
                              width: "60%",
                              height: 70,
                              marginBottom: 0,
                              marginRight: 0,
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Email không được để trống!",
                              },
                            ]}
                          >
                            <Input
                              style={{ borderRadius: "4px", padding: 10 }}
                              placeholder="Email"
                            />
                          </Form.Item>

                          <Form.Item
                            name="phone"
                            wrapperCol={{ sm: 24 }}
                            style={{
                              width: "40%",
                              height: 70,
                              paddingLeft: 10,
                              marginBottom: 0,
                              marginRight: 0,
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Số điện thoại không được để trống!",
                              },
                              {
                                pattern: new RegExp(
                                  /((09|03|07|08|05)+([0-9]{8})\b)/g
                                ),
                                message: "Không phải là số điện thoại",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                borderRadius: "4px",
                                padding: "10px",
                              }}
                              placeholder="Số điện thoại"
                            />
                          </Form.Item>

                          <Form.Item
                            name="address"
                            wrapperCol={{ sm: 24 }}
                            style={{
                              width: "100%",
                              height: 70,
                              marginBottom: 0,
                              marginRight: 0,
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Địa chỉ không được để trống!",
                              },
                            ]}
                          >
                            <Input
                              style={{ borderRadius: "4px", padding: 10 }}
                              placeholder="Địa chỉ"
                            />
                          </Form.Item>
                          <Form.Item
                            name="note"
                            wrapperCol={{ sm: 24 }}
                            style={{
                              width: "100%",
                              height: 70,
                              marginBottom: 0,
                              marginRight: 0,
                            }}
                          >
                            <Input.TextArea
                              allowClear
                              showCount
                              autoSize={{ minRows: 3, maxRows: 3 }}
                              placeholder="Ghi chú"
                            />
                          </Form.Item>
                          <Divider />
                          <Form.Item style={{ width: "100%" }}>
                            <div className={cx("buttonWrapper")}>
                              <Link to={"/cart"}>Quay về giỏ hàng</Link>
                              <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                              >
                                {location.pathname.includes("/checkoutPayment")
                                  ? "Tiến hành thanh toán thẻ tín dụng"
                                  : "Hoàn thành thanh toán"}
                              </Button>
                            </div>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Result
          status="success"
          title="Bạn đã thanh toán thành công"
          subTitle="Mã đơn hàng của bạn đã được bên mua tiếp nhận thành công, bạn vui lòng chờ bên admin xác nhận đơn hàng, xin cảm ơn quý khách đã lựa chọn cửa hàng Vagabond"
          extra={[
            <Button
              type="primary"
              key="orders"
              onClick={() => {
                return navigate("/orders") && setResult(false);
              }}
            >
              Xem sản phẩm đã đặt
            </Button>,
            <Button
              key={"buyAgain"}
              onClick={() => {
                return navigate("/") && setResult(false);
              }}
            >
              Mua tiếp sản phẩm
            </Button>,
          ]}
        />
      )}
    </>
  );
};
export default Checkout;
