import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Products from "./Pages/Products/Products";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/backpacks" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
