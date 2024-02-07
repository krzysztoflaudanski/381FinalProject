import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { removeFromCart, updateCartItem } from '../../../redux/cartRedux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import styles from './CartForm.module.scss'

const CartForm = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [login, setLogin] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity, comment) => {
    dispatch(updateCartItem(productId, newQuantity, comment));
  };

  const [itemComments, setItemComments] = useState({});

  const handleCommentChange = (productId, quantity, comment) => {

    dispatch(updateCartItem(productId, quantity, comment));
    setFormVisibility({ ...isFormVisible, [productId]: false });
  };

  const handleSummary = () => {
    if (login) {
      navigate('../order-summary')
    } else {
      setShowModal(true)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      setLogin(true)
    }
  }, [isAuthenticated])

  const [isFormVisible, setFormVisibility] = useState({});

  useEffect(() => {
    const initialFormVisibility = cart.reduce((acc, item) => {
      acc[item.id] = !item.comment;
      return acc;
    }, {});
    setFormVisibility(initialFormVisibility);
  }, [cart]);

  const totalAmount = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0).toFixed(2);

  return (
    <section id="cart">
      <Row className='mx-1'><h2>Your Cart</h2></Row>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <Row className='mx-1'>
                <Col xs={6} sm={4} className={`my-1 ${styles.name}`}>
                  {item.name}
                </Col>
                <Col xs={6} sm={2} className='my-1'>
                  <Form.Control
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value), item.comment)}
                  />
                </Col>
                <Col xs={3} sm={2} className='my-1'>
                  ${item.price.toFixed(2)}
                </Col>
                <Col xs={3} sm={2} className='my-1'>
                  ${(item.price * item.quantity).toFixed(2)}
                </Col>
                <Col xs={6} sm={2} className='my-1'>
                  <Button onClick={() => handleRemoveFromCart(item.id)} variant="danger">
                    Remove
                  </Button>
                </Col>
              </Row>
              {isFormVisible[item.id] ? (
                <Row className='mx-1'>
                  <Col xs={12} sm={8} className='my-1'>
                    <Form.Control
                      type="text"
                      value={itemComments[item.id] || ''}
                      placeholder="Add comment"
                      onChange={(e) => setItemComments({ ...itemComments, [item.id]: e.target.value })}
                    />
                  </Col>
                  <Col xs={12} sm={4} className='my-1'>
                    <Button variant="primary" onClick={() => handleCommentChange(item.id, item.quantity, itemComments[item.id] || '')}>
                      Add Comment
                    </Button>
                  </Col>
                </Row>
              ) : (
                <Row className='mx-1'>
                  <Col xs={12} sm={8} className='my-1'>
                    {item.comment}
                  </Col>
                  <Col xs={12} sm={4} className='my-1'>
                    <Button variant="primary" onClick={e => setFormVisibility({ ...isFormVisible, [item.id]: true })}>
                      Edit Comment
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          ))}
          <Row className='m-1' >
            <Col xs={6} sm={8}>
              <Button variant="success" onClick={() => handleSummary()}>
                Order Summary
              </Button>
            </Col>
          </Row>
          <Row className='mx-1'>
            <Col xs={6} sm={4} className='my-1'>
              <strong>Total: ${totalAmount}</strong>
            </Col>
          </Row>
        </>
      )}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please login first</Modal.Body>
        <Modal.Footer>
          <Nav.Link as={NavLink} to="../login"><Button variant="primary">
            Login
          </Button></Nav.Link>
          <Nav.Link as={NavLink} to="/register"><Button variant="primary">
            Register
          </Button></Nav.Link>
        </Modal.Footer>
      </Modal>
    </section>)
}

export default CartForm;