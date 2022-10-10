/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Col, Row, Spin } from "antd";
import classNames from "classnames/bind";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineSortAscending } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { HiChevronDown } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Collection from "../../Components/Collection/Collection";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import styles from "./Products.module.scss";
import {
  getAllProductsRandom,
  getProductsByCategory,
  filterProducts,
} from "../../redux/slice/productsSlice";

const cx = classNames.bind(styles);
const Products = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [sortProducts, setSortProducts] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    const fetchingProducts = async () => {
      if (categoryId === "all-products") {
        const res = await dispatch(getAllProductsRandom());
        setProducts(res.payload);
        setAllProducts(res.payload);
        setCategory("Tất cả sản phẩm");
      } else {
        const res = await dispatch(getProductsByCategory(categoryId));
        setProducts(res.payload);
        setAllProducts(res.payload);
        const { subCategory } = res.payload.find((item) => item);
        setCategory(subCategory);
      }
    };
    fetchingProducts();
  }, [categoryId]);

  const values = [
    { id: "hot-product", text: "Sản phẩm nổi bật" },
    { id: "price-asc", text: "Giá: Tăng dần" },
    { id: "price-desc", text: "Giá: Giảm dần" },
    { id: "name-asc", text: "Tên: A-Z" },
    { id: "name-desc", text: "Tên: Z-A" },
    { id: "product-asc", text: "Cũ nhất" },
    { id: "product-desc", text: "Mới nhất" },
  ];

  const checkboxPrice = [
    { id: "under100000", title: "Dưới", decs: "100.000₫" },
    { id: "range:100000_250000", title: "", decs: "100.000₫ - 250.000₫" },
    { id: "range:250000_500000", title: "", decs: "250.000₫ - 500.000₫" },
    { id: "range:500000_800000", title: "", decs: "500.000₫ - 800.000₫" },
    { id: "on800000", title: "Trên ", decs: "800.000₫" },
  ];

  const checkboxSize = [
    { id: "s1", type: "checkbox", title: "S" },
    { id: "s2", type: "checkbox", title: "M" },
    { id: "s3", type: "checkbox", title: "L" },
    { id: "s4", type: "checkbox", title: "XS" },
  ];

  const checkboxColor = [
    {
      id: "c1",
      type: "checkbox",
      title: "Tím",
      value: "violet",
      bg: "#eb11eb",
    },
    {
      id: "c2",
      type: "checkbox",
      title: "Vàng",
      value: "yellow",
      bg: "#ffff05",
    },
    {
      id: "c3",
      type: "checkbox",
      title: "Cam",
      value: "orange",
      bg: "#f54105",
    },
    { id: "c4", type: "checkbox", title: "Hồng", value: "pink", bg: "#f23895" },
    { id: "c5", type: "checkbox", title: "Đen", value: "black", bg: "#000000" },
    { id: "c6", type: "checkbox", title: "Xám", value: "grey", bg: "#cccaca" },
    {
      id: "c7",
      type: "checkbox",
      title: "Trắng",
      value: "white",
      bg: "#fffcfc",
    },
    {
      id: "c8",
      type: "checkbox",
      title: "Xanh dương",
      value: "blue",
      bg: "#1757eb",
    },
    { id: "c9", type: "checkbox", title: "Xanh", value: "xanh", bg: "#099116" },
    {
      id: "c10",
      type: "checkbox",
      title: "Xanh lá",
      value: "green",
      bg: "#52ff52",
    },
  ];

  const handleChangeCheckbox = (id) => {
    setPrice((prev) => {
      const isChecked = price.includes(id);

      if (isChecked) {
        return price.filter((item) => item !== id);
      } else {
        return [id];
      }
    });
  };

  const handleChangeSize = (name) => {
    setSize((prev) => {
      const isChecked = size.includes(name);

      if (isChecked) {
        return size.filter((item) => item !== name);
      } else {
        return [name];
      }
    });
  };

  const handleChangeColor = (value) => {
    setColor((prev) => {
      const isChecked = color.includes(value);

      if (isChecked) {
        return color.filter((item) => item !== value);
      } else {
        return [value];
      }
    });
  };

  useEffect(() => {
    let obj = {};
    if (price.includes("under100000")) {
      obj = { lte: 100000, gte: 0 };
    } else if (price.includes("range:100000_250000")) {
      obj = { lte: 250000, gte: 100000 };
    } else if (price.includes("range:250000_500000")) {
      obj = { lte: 500000, gte: 250000 };
    } else if (price.includes("range:500000_800000")) {
      obj = { lte: 800000, gte: 500000 };
    } else if (price.includes("on800000")) {
      obj = { lte: 0, gte: 800000 };
    } else {
      obj = { lte: "", gte: "" };
    }

    let sort = {};

    if (sortProducts.includes("hot-product")) {
      sort = { name: "hot-product", value: "" };
    } else if (sortProducts.includes("price-asc")) {
      sort = { name: "price", value: 1 };
    } else if (sortProducts.includes("price-desc")) {
      sort = { name: "price", value: -1 };
    } else if (sortProducts.includes("name-asc")) {
      sort = { name: "title", value: 1 };
    } else if (sortProducts.includes("name-desc")) {
      sort = { name: "title", value: -1 };
    } else if (sortProducts.includes("product-asc")) {
      sort = { name: "createdAt", value: 1 };
    } else if (sortProducts.includes("product-desc")) {
      sort = { name: "createdAt", value: -1 };
    } else {
      sort = { name: "", value: "" };
    }

    (price.length > 0 || size.length > 0 || sortProducts.length > 0) &&
      (async () => {
        const res = await dispatch(
          categoryId === "all-products"
            ? filterProducts({ obj, size, sort })
            : filterProducts({ obj, size, categoryId, sort })
        );
        setProducts(res.payload);
      })();

    if (products.length === 0) setProducts(allProducts);
  }, [categoryId, dispatch, price, size, sortProducts]);

  const handleDeletePrice = () => {
    setPrice([]);
  };

  const handleDeleteColor = () => {
    setColor([]);
  };

  const handleDeleteSize = () => {
    setSize([]);
  };

  const handleDeleteAll = () => {
    setPrice([]);
    setColor([]);
    setSize([]);
  };

  return (
    <>
      <Header />
      <main className="minHeightBody">
        <Spin spinning={loading}>
          <div className={cx("layoutCollection")}>
            <div className={cx("breadcrumbShop")}>
              <div className="container">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to={"/"}>Trang chủ</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <span>{category ? category : "Tất cả sản phẩm"}</span>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
            <div className={cx("collectionBanner")}>
              <div className="container">
                <img
                  src="https://file.hstatic.net/1000281824/file/z3533341777412_f5edd4a273a3ef5093b6567f1acd7b0f_1d288245ef874e9fab99f73c62539549.jpg"
                  alt="TEE | TSHIRT"
                />
              </div>
            </div>
            <div className="wrapperMainContent">
              <div className={cx("collectionHeading")}>
                <div className="container">
                  <div className={cx("bgWhiteHeading")}>
                    <Row gutter={30}>
                      <Col md={18} xs={12}>
                        <h1 className={cx("title")}>
                          {category ? category : "Tất cả sản phẩm"}
                        </h1>
                      </Col>
                      <Col md={6} xs={12}>
                        <div className={cx("collectionFilterContainer")}>
                          <div className={cx("collectionSortByFilter")}>
                            <div className={cx("collectionSortBy")}>
                              <div className={cx("boxstyleMb")}>
                                <p className={cx("titleFilter")}>
                                  <span className={cx("iconFilter")}>
                                    <AiOutlineSortAscending
                                      className={cx("iconSort")}
                                    />
                                  </span>
                                  Sắp xếp
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className={cx("collectionSortByOption")}>
                            <ul className={cx("sortByContent")}>
                              {values.map((val) => (
                                <li
                                  onClick={() => setSortProducts(val.id)}
                                  className={
                                    sortProducts === val.id
                                      ? cx("active")
                                      : "inactive"
                                  }
                                  key={val.id}
                                >
                                  <span>{val.text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <div className={cx("collectionFilter")}>
                <div className="container">
                  <div className={cx("wrapperLayerFilter")}>
                    <div className={cx("layerFilterContainer")}>
                      <div className={cx("layerFilterTitle")}>
                        <p className={cx("layerTitleFilter")}>
                          <span className={cx("layerIconFilter")}>
                            <svg viewBox="0 0 20 20">
                              <path
                                fill="none"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                d="M12 9v8l-4-4V9L2 3h16z"
                              ></path>
                            </svg>
                          </span>
                          Bộ lọc
                        </p>
                      </div>
                      <div className={cx("layerFilterGroup")}>
                        <Row gutter={30}>
                          <Col md={6} sm={12} xs={12}>
                            <div className={cx("filterGroupBlock")}>
                              <div className={cx("filterGroupTitle")}>
                                <span>Lọc giá</span>
                                <div className={cx("iconControl")}>
                                  <HiChevronDown />
                                </div>
                              </div>
                              <div className={cx("filterGroupContent")}>
                                <ul className={cx("checkboxList")}>
                                  {checkboxPrice.map((item, index) => (
                                    <li key={index}>
                                      <input
                                        checked={price.includes(item.id)}
                                        onChange={() =>
                                          handleChangeCheckbox(item.id)
                                        }
                                        type="checkbox"
                                        id={item.id}
                                      />
                                      <label htmlFor={item.id}>
                                        <span>{item.title} </span>
                                        {item.decs}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col md={6} sm={12} xs={12}>
                            <div className={cx("filterGroupBlock")}>
                              <div className={cx("filterGroupTitle")}>
                                <span>Màu sắc</span>
                                <div className={cx("iconControl")}>
                                  <HiChevronDown />
                                </div>
                              </div>
                              <div
                                className={cx(
                                  "filterGroupContent",
                                  "filterColor"
                                )}
                              >
                                <ul className={cx("checkboxList")}>
                                  {checkboxColor.map((item, index) => (
                                    <li key={index}>
                                      <input
                                        checked={color.includes(item.title)}
                                        onChange={() =>
                                          handleChangeColor(item.title)
                                        }
                                        type={item.type}
                                        id={item.id}
                                      />
                                      <label
                                        htmlFor={item.id}
                                        style={{
                                          backgroundColor: `${item.bg}`,
                                        }}
                                      >
                                        {item.title}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col md={6} sm={12} xs={12}>
                            <div className={cx("filterGroupBlock")}>
                              <div className={cx("filterGroupTitle")}>
                                <span>Kích thước</span>
                                <div className={cx("iconControl")}>
                                  <HiChevronDown />
                                </div>
                              </div>
                              <div className={cx("filterGroupContent")}>
                                <ul className={cx("checkboxList")}>
                                  {checkboxSize.map((item, index) => (
                                    <li key={index}>
                                      <input
                                        checked={size.includes(item.title)}
                                        onChange={() =>
                                          handleChangeSize(item.title)
                                        }
                                        type={item.type}
                                        id={item.id}
                                      />
                                      <label htmlFor={item.id}>
                                        {item.title}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className={cx("layerFilterTags")}>
                      {price.length > 0 && (
                        <div
                          className={
                            price
                              ? cx("filterTags", "opened")
                              : cx("filterTags")
                          }
                        >
                          Lọc giá:{" "}
                          <b>
                            {checkboxPrice
                              .filter((item) =>
                                price.map((i) => i).includes(item.id)
                              )
                              .map((value, index, checkboxPrice) => (
                                <Fragment key={value.id}>
                                  {value.title && <span>{value.title} </span>}
                                  {index + 1 === checkboxPrice.length
                                    ? value.decs
                                    : value.decs + ", "}
                                </Fragment>
                              ))}
                          </b>
                          <span
                            className={cx("filterTagsRemove")}
                            onClick={handleDeletePrice}
                          >
                            <GrFormClose
                              style={{ fontSize: "20px", height: "100%" }}
                            />
                          </span>
                        </div>
                      )}
                      {color.length > 0 && (
                        <div
                          className={
                            color
                              ? cx("filterTags", "opened")
                              : cx("filterTags")
                          }
                        >
                          Màu sắc:{" "}
                          <b>
                            {color?.map((item, index) =>
                              index === 0 ? ` ${item}` : `, ${item}`
                            )}
                          </b>
                          <span
                            className={cx("filterTagsRemove")}
                            onClick={handleDeleteColor}
                          >
                            <GrFormClose
                              style={{ fontSize: "20px", height: "100%" }}
                            />
                          </span>
                        </div>
                      )}

                      {size.length > 0 && (
                        <div
                          className={
                            size ? cx("filterTags", "opened") : cx("filterTags")
                          }
                        >
                          Kích thước:{" "}
                          <b>
                            {size?.map((item, index) =>
                              index === 0 ? ` ${item}` : `, ${item}`
                            )}
                          </b>
                          <span
                            className={cx("filterTagsRemove")}
                            onClick={handleDeleteSize}
                          >
                            <GrFormClose
                              style={{ fontSize: "20px", height: "100%" }}
                            />
                          </span>
                        </div>
                      )}
                      {(price.length > 0 && size.length > 0) ||
                      (price.length > 0 && color.length > 0) ||
                      (size.length > 0 && color.length > 0) ? (
                        <div
                          className={cx(
                            "filterTags",
                            "filterTagRemoveAll",
                            "opened"
                          )}
                        >
                          <span onClick={handleDeleteAll}>Xóa hết </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {products.length === 0 && (
                    <Col md={24}>
                      <div className={cx("collectionNullProducts")}>
                        <p>Không tìm thấy kết quả. Vui lòng thử lại!</p>
                      </div>
                    </Col>
                  )}
                </div>
              </div>
              <Collection nameBtn={category} items={products} />
            </div>
          </div>
        </Spin>
      </main>
      <Footer />
    </>
  );
};

export default Products;
