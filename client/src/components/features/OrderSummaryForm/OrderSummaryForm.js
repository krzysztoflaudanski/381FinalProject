import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { getCart } from '../../../redux/cartRedux';

const OrderSummaryForm = () => {
  const cart = useSelector(getCart);
  const tokenData = JSON.parse(sessionStorage.getItem('authToken'));
  console.log(tokenData.client)

  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setOrderTotal(total);
  }, [cart]);

  return (
    <div>
      <h2>Order Summary</h2>
      <ListGroup>
        {cart.map((item) => (
          <ListGroup.Item key={item.id}>
            <Row>
              <Col xs={8}>{item.name}</Col>
              <Col xs={2}>{item.quantity} x {item.price}$</Col>
              <Col xs={2}>{item.quantity * item.price}$</Col>
            </Row>
            <Row>
                <Col>{item.comment}</Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="mt-3">
        <h4>Order Total: {orderTotal}$</h4>
      </div>

      <div className="mt-3">
        <h4>Shipping Address</h4>
        <p>
          {tokenData?.client.firstName} {tokenData?.client.lastName} <br />
          {tokenData?.client.address}
        </p>
      </div>

      <div className="mt-3">
        <h4>Order Comment</h4>
        <p>{cart.comment || 'No comment'}</p>
      </div>
    </div>
  );
};

export default OrderSummaryForm;