import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchProduct } from "../../redux/slice/productsSlice";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import classNames from "classnames/bind";
import Collection from "../../Components/Collection/Collection";
import styles from "./ResultSearch.module.scss";

const cx = classNames.bind(styles);

const ResultSearch = () => {
  const [category, setCategory] = useState("");
  const search = useSelector((state) => state.products.searchProd);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchingApi = async () => {
      const res = await dispatch(searchProduct(location.search.split("=")[1]));
      const { subCategory } = res.payload.find((item) => item);
      setCategory(subCategory);
    };
    fetchingApi();
  }, []);

  return (
    <div>
      <Header />
      <main className="minHeightBody">
        <div className="container">
          <div className={cx("headerPage")}>
            <h1>Tìm kiếm</h1>
            <p>
              Có <strong>{search.length} sản phẩm</strong> cho tìm kiếm
            </p>
          </div>
          <div className={cx("wrapperBoxContent")}>
            <div className={cx("contentPage")}>
              <p className={cx("subTextResult")}>
                Kết quả tìm kiếm cho
                <strong> "{location.search.split("=")[1]}".</strong>
              </p>
            </div>
            <Collection nameBtn={category} items={search} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultSearch;
