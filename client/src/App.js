import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "./redux/productsRedux";


function App() {

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchAllProducts()), [dispatch]);


  return (
    <div>hihi</div>
  );
}

export default App;
