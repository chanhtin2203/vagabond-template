import { Breadcrumb, Col, Row } from "antd";
import classNames from "classnames/bind";
import React, { Fragment, useState } from "react";
import { AiOutlineSortAscending } from "react-icons/ai";
import { HiChevronDown } from "react-icons/hi";
import { GrFormClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import styles from "./Products.module.scss";
import Collection from "../../Components/Collection/Collection";

const cx = classNames.bind(styles);
const Products = () => {
  const [price, setPrice] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [activeId, setActiveId] = useState(1);

  const values = [
    { id: 1, text: "Sản phẩm nổi bật" },
    { id: 2, text: "Giá: Tăng dần" },
    { id: 3, text: "Giá: Giảm dần" },
  ];

  const checkboxPrice = [
    { id: "p1", type: "checkbox", title: "Dưới ", decs: "100.000₫" },
    { id: "p2", type: "checkbox", title: "", decs: "100.000₫ - 250.000₫" },
    { id: "p3", type: "checkbox", title: "", decs: "250.000₫ - 500.000₫" },
    { id: "p4", type: "checkbox", title: "", decs: "500.000₫ - 800.000₫" },
    { id: "p5", type: "checkbox", title: "Trên ", decs: "800.000₫" },
  ];

  const checkboxSize = [
    { id: "s1", type: "checkbox", title: "S" },
    { id: "s2", type: "checkbox", title: "M" },
    { id: "s3", type: "checkbox", title: "L" },
    { id: "s4", type: "checkbox", title: "XS" },
  ];

  const checkboxColor = [
    { id: "c1", type: "checkbox", value: "Tím", bg: "#eb11eb" },
    { id: "c2", type: "checkbox", value: "Vàng", bg: "#ffff05" },
    { id: "c3", type: "checkbox", value: "Cam", bg: "#f54105" },
    { id: "c4", type: "checkbox", value: "Hồng", bg: "#f23895" },
    { id: "c5", type: "checkbox", value: "Đen", bg: "#000000" },
    { id: "c6", type: "checkbox", value: "Xám", bg: "#cccaca" },
    { id: "c7", type: "checkbox", value: "Trắng", bg: "#fffcfc" },
    { id: "c8", type: "checkbox", value: "Xanh dương", bg: "#1757eb" },
    { id: "c9", type: "checkbox", value: "Xanh", bg: "#099116" },
    { id: "c10", type: "checkbox", value: "Xanh lá", bg: "#52ff52" },
  ];

  const handleChangeCheckbox = (id) => {
    setPrice((prev) => {
      const isChecked = price.includes(id);

      if (isChecked) {
        return price.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleChangeSize = (name) => {
    setSize((prev) => {
      const isChecked = size.includes(name);

      if (isChecked) {
        return size.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const handleChangeColor = (value) => {
    setColor((prev) => {
      const isChecked = color.includes(value);

      if (isChecked) {
        return color.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

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
        <div className={cx("layoutCollection")}>
          <div className={cx("breadcrumbShop")}>
            <div className="container">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={"/"}>Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span>TEE | TSHIRT</span>
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
                      <h1 className={cx("title")}>TEE | TSHIRT</h1>
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
                                onClick={() => setActiveId(val.id)}
                                className={
                                  activeId === val.id
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
                                      type={item.type}
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
                                      checked={color.includes(item.value)}
                                      onChange={() =>
                                        handleChangeColor(item.value)
                                      }
                                      type={item.type}
                                      id={item.id}
                                    />
                                    <label
                                      htmlFor={item.id}
                                      style={{ backgroundColor: `${item.bg}` }}
                                    >
                                      {item.value}
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
                          price ? cx("filterTags", "opened") : cx("filterTags")
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
                          color ? cx("filterTags", "opened") : cx("filterTags")
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
              </div>
            </div>
            <Collection nameBtn={"BACKPACKS | BALO"} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
