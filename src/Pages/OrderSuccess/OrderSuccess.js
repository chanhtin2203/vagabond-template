/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CheckOutlined, FrownOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./OrderSuccess.module.scss";
import { deleteAllCart } from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Utils/BaseUrl";
import { createAxios } from "../../Utils/createInstance";
import { loginSuccess } from "../../redux/slice/authSlice";

const cx = classNames.bind(styles);

export default function OrderSuccess() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login);
  const [error, setError] = useState({});

  useEffect(() => {
    const getResultVNPay = async () => {
      let axiosJWT = createAxios(user, dispatch, loginSuccess);
      const query = location.search;
      const { data } = await axiosJWT.get(
        `${BASE_URL}/payment/vnpay_return${query}`,
        {
          headers: { token: `Beaer ${user?.accessToken}` },
        }
      );
      setError(data);
      if (data.code === "00") {
        await axiosJWT.get(`${BASE_URL}/payment/vnpay_ipn${query}`, {
          headers: { token: `Beaer ${user?.accessToken}` },
        });
        dispatch(deleteAllCart());
      }
    };

    getResultVNPay();
  }, []);
  return (
    <>
      {error.code === "24" ? (
        <section id={cx("order-error")}>
          <div className={cx("order-error")}>
            <span>
              <FrownOutlined />
            </span>
            <p>Đặt hàng không thành công</p>
            {/* <Link to="">OK</Link> */}
            <div className={cx("links")}>
              <Link to="/checkoutPayment">Xem lại hóa đơn</Link>
              <Link to="/">Trang chủ</Link>
            </div>
          </div>
        </section>
      ) : (
        <section id={cx("order-success")}>
          <div className={cx("order-success")}>
            <span>
              <CheckOutlined />
            </span>
            <p>Đặt hàng thành công</p>
            {/* <Link to="">OK</Link> */}
            <div className={cx("links")}>
              <Link to="/orders">Xem lại đơn hàng</Link>
              <Link to="/">Trang chủ</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
