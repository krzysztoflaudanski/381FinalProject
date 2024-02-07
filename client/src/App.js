import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "./redux/productsRedux";
import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/views/Header/Header";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login"
import Register from "./components/pages/Register/Register";
import NotFound from "./components/views/NotFound/NotFound";
import Footer from "./components/views/Footer/Footer";
import { AuthProvider } from "./components/features/AuthContext/AuthContext";
import Logout from "./components/features/Logout/Logout";
import Product from "./components/features/Product/Product";
import { saveCartToLocalStorage } from "./redux/cartRedux";
import Cart from "./components/pages/Cart/Cart";
import OrderSummary from "./components/pages/OrderSummary/OrderSummary";

function App() {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const fetch = () => {
    dispatch(fetchAllProducts());
  }

  useEffect(() => fetch(), [fetch]);

  useEffect(() => {
    dispatch(saveCartToLocalStorage(cart));
  }, [cart, dispatch]);

  return (
    <Container>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Container>
  );
}

export default App;