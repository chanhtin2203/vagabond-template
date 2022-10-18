import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Products from "./Pages/Products/Products";
import Product from "./Pages/Product/Product";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import Checkout from "./Pages/Checkout/Checkout";
import Register from "./Pages/Register/Register";
import ScrollToTop from "./Hooks/useScrollToTop";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import ResultSearch from "./Pages/ResultSearch/ResultSearch";
import Orders from "./Pages/Orders/Orders";
import OrderSuccess from "./Pages/OrderSuccess/OrderSuccess";
function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/:categoryId" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ResultSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkouts" element={<Checkout />} />
        <Route path="/checkoutPayment" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orderSuccess" element={<OrderSuccess />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
