import React from "react";
import classNames from "classnames/bind";
import styles from "./Collection.module.scss";
import { Link } from "react-router-dom";
import { Col } from "antd";

const cx = classNames.bind(styles);

const Collection = ({ title, nameBtn }) => {
  return (
    <section className={cx("collectionWrapper")}>
      <div className="container">
        {title && (
          <div className={cx("collectionHeading")}>
            <h2 className={cx("collectionTitle")}>
              <Link to={"/backpacks"}>{title}</Link>
            </h2>
            <Link to={"/backpacks"}>Xem tất cả</Link>
          </div>
        )}
        <div className={cx("collectionContent")}>
          <div className={cx("wrapperProducts")}>
            <div className={cx("listProductRow")}>
              <Col className={cx("productsLoop", "flex5Col")}>
                <div className={cx("productInner")} style={{ height: "313px" }}>
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
                      <Link to={"/"}>Degrey Leather Basic Balo - LBB</Link>
                    </h3>
                    <p className={cx("productPrice")}>
                      <span className={cx("price")}>390,000₫</span>
                    </p>
                  </div>
                </div>
              </Col>
              <Col className={cx("productsLoop", "flex5Col")}>
                <div className={cx("productInner")} style={{ height: "313px" }}>
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
                                src="https://product.hstatic.net/1000281824/product/z3448826597830_67f0c8a438c2dc5b39feb4d80eca47bf_61a521c030384a9c8bee8ff40137cb56_large.jpg"
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
                      <Link to={"/"}>Degrey Leather Basic Balo - LBB</Link>
                    </h3>
                    <p className={cx("productPrice")}>
                      <span className={cx("price")}>390,000₫</span>
                    </p>
                  </div>
                </div>
              </Col>
            </div>
          </div>
          {title && (
            <div className={cx("wrapperBtn")}>
              <Link to={"/backpack"} className={cx("button")}>
                Xem thêm sản phẩm
                <b> {title} </b>
              </Link>
            </div>
          )}
        </div>
        {nameBtn && (
          <div className={cx("collectionLoadmore")}>
            <a href="#/" className={cx("btnLoadmore", "button")}>
              Xem thêm sản phẩm
              <b> {nameBtn}</b>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Collection;
