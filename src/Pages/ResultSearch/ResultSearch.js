import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchProduct } from "../../redux/slice/productsSlice";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const ResultSearch = () => {
  const search = useSelector((state) => state.products.searchProd);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchProduct(location.search.split("=")[1]));
  }, []);
  return (
    <div>
      <Header />
      <main className="minHeightBody">
        
      </main>
      <Footer />
    </div>
  );
};

export default ResultSearch;
