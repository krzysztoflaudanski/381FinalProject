import { useSelector, useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { IMGS_URL } from "../../../config";
import styles from "./AllProducts.module.scss";
import { getAllProducts } from "../../../redux/productsRedux";
import { } from "react-redux";
import { addToCart } from "../../../redux/cartRedux";
import { saveCartToLocalStorage } from "../../../redux/cartRedux";
import { useEffect } from "react";


const AllProducts = () => {

  const products = useSelector(getAllProducts)
  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch();

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  //   const updatedCart = [...cart];
  //   dispatch(saveCartToLocalStorage(updatedCart));
  // };

  useEffect(() => {
    dispatch(saveCartToLocalStorage(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (<section id="allProducts">

    <Row>{products.map(pro => (
      <Col key={pro.id} className="col-lg-4">
        <Card className="mr-2 mb-3" style={{ width: '20rem' }}>
          <Card.Body  >
            <Card.Title className={styles.title}>{pro.name}</Card.Title>
            <Stack direction="horizontal" gap={1}>
              <Card.Subtitle className='mt-0'>Price:
              </Card.Subtitle>
              <Card.Text>
                {pro.price} $
              </Card.Text>
            </Stack>
            <Stack className="pr-2 py-2">
              <div><Card.Img className={styles.img} variant="top" src={IMGS_URL + 'image.jpg'} alt={pro.name} /></div>
            </Stack>
            <NavLink to={`/product/${pro.id}`}>
              <Button variant="primary" className="m-2">Read more</Button>
            </NavLink>
            <Button variant="primary" className="m-2" onClick={() => handleAddToCart(pro)}>Add to cart</Button>

          </Card.Body>
        </Card></Col>))}
    </Row>

  </section>)
}

export default AllProducts;