/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import styles from "./DashBoard.module.scss";
import ChartDashBoard from "./ChartDashBoard";
import classNames from "classnames/bind";
import { createAxios } from "../../../Utils/createInstance";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { getIncomeOrders } from "../../../redux/slice/orderSlice";

const cx = classNames.bind(styles);

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login);

  useEffect(() => {
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    (async () => {
      await dispatch(
        getIncomeOrders({
          accessToken: user?.accessToken,
          axiosJWT,
        })
      );
    })();
  }, []);

  return (
    <section id={cx("dashboard")}>
      <div className={cx("dashboard")}>
        <div className={cx("dashboard-middle")}>
          <div className={cx("dashboard-middle-statistic")}>
            <div className={cx("dashboard-middle-statistic-content")}>
              <li>
                <div className={cx("dashboard-middle-statistic-icon")}>
                  <ShoppingOutlined />
                </div>
                <div className={cx("dashboard-middle-statistic-title")}>
                  <span className={cx("total")}>1666</span>
                  <span className={cx("title")}>Tổng doanh số</span>
                </div>
              </li>
            </div>
            <div className={cx("dashboard-middle-statistic-content")}>
              <li>
                <div className={cx("dashboard-middle-statistic-icon")}>
                  <ShoppingCartOutlined />
                </div>
                <div className={cx("dashboard-middle-statistic-title")}>
                  <span className={cx("total")}>25</span>
                  <span className={cx("title")}>Lượt truy cập hàng ngày</span>
                </div>
              </li>
            </div>
            <div className={cx("dashboard-middle-statistic-content")}>
              <li>
                <div className={cx("dashboard-middle-statistic-icon")}>
                  <DollarCircleOutlined />
                </div>
                <div className={cx("dashboard-middle-statistic-title")}>
                  <span className={cx("total")}>2000</span>
                  <span className={cx("title")}>Tổng thu nhập</span>
                </div>
              </li>
            </div>
            <div className={cx("dashboard-middle-statistic-content")}>
              <li>
                <div className={cx("dashboard-middle-statistic-icon")}>
                  <FileTextOutlined />
                </div>
                <div className={cx("dashboard-middle-statistic-title")}>
                  <span className={cx("total")}>1208</span>
                  <span className={cx("title")}>Tổng số đơn hàng</span>
                </div>
              </li>
            </div>
          </div>
          <ChartDashBoard></ChartDashBoard>
        </div>

        <div className={cx("dashboard-new")}>
          <div className={cx("dashboard")}></div>
        </div>
      </div>
    </section>
  );
}
