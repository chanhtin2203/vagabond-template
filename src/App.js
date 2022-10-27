import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
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
import Users from "./Pages/Users/Users";
import HeaderAdmin from "./Pages/Admin/Components/HeaderAdmin/HeaderAdmin";
import AdminDashboard from "./Pages/Admin/AdminDashboard/AdminDashboard";
import AdminUser from "./Pages/Admin/AdminUser/AdminUser";
import AdminProducts from "./Pages/Admin/AdminProducts/AdminProducts";
function App() {
  const user = useSelector((state) => state.auth.login);

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
        <Route path="/users" element={<Users />} />
        <Route path="/orderSuccess" element={<OrderSuccess />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<ErrorPage />} />

        {user?.admin && (
          <>
            <Route path="/admin" element={<HeaderAdmin />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUser />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element />
              <Route path="payment" element />
            </Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
