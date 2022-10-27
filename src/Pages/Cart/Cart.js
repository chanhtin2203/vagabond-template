/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { Breadcrumb, Col, Popconfirm, Radio, Row } from "antd";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Portal from "../../Components/Portal/Portal";
import {
  decreaseProduct,
  deleteProduct,
  increaseProduct,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.scss";

const cx = classNames.bind(styles);
const Cart = () => {
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [payment, setPayment] = useState("COD");
  const [productRemove, setProductRemove] = useState([]);
  const cart = useSelector((state) => state.carts.products);
  const total = useSelector((state) => state.carts.total);
  const user = useSelector((state) => state.auth.login);
  const quantity = cart.map((item) => item.quantity).reduce((a, b) => a + b, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e, value, type) => {
    e.preventDefault();
    if (type === "Dec") {
      value.quantity > 1 && dispatch(decreaseProduct(value));
    } else dispatch(increaseProduct(value));
  };

  const handleDeleteCart = () => {
    dispatch(deleteProduct(productRemove));
    setShowModalRemove(false);
  };

  const handleRemoveCart = (item) => {
    setProductRemove(item);
    setShowModalRemove(true);
  };

  const handleChangePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleClickPayment = (values) => {
    if (values) {
      navigate("/cart");
    } else {
      if (payment === "COD") navigate("/checkouts");
      else navigate("/checkoutPayment");
    }
  };

  const handleClickLogin = (values) => {
    if (values) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Header />
      <main className="minHeightBody">
        <div className={cx("layoutCart")}>
          <div className={cx("breadcrumbShop")}>
            <div className="container">
              <div className={cx("breadcrumbList")}>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to={"/"}>Trang chủ</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <span>
                      <strong style={{ fontWeight: 400 }}>
                        Giỏ hàng ({quantity})
                      </strong>
                    </span>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </div>
          <div className={cx("wrapperMainCart")}>
            <div className={cx("contentBodyCart")}>
              <div className="container">
                <Row gutter={30}>
                  <Col
                    md={16}
                    sm={24}
                    xs={24}
                    className={cx("contentCartDetail")}
                  >
                    <div className={cx("mainCartDetail")}>
                      <div className={cx("headingCart")}>
                        <h1>Giỏ hàng của bạn</h1>
                      </div>
                      {/* Empty cart */}
                      {cart.length === 0 && (
                        <div className={cx("expandedMessage")}>
                          Giỏ hàng của bạn đang trống
                        </div>
                      )}
                      {cart.length > 0 && (
                        <div className={cx("listCart")}>
                          <form>
                            <div className={cx("cartRow")}>
                              <p className={cx("titleNumberCart")}>
                                Bạn đang có
                                <strong className="count-cart">
                                  {" "}
                                  {quantity} sản phẩm{" "}
                                </strong>
                                trong giỏ hàng
                              </p>
                              <div className={cx("tableCart")}>
                                {cart.map((item, index) => (
                                  <div
                                    className={cx("mediaLineItem")}
                                    key={index}
                                  >
                                    <div className={cx("mediaLeft")}>
                                      <div className={cx("item-img")}>
                                        <img
                                          src={item.image}
                                          alt={item.title}
                                        />
                                      </div>
                                      <div className={cx("itemRemove")}>
                                        <a
                                          onClick={() => handleRemoveCart(item)}
                                        >
                                          Xóa
                                        </a>
                                      </div>
                                    </div>
                                    <div className={cx("mediaRight")}>
                                      <div className={cx("itemInfo")}>
                                        <h3 className={cx("itemTitle")}>
                                          <Link to={`/products/${item._id}`}>
                                            {item.title}
                                          </Link>
                                          <div className={cx("itemVariant")}>
                                            <span>{item.size}</span>
                                          </div>
                                        </h3>
                                      </div>
                                      <div className={cx("itemPrice")}>
                                        <p>
                                          <span>
                                            {new Intl.NumberFormat("vi-VN", {
                                              style: "currency",
                                              currency: "VND",
                                            }).format(item.price)}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    <div className={cx("mediaTotal")}>
                                      <div className={cx("itemTotalPrice")}>
                                        <span className={cx("lineItemTotal")}>
                                          {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                          }).format(item.price * item.quantity)}
                                        </span>
                                      </div>
                                      <div className={cx("itemQty")}>
                                        <div className={cx("quantityPartent")}>
                                          <button
                                            className={cx("qtyBtn")}
                                            onClick={(e) =>
                                              handleClick(e, item, "Dec")
                                            }
                                          >
                                            -
                                          </button>
                                          <input
                                            type="text"
                                            value={item.quantity}
                                            readOnly
                                            className={cx("itemQuantity")}
                                          />
                                          <button
                                            className={cx("qtyBtn")}
                                            onClick={(e) =>
                                              handleClick(e, item, "Inc")
                                            }
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col
                    md={8}
                    sm={24}
                    xs={24}
                    className={cx("sidebarCartSticky")}
                  >
                    <div className={cx("mainCartSideBar")}>
                      <div className={cx("orderSummaryBlock")}>
                        <h2 className={cx("summaryTitle")}>
                          Thông tin đơn hàng
                        </h2>
                        <div className={cx("sumaryTotal")}>
                          <p>
                            Tổng tiền:
                            <span>
                              {" "}
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(total)}
                            </span>
                          </p>
                        </div>
                        <div className={cx("sumaryAction")}>
                          <p>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
                          <p>
                            Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                          </p>
                          {cart.length === 0 && (
                            <div
                              className={cx(
                                "sumaryAlert",
                                "alertDanger",
                                "alert"
                              )}
                            >
                              Giỏ hàng của bạn hiện chưa đạt mức tối thiểu để
                              thanh toán.
                            </div>
                          )}
                          <div className={cx("payment")}>
                            <Radio.Group
                              onChange={handleChangePayment}
                              value={payment}
                            >
                              <Radio value={"COD"}>Ship COD</Radio>
                              <Radio value={"payment"}>
                                Thanh toán bằng thẻ
                              </Radio>
                            </Radio.Group>
                          </div>
                          {user !== null ? (
                            <div className={cx("sumaryButton")}>
                              <a
                                className={cx(
                                  "checkoutBtn",
                                  "btnRed",
                                  cart.length === 0 && "disabled"
                                )}
                                onClick={() =>
                                  handleClickPayment(
                                    cart.length === 0 && "disabled"
                                  )
                                }
                              >
                                THANH TOÁN
                              </a>
                            </div>
                          ) : (
                            <div className={cx("sumaryButton")}>
                              <a
                                className={cx(
                                  "checkoutBtn",
                                  "btnRed",
                                  cart.length === 0 && "disabled"
                                )}
                                onClick={() =>
                                  handleClickLogin(
                                    cart.length === 0 && "disabled"
                                  )
                                }
                              >
                                Đăng nhập để thanh toán
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={cx(
                          "orderSummaryBlock",
                          "orderSummaryNotify"
                        )}
                      >
                        <div className={cx("sumaryWarning")}>
                          <div className={cx("textmr")}>
                            <strong>Chính sách giao hàng</strong>
                            <p>
                              Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng
                              có giá trị tối thiểu <strong>150.000₫ </strong>{" "}
                              trở lên.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {showModalRemove && (
        <Portal>
          <div className={cx("showModal", "modalOverlay")}>
            <div className={cx("swalModal", "swalCartRemove")}>
              <div className={cx("swalText")}>
                Bạn chắc chắn muốn bỏ sản phẩm này ra khỏi giỏ hàng?
              </div>
              <div className={cx("swalFooter")}>
                <div className={cx("swalButtonContainer")}>
                  <button
                    className={cx("swalButton", "swalButtonCancel")}
                    onClick={() => setShowModalRemove(false)}
                  >
                    Hủy
                  </button>
                </div>
                <div className={cx("swalButtonContainer")}>
                  <button
                    className={cx("swalButton", "swalButtonConfirm")}
                    onClick={handleDeleteCart}
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Cart;
