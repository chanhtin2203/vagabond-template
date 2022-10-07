/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Spin } from "antd";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Collection.module.scss";

const cx = classNames.bind(styles);

const Collection = ({ title, nameBtn, items, href }) => {
  const loading = useSelector((state) => state.products.isLoading);
  const [limit, setLimit] = useState(30);

  return (
    <Spin spinning={loading}>
      <section className={cx("collectionWrapper")}>
        <div className="container">
          {title && (
            <div className={cx("collectionHeading")}>
              <h2 className={cx("collectionTitle")}>
                <Link to={`/collections/${href}`}>{title}</Link>
              </h2>
              <Link to={`/collections/${href}`}>Xem tất cả</Link>
            </div>
          )}
          <div className={cx("collectionContent")}>
            <div className={cx("wrapperProducts")}>
              <div className={cx("listProductRow")}>
                {items?.slice(0, limit).map((item) => (
                  <Col
                    data-aos="fade-up"
                    className={cx("productsLoop", "flex5Col")}
                    key={item._id}
                  >
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
                                  <img src={item.image} alt={item.title} />
                                </picture>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className={cx("productsDetail")}>
                        <h3>
                          <Link to={item._id}>{item.title}</Link>
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
                  </Col>
                ))}
              </div>
            </div>
            {title && (
              <div className={cx("wrapperBtn")}>
                <Link to={`/collections/${href}`} className={cx("button")}>
                  Xem thêm sản phẩm
                  <b> {title} </b>
                </Link>
              </div>
            )}
          </div>
          {nameBtn && items.length > limit && (
            <div className={cx("collectionLoadmore")}>
              <a
                className={cx("btnLoadmore", "button")}
                onClick={() => setLimit(limit + 30)}
              >
                Xem thêm sản phẩm
                <b> {nameBtn}</b>
              </a>
            </div>
          )}
        </div>
      </section>
    </Spin>
  );
};

export default Collection;
