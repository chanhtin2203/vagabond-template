/* eslint-disable jsx-a11y/anchor-has-content */
import { Breadcrumb, Col, Row } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import styles from "./Cart.module.scss";

const cx = classNames.bind(styles);
const Cart = () => {
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
                      <strong style={{ fontWeight: 400 }}>Giỏ hàng (0)</strong>
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
                      {/* <div className={cx("expandedMessage")}>
                        Giỏ hàng của bạn đang trống
                      </div> */}
                      <div className={cx("listCart")}>
                        <form>
                          <div className={cx("cartRow")}>
                            <p className={cx("titleNumberCart")}>
                              Bạn đang có
                              <strong class="count-cart"> 1 sản phẩm </strong>
                              trong giỏ hàng
                            </p>
                            <div className={cx("tableCart")}>
                              <div className={cx("mediaLineItem")}>
                                <div className={cx("mediaLeft")}>
                                  <div className={cx("item-img")}>
                                    <img
                                      src="  //product.hstatic.net/1000281824/product/300_e2b80b862fd2499f858a17736ac4a613_medium.jpg"
                                      alt="Basic Backpack Degrey Xám - BBD Xám"
                                    />
                                  </div>
                                  <div className={cx("itemRemove")}>
                                    <Link to={"#"}>Xóa</Link>
                                  </div>
                                </div>
                                <div className={cx("mediaRight")}>
                                  <div className={cx("itemInfo")}>
                                    <h3 className={cx("itemTitle")}>
                                      <Link to={"#"}>
                                        Basic Backpack Degrey Xám - BBD Xám
                                      </Link>
                                    </h3>
                                  </div>
                                  <div className={cx("itemPrice")}>
                                    <p>
                                      <span>420,000₫</span>
                                    </p>
                                  </div>
                                </div>
                                <div className={cx("mediaTotal")}>
                                  <div className={cx("itemTotalPrice")}>
                                    <span class={cx("lineItemTotal")}>
                                      420,000₫
                                    </span>
                                  </div>
                                  <div className={cx("itemQty")}>
                                    <div className={cx("quantityPartent")}>
                                      <button className={cx("qtyBtn")}>
                                        -
                                      </button>
                                      <input
                                        type="text"
                                        defaultValue={1}
                                        className={cx("itemQuantity")}
                                      />
                                      <button className={cx("qtyBtn")}>
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
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
                            <span> 0₫</span>
                          </p>
                        </div>
                        <div className={cx("sumaryAction")}>
                          <p>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
                          <p>
                            Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                          </p>
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
                          <div className={cx("sumaryButton")}>
                            <a
                              href="#/"
                              className={cx(
                                "checkoutBtn",
                                "btnRed",
                                "disabled"
                              )}
                            >
                              THANH TOÁN
                            </a>
                          </div>
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
    </div>
  );
};

export default Cart;
