/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import {
  Link,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { FaRegUserCircle } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Badge, Button, Dropdown, Menu } from "antd";
import styles from "./Header.module.scss";
import { useScrollPosition } from "../../Hooks/useScrollPosition";
import SearchProd from "../SearchProd/SearchProd";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseProduct,
  deleteProduct,
  increaseProduct,
} from "../../redux/slice/cartSlice";
import { logoutUser, loginSuccess, getUser } from "../../redux/slice/userSlice";
import { createAxios } from "../../Utils/createInstance";

const cx = classNames.bind(styles);

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Header = ({ showCart, setShowCart }) => {
  const position = useScrollPosition();
  const [fix, setFix] = useState();
  const [modalCart, setModalCart] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carts.products);
  const total = useSelector((state) => state.carts.total);
  const selectorUser = useSelector((state) => state.users.login);
  let axiosJWT = createAxios(selectorUser, dispatch, loginSuccess);

  useEffect(() => {
    document.title = "VAGABOND - VAGABOND VIETNAM";
    (async () => {
      const res = await dispatch(
        getUser({
          id: selectorUser?._id,
          accessToken: selectorUser?.accessToken,
          axiosJWT,
        })
      );
      if (res.type.includes("rejected")) {
        await dispatch(loginSuccess(null));
      }
    })();
  }, []);

  const checkLoginAndRegister =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  const quantity = cart.map((item) => item.quantity).reduce((a, b) => a + b, 0);

  useEffect(() => {
    const listenScrollEvent = () => {
      if (position >= 260) {
        setFix(cx("main", "hsticky", "stickyNav"));
      } else if (position >= 160) {
        setFix(cx("main", "hsticky"));
      } else {
        setFix(cx("main"));
      }
    };
    listenScrollEvent();
  }, [position]);

  const handleShowModal = () => {
    setModalSearch(true);
  };

  const handleShowCart = () => {
    setModalCart(false);
    showCart && setShowCart(false);
  };

  const handleLogout = () => {
    if (location.pathname.includes("/orders")) {
      navigate("/");
    }

    dispatch(
      logoutUser({
        accessToken: selectorUser?.accessToken,
        axiosJWT,
      })
    );
  };

  useEffect(() => {
    setModalCart(showCart);
  }, [showCart]);

  const CustomLink = ({ children, to, ...props }) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    return (
      <li className={match ? cx("menuItem", "active") : cx("menuItem")}>
        <Link className={cx("menuLink")} to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  };
  const menu = (
    <Menu
      items={
        selectorUser !== null
          ? [
              getItem(
                <Button
                  icon={<UserOutlined />}
                  onClick={() => navigate("/users")}
                  style={{ padding: "0 50px", width: "100%" }}
                >
                  Thông tin khách hàng
                </Button>,
                "5"
              ),
              getItem(
                <Button
                  icon={<BsFillCartCheckFill style={{ marginRight: "10px" }} />}
                  onClick={() => navigate("/orders")}
                  style={{ padding: "0 50px", width: "100%" }}
                >
                  Đơn hàng của bạn
                </Button>,
                "4"
              ),
              selectorUser?.admin &&
                getItem(
                  <Button
                    icon={
                      <MdOutlineAdminPanelSettings
                        style={{ marginRight: "10px" }}
                      />
                    }
                    onClick={() => navigate("/admin/dashboard")}
                    style={{ padding: "0 50px", width: "100%" }}
                  >
                    Quản lý admin
                  </Button>,
                  "admin"
                ),
              getItem(
                <Button
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  style={{ padding: "0 50px", width: "100%" }}
                >
                  Đăng xuất
                </Button>,
                "3"
              ),
            ]
          : [
              getItem(
                <Button
                  onClick={() => navigate("/login")}
                  style={{ padding: "0 50px", width: "100%" }}
                  icon={<LoginOutlined />}
                >
                  Đăng nhập
                </Button>,
                "1"
              ),
              getItem(
                <Button
                  icon={<UserAddOutlined />}
                  onClick={() => navigate("/register")}
                  style={{ padding: "0 50px", width: "100%" }}
                >
                  Đăng ký
                </Button>,
                "2"
              ),
            ]
      }
    />
  );

  return (
    <main className={fix}>
      <header className="container">
        <div className={cx("flexContainer")}>
          <div className={cx("headerWrapper")}>
            <div className={cx("logo")}>
              <Link to={"/"} className={cx("logoLink")}>
                <img
                  src="https://vagabondstatic.azureedge.net/dist/images/vagabond_logo_black.svg"
                  alt="Logo"
                  className={cx("logoImage")}
                  width={150}
                  height={25}
                />
              </Link>
            </div>
            <div className={cx("menuWrapper")}>
              <ul className={cx("menuList")}>
                <CustomLink to={"/"}>Trang chủ</CustomLink>
                <CustomLink to={"/collections/all-products"}>
                  Sản phẩm
                </CustomLink>
                <CustomLink to={"/store"}>Store</CustomLink>
                <CustomLink to={"/about-us"}>Giới thiệu</CustomLink>
              </ul>
            </div>
            <div className={cx("formSearch")} onClick={handleShowModal}>
              <button className={cx("buttonSearch")}>
                <SearchOutlined className={cx("iconSearch")} />
              </button>
              <div className={cx("inputSearch")}>
                <input
                  size={20}
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className={cx("searchProduct")}
                  autoComplete="false"
                />
              </div>
            </div>
            {modalSearch && <SearchProd setModalSearch={setModalSearch} />}
            <div
              className={
                modalCart ? cx("cartProduct", "actionShow") : cx("cartProduct")
              }
            >
              <div
                className={cx("headerCart")}
                onClick={() =>
                  location.pathname !== "/cart" && setModalCart(!modalCart)
                }
              >
                <Badge count={quantity} showZero>
                  <ShoppingCartOutlined className={cx("iconCart")} />
                </Badge>
                <span className={cx("titleCart")}>Giỏ hàng</span>
                <span className={cx("boxTriangle")}>
                  <svg viewBox="0 0 20 9" role="presentation">
                    <path
                      d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                      fill="#ffffff"
                    ></path>
                  </svg>
                </span>
              </div>
              <div className={cx("headerDropdown")}>
                <div className={cx("headerDropdownContent")}>
                  <div className={cx("siteNavContent")}>
                    <div className={cx("siteNavContentTitle")}>
                      <p className={cx("txtTitle")}>Giỏ hàng</p>
                    </div>
                  </div>
                  <div className={cx("siteNavContentBlock")}>
                    <div className={cx("siteNavBoxScroll")}>
                      <div className={cx("cartViewRender")}>
                        {cart.length === 0 ? (
                          <div className={cx("miniCartEmpty")}>
                            <div>
                              <div className={cx("svgMiniCart")}>
                                <svg width="81" height="70" viewBox="0 0 81 70">
                                  <g
                                    transform="translate(0 2)"
                                    strokeWidth="4"
                                    fill="none"
                                    fillRule="evenodd"
                                  >
                                    <circle
                                      strokeLinecap="square"
                                      cx="34"
                                      cy="60"
                                      r="6"
                                    ></circle>
                                    <circle
                                      strokeLinecap="square"
                                      cx="67"
                                      cy="60"
                                      r="6"
                                    ></circle>
                                    <path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path>
                                  </g>
                                </svg>
                              </div>
                              Hiện chưa có sản phẩm
                            </div>
                          </div>
                        ) : (
                          <>
                            {cart.map((item, index) => (
                              <div className={cx("miniCartItem")} key={index}>
                                <div className={cx("miniCartLeft")}>
                                  <Link
                                    to={`/products/${item._id}`}
                                    className={cx("mnc-link")}
                                  >
                                    <img src={item.image} alt={item.title} />
                                  </Link>
                                </div>
                                <div className={cx("miniCartRight")}>
                                  <p className={cx("miniCartTitle")}>
                                    <Link
                                      to={`/products/${item._id}`}
                                      className={cx("mnc-title")}
                                    >
                                      {item.title}
                                    </Link>
                                    <span className={cx("mnc-variant")}>
                                      {item.size}
                                    </span>
                                  </p>
                                  <div className={cx("miniCartQuantity")}>
                                    <div className={cx("quantitySelector")}>
                                      <button
                                        className={cx("qtyBtn")}
                                        onClick={() =>
                                          item.quantity > 1 &&
                                          dispatch(decreaseProduct(item))
                                        }
                                      >
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            height="1"
                                            width="18"
                                            y="9"
                                            x="1"
                                          ></rect>
                                        </svg>
                                      </button>
                                      <input
                                        type="text"
                                        className={cx("qtyValue")}
                                        value={item.quantity}
                                        readOnly
                                      />
                                      <button
                                        className={cx("qtyBtn")}
                                        onClick={() =>
                                          dispatch(increaseProduct(item))
                                        }
                                      >
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            x="9"
                                            y="1"
                                            width="1"
                                            height="17"
                                          ></rect>{" "}
                                          <rect
                                            x="1"
                                            y="9"
                                            width="17"
                                            height="1"
                                          ></rect>
                                        </svg>
                                      </button>
                                    </div>
                                    <div className={cx("quantyCartPrice")}>
                                      <span className={cx("mnc-price")}>
                                        {new Intl.NumberFormat("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                        }).format(item.price)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className={cx("miniCartRemove")}>
                                    <a
                                      onClick={() =>
                                        dispatch(deleteProduct(item))
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 1000 1000"
                                        enableBackground="new 0 0 1000 1000"
                                        xmlSpace="preserve"
                                      >
                                        {" "}
                                        <g>
                                          <path d="M500,442.7L79.3,22.6C63.4,6.7,37.7,6.7,21.9,22.5C6.1,38.3,6.1,64,22,79.9L442.6,500L22,920.1C6,936,6.1,961.6,21.9,977.5c15.8,15.8,41.6,15.8,57.4-0.1L500,557.3l420.7,420.1c16,15.9,41.6,15.9,57.4,0.1c15.8-15.8,15.8-41.5-0.1-57.4L557.4,500L978,79.9c16-15.9,15.9-41.5,0.1-57.4c-15.8-15.8-41.6-15.8-57.4,0.1L500,442.7L500,442.7z"></path>
                                        </g>{" "}
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                    <div className={cx("cartViewLine")}></div>
                    <div className={cx("cartViewTotal")}>
                      <div className={cx("miniCart")}>
                        <div className={cx("miniCartTotal")}>
                          <div className={cx("totalText")}>TỔNG TIỀN:</div>
                          <div className={cx("totalPrice")}>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(total)}
                          </div>
                        </div>
                        <div className={cx("miniCartBtn")}>
                          <div className={cx("mnc-cta")}>
                            <Link
                              to={"/cart"}
                              className={cx("linktocart", "button", "btnred")}
                            >
                              Xem giỏ hàng
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {checkLoginAndRegister === false && (
              <div className={cx("user")}>
                <Dropdown
                  overlay={menu}
                  arrow
                  placement="bottom"
                  // trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <FaRegUserCircle style={{ fontSize: "2.5rem" }} />
                    {selectorUser !== null ? (
                      <p>{selectorUser?.fullname}</p>
                    ) : (
                      <p>Chưa đăng nhập?</p>
                    )}
                  </a>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </header>
      {modalSearch && (
        <div
          className={cx("headerOverFlowSearch")}
          onClick={() => setModalSearch(false)}
        ></div>
      )}
      {modalCart && (
        <div onClick={handleShowCart} className={cx("sitenav-overlay")}></div>
      )}
    </main>
  );
};

export default Header;
