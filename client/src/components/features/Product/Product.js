import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink, Navigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { IMGS_URL } from "../../../config";
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import styles from "./Product.module.scss";
import { getProductById } from "../../../redux/productsRedux";
import { addToCart } from "../../../redux/cartRedux";


const Product = () => {
    const { id } = useParams()
    const product = useSelector(state => getProductById(state, id) || {})

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
      dispatch(addToCart(product));
    };

  
    if (!product) return <Navigate to="/" />
     else return (<article>
         <Card className="mx-auto" style={{ minWidth: '300px', maxWidth: '800px' }} border="">
        <div><Card.Img className={styles.img} variant="top" src={IMGS_URL + 'image.jpg'} alt={product.name} /></div>
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
                <NavLink to={"/"}>  <Card.Link><Button className="m-2" variant="primary" >Back</Button></Card.Link></NavLink>

                <Card.Link className="px-2"><Button className="m-2" variant="primary" onClick={() => handleAddToCart(product)}>Add to cart</Button></Card.Link>
            </Card.Body>
            
        </Card>





        {/* <Card className="mx-auto" style={{ minWidth: '300px', maxWidth: '800px' }} border="light">
        <Card.Body>
            <Stack direction="horizontal" gap={2} className='mb-4'>
                <Card.Title className='mb-0' ><h2>{adData.title}</h2></Card.Title>
            </Stack>
            <Stack direction="horizontal" gap={1}>
                <Card.Subtitle className='my-auto'>Author:
                </Card.Subtitle>
                <Card.Text className='my-auto'>
                    {adData.author}
                </Card.Text>
            </Stack>
            <Stack direction="horizontal" gap={1}>
                <Card.Subtitle className='my-auto'>Published:
                </Card.Subtitle>
                <Card.Text className='my-auto' >
                    {formatShortDate(adData.publicationDate)}
                </Card.Text>
            </Stack>
            <Stack direction="horizontal" gap={1}>
                <Card.Subtitle className='my-auto'>Description:
                </Card.Subtitle>
                <Card.Text className='my-auto'>
                    {adData.content}
                </Card.Text>
            </Stack>
            <Card.Text>
                {adData.shortDescription}
            </Card.Text>
            <Card.Text dangerouslySetInnerHTML={{ __html: adData.content }}>
            </Card.Text>
            <NavLink to={"/ad/edit/" + adData._id} className='ms-auto'>
                    <Button variant="outline-info" >Edit</Button>
                </NavLink>
                <Button variant="outline-danger" onClick={handleShow}>Delete</Button>
        </Card.Body>
    </Card> */}
        {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>This operation will completely remove this ad from app.<p> Are you sure, you want to do that</p></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleRemove}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal> */}
    </article>
    )
}

export default Product

