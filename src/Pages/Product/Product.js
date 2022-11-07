/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Col, Image, Row, Skeleton } from "antd";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import styles from "./Product.module.scss";
import Slider from "react-slick";
import { getDetailProduct } from "../../redux/slice/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/slice/cartSlice";
import {
  addViewedsProducts,
  removeViewedsProducts,
} from "../../redux/slice/viewedProducts";
import CommentProducts from "../../Components/CommentProducts/CommentProducts";
import FormInput from "../../Components/CommentProducts/FormInput/FormInput";
import { getListComments } from "../../redux/slice/commentsSlice";

const cx = classNames.bind(styles);
const Product = ({ currentSlide, slideCount, ...props }) => {
  const { id } = useParams();
  const [socket, setSocket] = useState(null);
  const [size, setSize] = useState("");
  const [comments, setComments] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState("");
  const [category, setCategory] = useState("");
  const [clicked, setClicked] = useState(true);
  const [clickedService, setClickedService] = useState(false);
  const [clickedShowCart, setClickedShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const loading = useSelector((state) => state.products.isLoading);
  const viewedProducts = useSelector((state) => state.views.products);
  const navigate = useNavigate();

  useEffect(() => {
    const getDetail = async () => {
      const res = await dispatch(getDetailProduct(id));
      if (res.payload === undefined || res.payload === null) {
        await dispatch(removeViewedsProducts(id));
        navigate(-1);
      } else {
        const { category, size } = res.payload;
        setSize(size[0]);
        setCategory(category);
        setBreadcrumb(
          category === "tee" || category === "jacket" || category === "madmonks"
            ? "Áo"
            : category === "pants"
            ? "Quần"
            : "Phụ kiện"
        );
      }
    };
    getDetail();
  }, [dispatch, id, navigate]);

  useEffect(() => {
    const socketIO = io("http://localhost:8000", {
      transports: ["websocket"],
      query: { id },
    });
    setSocket(socketIO);
    return () => socketIO.close();
  }, [id]);

  useEffect(() => {
    (async () => {
      const res = await dispatch(getListComments({ id }));
      setComments(res.payload);
    })();
  }, [id, dispatch]);

  // realtime
  // join room

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", id);
    }
  }, [socket, id]);

  useEffect(() => {
    if (socket) {
      socket.on("sendCommentToClient", (msg) => {
        setComments([msg, ...comments]);
      });
      return () => socket.off("sendCommentToClient");
    }
  }, [socket, comments]);

  // send reply comments
  useEffect(() => {
    if (socket) {
      socket.on("sendReplyCommentToClient", (msg) => {
        setComments((prev) =>
          prev.map((item) => {
            if (item._id === msg._id) {
              item = msg;
            }
            return item;
          })
        );
      });
      return () => socket.off("sendReplyCommentToClient");
    }
  }, [socket, comments]);
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

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddCart = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...product, quantity, size }));
    setClickedShowCart(true);
  };

  useEffect(() => {
    product?._id !== undefined && dispatch(addViewedsProducts(product));
  }, [product]);

  return (
    <div>
      <Header showCart={clickedShowCart} setShowCart={setClickedShowCart} />
      <main className="minHeightBody">
        <Skeleton loading={loading}>
          <div className={cx("layoutDetailProducts")}>
            <div className={cx("breadcrumbShop")}>
              <div className="container">
                <div className={cx("breadcrumbList")}>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link to={"/"}>Trang chủ</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <Link to={`/collections/${category}`}>{breadcrumb}</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <span>{product?.title}</span>
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
                          <Image src={product?.image} alt={product?.title} />
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
                                {product?.size?.length > 0 && product?.inStock && (
                                  <div className={cx("swatch")}>
                                    <div className={cx("titleSwap")}>
                                      SIZE:{" "}
                                    </div>
                                    <div className={cx("selectSwap")}>
                                      {product?.size.map((item, index) => (
                                        <div
                                          className={cx("swatchElement")}
                                          key={item}
                                        >
                                          <input
                                            id={item}
                                            type="radio"
                                            value={item}
                                            checked={size === item}
                                            onChange={(e) =>
                                              setSize(e.target.value)
                                            }
                                          />
                                          <label
                                            htmlFor={item}
                                            className={
                                              size === item ? cx("sd") : ""
                                            }
                                          >
                                            <span>{item}</span>
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className={cx("select-actions")}>
                                <div className={cx("quantityArea")}>
                                  <input
                                    type="button"
                                    value="-"
                                    className={cx("qtyBtn")}
                                    onClick={() => handleQuantity("dec")}
                                  />
                                  <input
                                    type="text"
                                    value={quantity}
                                    onChange={(e) =>
                                      setQuantity(e.target.value)
                                    }
                                    className={cx("quantityInput")}
                                  />
                                  <input
                                    type="button"
                                    value="+"
                                    className={cx("qtyBtn")}
                                    onClick={() => handleQuantity("inc")}
                                  />
                                </div>
                                <div className={cx("addCartArea")}>
                                  {product?.inStock ? (
                                    <button
                                      onClick={handleAddCart}
                                      className={cx("button", "btnAddToCart")}
                                    >
                                      <span>Thêm vào giỏ</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={(e) => e.preventDefault()}
                                      className={cx("button", "btnAddToCart")}
                                    >
                                      <span>Tạm hết hàng</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className={cx("product-heading")}>
                            <h1>{product?.title}</h1>
                          </div>
                          <div className={cx("product-price")}>
                            <span className={cx("proPrice")}>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(product?.price)}
                            </span>
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
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: product?.description,
                                  }}
                                />
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
                                  - Hạn chế sử dụng máy sấy và ủi (nếu có) chỉ
                                  nên ủi lên vải hoặc sử dụng bàn ủi hơi nước ở
                                  nhiệt độ thích hợp.
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
                                  - Bạn vui lòng gửi cho chúng mình clip đóng
                                  gói và hình ảnh của đơn hàng đổi trả của bạn,
                                  nhân viên tư vấn sẽ xác nhận và tiến hành lên
                                  đơn đổi trả cho bạn.
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
                                    <strong>
                                      Thứ 2 - Thứ 7 từ 9h00 - 17h00
                                    </strong>
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
            {/* Comment product */}
            <section className={cx("productDetailListProd")}>
              <div className="container">
                <div className={cx("listprodTitle")}>
                  <h2>Đánh giá sản phẩm</h2>
                </div>
                <div className={cx("listprodContent")}>
                  <FormInput id={id} socket={socket} />
                  <div className={cx("comments_list")}>
                    <CommentProducts comment={comments} socket={socket} />
                  </div>
                </div>
              </div>
            </section>
            {/* Product viewed */}
            <section className={cx("productDetailListProd")}>
              <div className="container">
                <div className={cx("listprodTitle")}>
                  <h2>Sản phẩm đã xem</h2>
                </div>
                <div className={cx("listprodContent")}>
                  <Slider {...settings}>
                    {viewedProducts.map((item, index) => (
                      <div className={cx("listProductView")} key={item._id}>
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
                                  <Link to={`/products/${item._id}`}>
                                    <div className={cx("image")}>
                                      <picture>
                                        <img
                                          src={item.image}
                                          alt={item.title}
                                        />
                                      </picture>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className={cx("productsDetail")}>
                              <h3>
                                <Link to={`/products/${item._id}`}>
                                  {item.title}
                                </Link>
                              </h3>
                              <p className={cx("productPrice")}>
                                <span className={cx("price")}>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.price)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </section>
          </div>
        </Skeleton>
      </main>
      <Footer />
    </div>
  );
};

export default Product;
