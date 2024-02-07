import { useSelector, useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { IMGS_URL } from "../../../config";
import styles from "./AllProducts.module.scss";
import { getAllProducts } from "../../../redux/productsRedux";
import { } from "react-redux";
import { addToCart } from "../../../redux/cartRedux";

const AllProducts = () => {

  const products = useSelector(getAllProducts)

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (<section id="allProducts">
    <Row xs={1} sm={2} md={3} lg={4}>
      {products.map(pro => (
        <Col key={pro.id} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Card.Title className={styles.title}>{pro.name}</Card.Title>
              <Card.Subtitle className='mt-0 my-1'>Price: {pro.price} $</Card.Subtitle>
              <div className="mb-2">
                <Card.Img className={styles.img} variant="top" src={IMGS_URL + 'image.jpg'} alt={pro.name} />
              </div>
              <NavLink to={`/product/${pro.id}`}>
                <Button variant="primary" className="m-2">Read more</Button>
              </NavLink>
              <Button variant="primary" className="m-2" onClick={() => handleAddToCart(pro)}>Add to cart</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

  </section>)
}

export default AllProducts;