/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Carousel, message } from "antd";
import classNames from "classnames/bind";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import Collection from "../../Components/Collection/Collection";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/slice/productsSlice";

const cx = classNames.bind(styles);

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products); // lấy store chung redux

  useEffect(() => {
    dispatch(getAllProducts());  // dispatch action getallproduct từ redux thunk 
  }, []);

  const handleClick = () => {
    message.warning("Chức năng sẽ có trong tương lai !!!");
  };

  // const productFilter = products.reduce(
  //   function (r, item) {
  //     let current = r.hash[item.category];
  //     if (!current) {
  //       current = r.hash[item.category] = {
  //         category: item.category,
  //         subCategory: item.subCategory,
  //         items: [],
  //       };
  //       r.arr.push(current);
  //     }
  //     current.items.push({
  //       ...item,
  //     });
  //     return r;
  //   },
  //   { hash: {}, arr: [] }
  // ).arr;

  const productFilter = products.reduce(
    (prev, { category, subCategory, ...items }) => {
      const id = prev.findIndex((item) => item.category === category);
      id >= 0
        ? prev[id].items.push(items)
        : prev.push({ category, subCategory, items: [items] });
      return prev;
    },
    []
  );
  return (
    <div>
      <Header />
      <main className="minHeightBody">
        <section className={cx("sectionSlide")}>
          <div className="container">
            <Carousel>
              <Link to={"/collections/all-products"}>
                <img
                  src="https://file.hstatic.net/1000281824/file/2_77f94c36ebc94358af7d7d63a39e1d17.jpg"
                  alt="banner"
                />
              </Link>
            </Carousel>
          </div>
        </section>
        <section className={cx("promotion")}>
          <div className="container">
            <div className={cx("promotionBgroundWhite")}>
              <h2>ĐẶC QUYỀN CHO BẠN HÔM NAY!</h2>
              <div className={cx("listPromotion")}>
                <div className={cx("itemPromotion")}>
                  <div className={cx("itemInnerPromotion")}>
                    <div title="Giao hàng cứ để Xoài lo">
                      <span className={cx("title")}>
                        Giao hàng cứ để Xoài lo
                      </span>
                      <span className={cx("content")}>
                        Freeship cho hoá đơn mua hàng 1 triệu (không áp dụng với
                        các khuyến mãi khác)
                      </span>
                    </div>
                    <div className={cx("copycode")}>
                      <button
                        onClick={handleClick}
                        className={cx("buttonCopy")}
                      >
                        Sao chép mã
                      </button>
                    </div>
                  </div>
                </div>
                <div className={cx("itemPromotion")}>
                  <div className={cx("itemInnerPromotion")}>
                    <div title="Giao hàng cứ để Xoài lo">
                      <span className={cx("title")}>
                        Degrey giao hoả tốc tại Sài Gòn
                      </span>
                      <span className={cx("content")}>
                        Xoài bếu tặng ngay mã giảm giá phí ship. Áp dụng cho hoá
                        đơn 500.000 VNĐ
                      </span>
                    </div>
                    <div className={cx("copycode")}>
                      <button
                        onClick={handleClick}
                        className={cx("buttonCopy")}
                      >
                        Sao chép mã
                      </button>
                    </div>
                  </div>
                </div>
                <div className={cx("itemPromotion")}>
                  <div className={cx("itemInnerPromotion")}>
                    <div title="Giao hàng cứ để Xoài lo">
                      <span className={cx("title")}>Tặng 125.000đ</span>
                      <span className={cx("content")}>
                        Áp dụng đặc biệt cho đơn hàng từ 2,5 triệu đồng.
                      </span>
                    </div>
                    <div className={cx("copycode")}>
                      <button
                        onClick={handleClick}
                        className={cx("buttonCopy")}
                      >
                        Sao chép mã
                      </button>
                    </div>
                  </div>
                </div>
                <div className={cx("itemPromotion")}>
                  <div className={cx("itemInnerPromotion")}>
                    <div title="Giao hàng cứ để Xoài lo">
                      <span className={cx("title")}>Khuyến mãi đến 10%</span>
                      <span className={cx("content")}>
                        Mã giảm 10% cho hoá đơn mua hàng trên 5 triệu đồng
                      </span>
                    </div>
                    <div className={cx("copycode")}>
                      <button
                        onClick={handleClick}
                        className={cx("buttonCopy")}
                      >
                        Sao chép mã
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {productFilter.map((item, index) => (
          <Collection
            key={index}
            title={item.subCategory}
            href={item.category}
            items={item.items.slice(0, 10)}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
