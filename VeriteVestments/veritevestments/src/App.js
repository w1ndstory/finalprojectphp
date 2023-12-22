import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import CardProduct from "./pages/cardProduct";
import Category from "./pages/category";
import DeliveryPayment from "./pages/delivery_payment";
import Contact from "./pages/contact";
import Cart from "./pages/cart";
import ProductDetails from "./pages/catalog_details/[id]";
import OrderManage from "./pages/admin/aOrder";
import CountryManage from "./pages/admin/aCountry";
import CategoryManage from "./pages/admin/aCategory";
import ProductManage from "./pages/admin/aProducts";
import Layout from "./components/layout/layout";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardProduct" element={<CardProduct />} />
          <Route path="/category" element={<Category />} />
          <Route path="/delivery_payment" element={<DeliveryPayment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:id" element={<ProductDetails />} />
          <Route path="/manage_order" element={<OrderManage/>}/>
          <Route path="/manage_country" element={<CountryManage/>}/>
          <Route path="/manage_category" element={<CategoryManage/>}/>
          <Route path="/manage_product" element={<ProductManage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
