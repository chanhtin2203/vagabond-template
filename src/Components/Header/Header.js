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
import { Avatar, Badge, Button, Dropdown, Menu } from "antd";
import styles from "./Header.module.scss";
import { useScrollPosition } from "../../Hooks/useScrollPosition";
import SearchProd from "../SearchProd/SearchProd";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/slice/productsSlice";

const cx = classNames.bind(styles);

const Header = () => {
  const position = useScrollPosition();
  const [fix, setFix] = useState();
  const [modalCart, setModalCart] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "VAGABOND - VAGABOND VIETNAM";
    dispatch(getAllProducts());
  }, []);

  const checkLoginAndRegister =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  const user = true;

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
        user
          ? [
              {
                key: "3",
                label: (
                  <Button
                    icon={<LogoutOutlined />}
                    style={{ padding: "0 50px", width: "100%" }}
                  >
                    Đăng xuất
                  </Button>
                ),
              },
            ]
          : [
              {
                key: "1",
                label: (
                  <Button
                    onClick={() => navigate("/login")}
                    style={{ padding: "0 50px", width: "100%" }}
                    icon={<LoginOutlined />}
                  >
                    Đăng nhập
                  </Button>
                ),
              },
              {
                key: "2",
                label: (
                  <Button
                    icon={<UserAddOutlined />}
                    onClick={() => navigate("/register")}
                    style={{ padding: "0 50px", width: "100%" }}
                  >
                    Đăng ký
                  </Button>
                ),
              },
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
                onClick={() => setModalCart(!modalCart)}
              >
                <Badge count={5}>
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
                        {/* <div className={cx("miniCartItem")}>
                          <div className={cx("miniCartLeft")}>
                            <Link to={"#"} className={cx("mnc-link")}>
                              <img
                                src="https://product.hstatic.net/1000281824/product/c39b1fb4b6754c47962405b8fee6fa0c_49eab7d9ab424059ac2ea87b564fd4e8_small.jpg"
                                alt="Degrey Leather Basic Balo - LBB"
                              />
                            </Link>
                          </div>
                          <div className={cx("miniCartRight")}>
                            <p className={cx("miniCartTitle")}>
                              <Link to={"#"} className={cx("mnc-title")}>
                                Degrey Leather Basic Balo - LBB
                              </Link>
                              <span className={cx("mnc-variant")}></span>
                            </p>
                            <div className={cx("miniCartQuantity")}>
                              <div className={cx("quantitySelector")}>
                                <button className={cx("qtyBtn")}>
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
                                  defaultValue={2}
                                />
                                <button className={cx("qtyBtn")}>
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
                                  390,000₫
                                </span>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className={cx("cartViewLine")}></div>
                    <div className={cx("cartViewTotal")}>
                      <div className={cx("miniCart")}>
                        <div className={cx("miniCartTotal")}>
                          <div className={cx("totalText")}>TỔNG TIỀN:</div>
                          <div className={cx("totalPrice")}>0₫</div>
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
                          {/* <div className={cx("mnc-cta")}>
                            <Link
                              to={"/cart"}
                              className={cx("linktocart", "button", "btnred")}
                            >
                              Thanh toán
                            </Link>
                          </div> */}
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
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar icon={<UserOutlined />} size="large" />
                    {user ? <p>Hello: admin</p> : <p>Chưa đăng nhập?</p>}
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
        <div
          onClick={() => setModalCart(false)}
          className={cx("sitenav-overlay")}
        ></div>
      )}
    </main>
  );
};

export default Header;
