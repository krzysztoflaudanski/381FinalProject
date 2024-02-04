import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { removeFromCart, updateCartItem } from '../../../redux/cartRedux';
import { saveCartToLocalStorage } from '../../../redux/cartRedux';

const CartForm = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(saveCartToLocalStorage(cart));
//   }, [cart]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateCartItem(productId, newQuantity));
  };

  const [itemComments, setItemComments] = useState({});

  const handleAddComment = (productId) => {
    // Dodaj komentarz do produktu
    const updatedComments = { ...itemComments };
    updatedComments[productId] = ''; // Początkowo komentarz jest pusty
    setItemComments(updatedComments);
  };

  const handleCommentChange = (productId, comment) => {
    // Zaktualizuj komentarz produktu
    const updatedComments = { ...itemComments };
    updatedComments[productId] = comment;
    setItemComments(updatedComments);
    dispatch(saveCartToLocalStorage(cart));
  };

  return (
    <div>
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
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value, 10))}
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
            <Row className='my-2'>
            <Col>
            <Form.Control
              type="text"
              value={itemComments[item.id] || ''}
              placeholder="Add comment"
              onChange={(e) => handleCommentChange(item.id, e.target.value)}
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={() => handleAddComment(item.id)}>Add Comment</Button>
          </Col>
            </Row>
            </div>
          ))}
          <Row>
            <Col>
              <Button variant="success" href="/order-summary">
                Go to Order Summary
              </Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default CartForm;