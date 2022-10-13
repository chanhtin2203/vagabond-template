import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SearchProd.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../redux/slice/productsSlice";
import useDebounce from "../../Hooks/useDebounce";

const cx = classNames.bind(styles);

const SearchProd = ({ setModalSearch }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const product = useSelector((state) => state.products.products);

  const result = product.map((value) => ({
    category: value.category,
    subCategory: value.subCategory,
  }));

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  const category = getUniqueListBy(result, "category");

  const debounceValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const fetchingSearch = async () => {
      if (!debounceValue.trim()) {
        setResultSearch([]);
        return;
      }
      const res = await dispatch(searchProduct(debounceValue));
      setResultSearch(res.payload);
    };
    fetchingSearch();
  }, [debounceValue, dispatch]);

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
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </form>
          <div
            className={cx("smartSearchWrapper")}
            style={{ display: "block" }}
          >
            <div className={cx("resultsContent")}>
              {resultSearch.slice(0, 5).map((item) => (
                <div key={item._id}>
                  <div className={cx("itemUlt")}>
                    <div className={cx("thumbs")}>
                      <Link to={`/products/${item._id}`}>
                        <img alt={item.title} src={item.image} />
                      </Link>
                    </div>
                    <div className={cx("title")}>
                      <Link to={`/products/${item._id}`}> {item.title}</Link>
                      <p>{item.price}₫</p>
                    </div>
                  </div>
                </div>
              ))}
              {resultSearch.length > 5 && (
                <div className={cx("resultMore", "resultMoreDesktop")}>
                  <Link to={`/products?search=${debounceValue}`}>
                    Xem thêm {resultSearch.length - 5} sản phẩm
                  </Link>
                </div>
              )}
              {debounceValue && resultSearch.length === 0 && (
                <p className={cx("dataEmpty")}>Không có sản phẩm nào...</p>
              )}
            </div>
            <div className={cx("searchSuggest", "showSuggest")}>
              <p>Gợi ý cho bạn:</p>
              <ul>
                {category.map((cat, index) => (
                  <li key={index}>
                    <Link
                      to={`/collections/${cat.category}`}
                      onClick={() => setModalSearch(false)}
                    >
                      {cat.subCategory}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
