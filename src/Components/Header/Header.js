import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import styles from "./Header.module.scss";
import { useScrollPosition } from "../../Hooks/useScrollPosition";

const cx = classNames.bind(styles);

const Header = () => {
  const position = useScrollPosition();
  const [fix, setFix] = useState();

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
                <CustomLink to={"/collection"}>Sản phẩm</CustomLink>
                <CustomLink to={"/store"}>Store</CustomLink>
                <CustomLink to={"/about-us"}>Giới thiệu</CustomLink>
              </ul>
            </div>
            <div className={cx("formSearch")}>
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
            <div className={cx("cartProduct")}>
              <div className={cx("headerCart")}>
                <Badge count={5}>
                  <ShoppingCartOutlined className={cx("iconCart")} />
                </Badge>
                <span className={cx("titleCart")}>Giỏ hàng</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
};

export default Header;
