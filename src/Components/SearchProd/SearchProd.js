import React from "react";
import classNames from "classnames/bind";
import styles from "./SearchProd.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const SearchProd = ({ setModalSearch }) => {
  return (
    <div className={cx("headerWrapSearch")}>
      <div className={cx("headerSearch")}>
        <div className={cx("searchBox")}>
          <form className={cx("searchFormProduct")}>
            <button className={cx("btnSearch", "btn")}>
              <svg height="30px" width="30px" viewBox="0 0 24 24">
                <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z"></path>
              </svg>
            </button>
            <div className={cx("searchInner")}>
              <input type="hidden" name="type" value="product" />
              <input
                type="text"
                className={cx("inputSearch")}
                placeholder="Tìm kiếm sản phẩm..."
                size={20}
                name="q"
                autoComplete="off"
                maxLength={40}
                required
              />
            </div>
          </form>
          <div
            className={cx("smartSearchWrapper")}
            style={{ display: "block" }}
          >
            <div className={cx("resultsContent")}>
              <div className={cx("itemUlt")}>
                <div className={cx("thumbs")}>
                  <Link to={"#"}>
                    <img
                      alt="Áo Xoài YangHo - AXYH"
                      src="//product.hstatic.net/1000281824/product/600_19d98a89c2f04fd4872208e3725dd86e_compact.jpg"
                    />
                  </Link>
                </div>
                <div className={cx("title")}>
                  <Link to={"#"}> Áo Xoài YangHo - AXYH</Link>
                  <p>250,000₫</p>
                </div>
              </div>
              <div className={cx("resultMore", "resultMoreDesktop")}>
                <Link to={"#"}>Xem thêm 66 sản phẩm</Link>
              </div>
              {/* <p className={cx("dataEmpty")}>Không có sản phẩm nào...</p> */}
            </div>
            {/* <div className={cx("searchSuggest", "showSuggest")}>
              <p>Gợi ý cho bạn:</p>
              <ul>
                <li className={cx("item")}>
                  <Link to={"/"}>ÁO | CLOTHES</Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <button
        className={cx("closeSearch")}
        onClick={() => {
          setModalSearch(false);
        }}
      >
        <span>
          <svg fill="#111" height="30px" width="30px" viewBox="0 0 24 24">
            <path d="M15.04 12L24 2.96 21.04 0 12 8.96 3.04 0 0 2.96 9.04 12 0 20.96 3.04 24 12 14.96 21.04 24 24 20.96z"></path>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default SearchProd;
