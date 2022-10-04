import React from "react";
import classNames from "classnames/bind";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./ErrorPage.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const ErrorPage = () => {
  return (
    <div>
      <Header />
      <main className="minHeightBody">
        <div className="container">
          <div className={cx("contentPageNot")}>
            <h1>
              <span>404</span>Không tìm thấy trang
            </h1>
            <p className={cx("subtext")}>
              Trang bạn đang tìm kiếm có thể đã bị xóa, chuyển đi, thay đổi link
              hoặc chưa bao giờ tồn tại.
            </p>
            <p>
              <Link to={"/"} className={cx("button")}>
                TRỞ VỀ TRANG CHỦ
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;
