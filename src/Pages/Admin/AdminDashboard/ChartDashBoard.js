import classNames from "classnames/bind";
import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import styles from "./DashBoard.module.scss";

const cx = classNames.bind(styles);
export default function ChartDashBoard() {
  const income = useSelector((state) => state.orders.income);

  const month = income
    ?.map((item) => `Tháng ${item._id}`)
    .sort((a, b) => a.split(" ")[1] - b.split(" ")[1]);

  const data = income?.map((item) => item.total).sort((a, b) => a - b);

  const chartOptions = {
    series: [
      {
        name: "Monthly bill",
        data: data,
      },
    ],
    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: month,
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };

  return (
    <div className={cx("dashboard-middle-chart")}>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="line"
        width="500"
      />
    </div>
  );
}
