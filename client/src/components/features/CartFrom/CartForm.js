import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { removeFromCart, updateCartItem } from '../../../redux/cartRedux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const CartForm = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [login, setLogin] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
  console.log(itemComments)
  useEffect(() => {
    if (isAuthenticated) {
      setLogin(true)
    }
  }, [isAuthenticated])
  console.log(cart)
  // const initialFormVisibility = cart.reduce((acc, item) => {
  //   acc[item.id] = true;
  //   return acc;
  // }, {});
  
  // const [isFormVisible, setFormVisibility] = useState(initialFormVisibility);

  const [isFormVisible, setFormVisibility] = useState({});

  useEffect(() => {
    // Ustawienie początkowego stanu widoczności formularza na true dla produktów bez komentarzy
    const initialFormVisibility = cart.reduce((acc, item) => {
      // Jeśli cart.comment dla danego elementu jest pusty, ustaw true, w przeciwnym razie false
      acc[item.id] = !item.comment;
      return acc;
    }, {});
    setFormVisibility(initialFormVisibility);
  }, [cart]);



  return (
    <section id="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <Row >
                <Col>{item.name}</Col>
                <Col>
                  <Form.Control
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value), item.comment)}
                  />
                </Col>
                <Col>${item.price.toFixed(2)}</Col>
                <Col>${(item.price * item.quantity).toFixed(2)}</Col>
                <Col>
                  <Button onClick={() => handleRemoveFromCart(item.id)} variant="danger">
                    Remove
                  </Button>
                </Col>
              </Row>
              {/* {isFormVisible[item.id] ? (
        <Row className='my-2'>
          <Col>
            <Form.Control
              type="text"
              value={itemComments[item.id] || ''}
              placeholder="Add comment"
              onChange={(e) => setItemComments({ ...itemComments, [item.id]: e.target.value })}
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={handleAddComment}>
              Add Comment
            </Button>
          </Col>
        </Row>
      ) : (
        <Row className='my-2'>
          <Col>{itemComments[item.id]}</Col>
          <Col>
            <Button variant="primary" onClick={handleEditComment}>
              Edit Comment
            </Button>
          </Col>
        </Row>
      )} */}
              {isFormVisible[item.id]  ? (
                <Row className='my-2'>
                  <Col>
                    <Form.Control
                      type="text"
                      value={itemComments[item.id] || ''}
                      placeholder="Add comment"
                      onChange={(e) => setItemComments({ ...itemComments, [item.id]: e.target.value })}
                    />
                  </Col>
                  <Col>

                    <Button variant="primary" onClick={() => handleCommentChange(item.id, item.quantity, itemComments[item.id] || '')}>
                      Add Comment
                    </Button>

                  </Col> </Row>
              ) : (
                <Row className='my-2'>
                  <Col>
                    {item.comment}
                  </Col>
                  <Col>
                    <Button variant="primary" onClick={e => setFormVisibility({ ...isFormVisible, [item.id]: true })}>
                      Edit Comment
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          ))}
          <Row>
            <Col>
              <Button variant="success" onClick={() => handleSummary()}>
                Go to Order Summary
              </Button>
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
    </section>
  );
};

export default CartForm;


 {/* <Row className='my-2'>
                <Col>
                  <Form.Control
                    type="text"
                    value={itemComments[item.id] || ''}
                    placeholder="Add comment"
                    onChange={(e) => setItemComments({ ...itemComments, [item.id]: e.target.value })}
                  />
                </Col>
                <Col>
                  <Button variant="primary" onClick={() => handleCommentChange(item.id, item.quantity, itemComments[item.id] || '')}>
                    Add Comment
                  </Button>
                </Col>
              </Row> */}