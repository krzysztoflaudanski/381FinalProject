import { useEffect } from "react";
import { useDispatch } from "react-redux";
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


function App() {

  const dispatch = useDispatch();

  const fetch = () => {
    dispatch(fetchAllProducts());
  }

  useEffect(() => fetch(), [fetch]);
  //useEffect(() => dispatch(fetchAllProducts()), [dispatch]);
  //dispatch(fetchAllProducts());

  return (
    <Container>
      <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/ad/:id" element={<Ad />} />
        <Route path="/ad/add" element={<AdAdd />} />
        <Route path="/ad/edit/:id" element={<Edit />} />
        <Route path="/ad/remove/:id" element={<Remove />} />
        <Route path="/search/:searchPhrase" element={<Search />} /> */}
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