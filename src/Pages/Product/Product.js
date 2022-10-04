import { Breadcrumb, Col, Image, Row } from "antd";
import classNames from "classnames/bind";
import React, { useRef, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import styles from "./Product.module.scss";
import Slider from "react-slick";

const cx = classNames.bind(styles);
const Product = ({ currentSlide, slideCount, ...props }) => {
  const [activeId, setActiveId] = useState(null);
  const [clicked, setClicked] = useState(true);
  const [clickedService, setClickedService] = useState(false);
  const [checked, setChecked] = useState();

  const ref = useRef({});

  const selectSize = [
    { id: "swatch-0-s", text: "S", inStock: true },
    { id: "swatch-0-m", text: "M" },
    { id: "swatch-0-l", text: "L" },
    { id: "swatch-0-xl", text: "XL", inStock: true },
  ];
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <GrFormPrevious
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
    >
      Previous
    </GrFormPrevious>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    return (
      <GrFormNext
        {...props}
        className={
          "slick-next slick-arrow" +
          (currentSlide === slideCount - 5 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 5 ? true : false}
      >
        Next
      </GrFormNext>
    );
  };
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    infinite: false,
    rows: 1,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Header />
      <main className="minHeightBody">
        <div className={cx("layoutDetailProducts")}>
          <div className={cx("breadcrumbShop")}>
            <div className="container">
              <div className={cx("breadcrumbList")}>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to={"/"}>Trang chủ</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to={"/"}>Áo</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <span>
                      Áo Xoài Degrey Đi Lính 2 năm e có chờ không - AXDL
                    </span>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </div>
          <section className={cx("productInfomation")}>
            <div className="container">
              <Row gutter={30}>
                <Col
                  md={12}
                  sm={24}
                  xs={24}
                  className={cx("productDetailGallery")}
                >
                  <div className={cx("productContainergallery")}>
                    <div className={cx("verticalSlide")}>
                      <div>
                        <Image
                          src="https://product.hstatic.net/1000281824/product/3056_a3dd7177a5b640c4a768e301655bdd76_master.jpg"
                          alt="áo"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <div className={cx("productDetailContent")}>
                    <div className={cx("productDetailContainer")}>
                      <div className={cx("productDetailOrder")}>
                        <div className={cx("product-variants")}>
                          <form>
                            <div className={cx("select")}></div>
                            <div className={cx("select-swatch")}>
                              <div className={cx("swatch")}>
                                <div className={cx("titleSwap")}>SIZE: </div>
                                <div className={cx("selectSwap")}>
                                  {selectSize.map((item) => (
                                    <div
                                      className={
                                        item.inStock
                                          ? cx("swatchElement")
                                          : cx("swatchElement", "soldout")
                                      }
                                      key={item.id}
                                      onClick={() => setActiveId(item.id)}
                                    >
                                      <input
                                        id={item.id}
                                        type="radio"
                                        checked={checked === item.id}
                                        onChange={() => setChecked(item.text)}
                                      />
                                      <label
                                        htmlFor={item.id}
                                        className={
                                          activeId === item.id ? cx("sd") : ""
                                        }
                                      >
                                        <span>{item.text}</span>
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className={cx("select-actions")}>
                              <div className={cx("quantityArea")}>
                                <input
                                  type="button"
                                  value="-"
                                  className={cx("qtyBtn")}
                                />
                                <input
                                  type="text"
                                  defaultValue={1}
                                  min={1}
                                  className={cx("quantityInput")}
                                />
                                <input
                                  type="button"
                                  value="+"
                                  className={cx("qtyBtn")}
                                />
                              </div>
                              <div className={cx("addCartArea")}>
                                <button
                                  className={cx("button", "btnAddToCart")}
                                >
                                  <span>Thêm vào giỏ</span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className={cx("product-heading")}>
                          <h1>
                            Áo Xoài Degrey Đi Lính 2 năm e có chờ không - AXDL
                          </h1>
                        </div>
                        <div className={cx("product-price")}>
                          <span className={cx("proPrice")}>320,000₫</span>
                        </div>
                      </div>
                      <div className={cx("product-coutdown")} />
                      <div className={cx("product-policy-detail")}>
                        <div className={cx("itemPolicyDetail")}>
                          Freeship đơn hàng giá trị trên 1 triệu đồng
                        </div>
                        <div className={cx("itemPolicyDetail")}>
                          Đổi hàng chưa qua sử dụng trong vòng 30 ngày
                        </div>
                      </div>
                      <div className={cx("product-description")}>
                        <div
                          className={
                            clicked
                              ? cx("panelGroup", "opened")
                              : cx("panelGroup")
                          }
                        >
                          <div className={cx("panelTitle")}>
                            <h2>
                              THông tin sản phẩm
                              {clicked ? (
                                <AiOutlineMinus
                                  onClick={() => setClicked(!clicked)}
                                />
                              ) : (
                                <AiOutlinePlus
                                  onClick={() => setClicked(!clicked)}
                                />
                              )}
                            </h2>
                          </div>
                          <div
                            className={cx("panelDescription")}
                            style={
                              clicked
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            <div
                              className={cx(
                                "descProductDetail",
                                "typeList-style"
                              )}
                            >
                              <p>
                                <img
                                  src="//file.hstatic.net/1000281824/file/f0dc45e502a5c0fb99b4_6c6c121ffff242849ca395905f972b0e_grande.jpg"
                                  alt="logo"
                                />
                              </p>
                              <p>- Chất liệu: Cotton</p>
                              <p>- Họa tiết: Được in trực tiếp lên sản phẩm</p>
                              <p>- Size: S/ M/ L/XL</p>
                              <p>- Thương hiệu: Degrey</p>
                              <p>- Sản xuất: Việt Nam</p>
                              <p>
                                - Màu sắc và họa tiết được thiết kế riêng bởi
                                team design DEGREY
                              </p>
                              <p>&nbsp;</p>
                              <p>+ HƯỚNG DẪN BẢO QUẢN SẢN PHẨM DEGREY:</p>
                              <p>
                                - Giặt ở nhiệt độ bình thường, với đồ có màu
                                tương tự.
                              </p>
                              <p>- Không dùng hóa chất tẩy lên sản phẩm</p>
                              <p>
                                - Bạn nên giặt tay và LỘN NGƯỢC ÁO trước khi
                                giặt.
                              </p>
                              <p>- Không ủi trực tiếp lên hình in.</p>
                              <p>
                                - Hạn chế sử dụng máy sấy và ủi (nếu có) chỉ nên
                                ủi lên vải hoặc sử dụng bàn ủi hơi nước ở nhiệt
                                độ thích hợp.
                              </p>
                              <p>&nbsp;</p>
                              <p>+ CHÍNH SÁCH ĐỔI SẢN PHẨM:</p>
                              <p>1.Điều kiện đổi hàng</p>
                              <p>
                                - Bạn lưu ý giữ lại hoá đơn để đổi hàng trong
                                vòng 30 ngày.
                              </p>
                              <p>
                                - Đối với mặt hàng giảm giá, phụ kiện cá nhân
                                (áo lót, khẩu trang, vớ ...) không nhận đổi
                                hàng.
                              </p>
                              <p>
                                - Tất cả sản phẩm đã mua sẽ không được đổi trả
                                lại bằng tiền mặt.
                              </p>
                              <p>
                                - Bạn có thể đổi size hoặc sản phẩm khác trong
                                30 ngày (Lưu ý: sản phẩm chưa qua sử dụng, còn
                                tag nhãn và hóa đơn mua hàng.)
                              </p>
                              <p>
                                - Bạn vui lòng gửi cho chúng mình clip đóng gói
                                và hình ảnh của đơn hàng đổi trả của bạn, nhân
                                viên tư vấn sẽ xác nhận và tiến hành lên đơn đổi
                                trả cho bạn.
                              </p>
                              <p>&nbsp;</p>
                              <p>2. Trường hợp khiếu nại</p>
                              <p>- Bạn phải có video unbox hàng</p>
                              <p>- Quay video rõ nét 6 mặt của gói hàng</p>
                              <p>
                                - Quay rõ: Tên người nhận, mã đơn, địa chỉ, số
                                điện thoại.
                              </p>
                              <p>- Clip không cắt ghép, chỉnh sửa</p>
                              <p>
                                - Degrey xin không tiếp nhận giải quyết các
                                trường hợp không thỏa các điều kiện trên.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            clickedService
                              ? cx("panelGroup")
                              : cx("panelGroup", "opened")
                          }
                        >
                          <div className={cx("panelTitle")}>
                            <h2>
                              Dịch vụ giao hàng
                              {clickedService ? (
                                <AiOutlineMinus
                                  onClick={() =>
                                    setClickedService(!clickedService)
                                  }
                                />
                              ) : (
                                <AiOutlinePlus
                                  onClick={() =>
                                    setClickedService(!clickedService)
                                  }
                                />
                              )}
                            </h2>
                          </div>
                          <div
                            className={cx("panelDescription")}
                            style={
                              clickedService
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            <div className={cx("productDeliverly")}>
                              <ul className={cx("infoListDeliverly")}>
                                <li>
                                  <span>
                                    <img
                                      data-src="https://file.hstatic.net/1000397797/file/delivery-ico1_f26631929e1b41dab022d9960006297c.svg"
                                      src="https://file.hstatic.net/1000397797/file/delivery-ico1_f26631929e1b41dab022d9960006297c.svg"
                                      alt="Cam kết 100% chính hãng Degrey"
                                    />
                                  </span>
                                  Cam kết 100% chính hãng Degrey
                                </li>
                                <li>
                                  <span>
                                    <img
                                      data-src="https://file.hstatic.net/1000397797/file/delivery-ico2_5ea2de2f279b4dbfa10fcb9b9c448b4d.svg"
                                      src="https://file.hstatic.net/1000397797/file/delivery-ico2_5ea2de2f279b4dbfa10fcb9b9c448b4d.svg"
                                      alt="Giao hàng dự kiến: Thứ 2 - Thứ 7 từ 9h00 - 17h00"
                                    />
                                  </span>
                                  Giao hàng dự kiến: <br />
                                  <strong>Thứ 2 - Thứ 7 từ 9h00 - 17h00</strong>
                                </li>
                                <li>
                                  <span>
                                    <img
                                      data-src="https://file.hstatic.net/1000397797/file/delivery-ico3_dd589d9c49584441a9ef0c2f9300649f.svg"
                                      src="https://file.hstatic.net/1000397797/file/delivery-ico3_dd589d9c49584441a9ef0c2f9300649f.svg"
                                      alt="Hỗ trợ 24/7 Với các kênh chat, email &amp; phone"
                                    />
                                  </span>
                                  Hỗ trợ 24/7
                                  <br />
                                  Với các kênh chat, email &amp; phone
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </section>
          <section className={cx("productDetailListProd")}>
            <div className="container">
              <div className={cx("listprodTitle")}>
                <h2>Sản phẩm đã xem</h2>
              </div>
              <div className={cx("listprodContent")}>
                <Slider ref={ref} {...settings}>
                  <div className={cx("listProductView")}>
                    <div className={cx("productLoop")}>
                      <div
                        className={cx("productInner")}
                        style={{ height: "313px" }}
                      >
                        <div className={cx("productsImage")}>
                          <div
                            className={cx("productsListImage")}
                            style={{ height: "220px" }}
                          >
                            <div className={cx("productImageInner")}>
                              <Link to={"/products/asd"}>
                                <div className={cx("image")}>
                                  <picture>
                                    <img
                                      src="https://product.hstatic.net/1000281824/product/c39b1fb4b6754c47962405b8fee6fa0c_49eab7d9ab424059ac2ea87b564fd4e8_master.jpg"
                                      alt=""
                                    />
                                  </picture>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className={cx("productsDetail")}>
                          <h3>
                            <Link to={"/"}>
                              Degrey Leather Basic Balo - LBB
                            </Link>
                          </h3>
                          <p className={cx("productPrice")}>
                            <span className={cx("price")}>390,000₫</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Product;
