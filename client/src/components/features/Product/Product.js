import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Navigate } from 'react-router-dom';
import { IMGS_URL } from "../../../config";
import styles from "./Product.module.scss";
import { addToCart } from "../../../redux/cartRedux";
import { Card, ListGroup, Button, Carousel, Col, Row } from 'react-bootstrap';
import { memoizedGetProductById } from "../../../redux/productsRedux";

const Product = () => {
    const { id } = useParams()


    //const product = useSelector(state => getProductById(state, id) || {})
    const product = useSelector(state => memoizedGetProductById(state, id));
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const photosArray = (product && product.photos) ? product.photos.split(',').map(photo => photo.trim()) : [];

    if (!product) return <Navigate to="/" />
    else

        return (<article>
            <Row className="mx-auto">
                <Col className="my-auto mx-auto" xl={3} md={5} sm={12}><Carousel style={{ maxWidth: '280px' }}>
                    {photosArray.map((photo, index) => (
                        <Carousel.Item key={index}>
                            <div>
                                <Card.Img
                                    className={styles.img}
                                    variant="top"
                                    src={IMGS_URL + photo}
                                    alt={product.name}
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                </Col>
                <Col xl={9} md={7} sm={12}>
                    <Card className="my-2" style={{ minWidth: '280px' }} border={0}>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Price: {product.price} $</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <NavLink to={"/"}>  <Button className="m-2" variant="primary" >Back</Button></NavLink>

                            <Card.Link className="px-2"><Button className="m-2" variant="primary" onClick={() => handleAddToCart(product)}>Add to cart</Button></Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </article>
        )
}

export default Product

