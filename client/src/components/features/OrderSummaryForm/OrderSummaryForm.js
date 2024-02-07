import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Alert, Spinner } from 'react-bootstrap';
import { clearCart, getCart } from '../../../redux/cartRedux';
import axios from 'axios';
import { API_URL } from '../../../config';
import { NavLink } from 'react-router-dom';
import { addOrder } from '../../../redux/orderRedux';

const OrderSummaryForm = () => {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const tokenData = JSON.parse(sessionStorage.getItem('authToken'));
  const [status, setStatus] = useState(null) //loading, success, serverError, clientError
  const [orderSent, setOrderSent] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setOrderTotal(total);
  }, [cart]);

  const sendOrder = async (e) => {
    e.preventDefault();
    setStatus('loading')
    const orderData = {
      clientId: tokenData?.client.id,
      products: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        comment: item.comment || '',
      })),
    };
    try {
      const authToken = document.cookie
      if (!authToken) {
        console.error('Brak tokena autoryzacyjnego');
        return;
      }
      let res = await axios.post(`${API_URL}/orders`, orderData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status !== 201) {
        setStatus('serverError')
        throw new Error('log error');
      } else {
        setStatus('success')
        setOrderSent(true)
        dispatch(clearCart())
        console.log(res.data)
        dispatch(addOrder(res.data));
      }
    } catch (e) {
      setStatus('clientError')
      console.log(e);
    }
  };

  return (
    <div>
      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your order have been successfully sent!</p>
        </Alert>)}

      {
        status === "serverError" && (
          <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Try again!</p>
          </Alert>)
      }

      {
        status === "clientError" && (
          <Alert variant="danger">
            <Alert.Heading>Incorrect data</Alert.Heading>
            <p>client error</p>
          </Alert>)
      }

      {
        status === "loading" && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>)
      }
      {!orderSent && (
        <>
          <h2>Order Summary</h2>
          <ListGroup>
            {cart.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col xs={12} sm={8}>
                    {item.name}
                  </Col>
                  <Col xs={6} sm={2}>
                    {item.quantity} x {item.price}$
                  </Col>
                  <Col xs={6} sm={2}>
                    {item.quantity * item.price}$
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12}>
                    {item.comment}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="mt-3">
            <h4>Order Total: {orderTotal}$</h4>
          </div>

          <div className="mt-3">
            <h4>Shipping Address:</h4>
            <p>
              {tokenData?.client.firstName} {tokenData?.client.lastName} <br />
              {tokenData?.client.address}
            </p>
          </div>

          <div className="mt-3">
            <Button variant="success" onClick={sendOrder}>
              Send Order
            </Button>
          </div>
        </>
      )}

      {orderSent && (
        <div className="mt-3">
          <NavLink to={"/"}>  <Button className="m-2" variant="primary" >Back to homepage</Button></NavLink>
        </div>
      )}
    </div>
  );
};

export default OrderSummaryForm;