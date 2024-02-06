import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { useSelector } from 'react-redux';
import { getCart } from '../../../redux/cartRedux';


const NavBar = () => {
    const [login, setLogin] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const { isAuthenticated } = useAuth();

    const userData = sessionStorage.getItem('authToken');

    useEffect(() => {

        if (isAuthenticated) {
            setLogin(true)
            const parsedData = JSON.parse(userData)

            if (parsedData && parsedData.role === 'ADMIN') {
                setAdmin(true)
            }
        } else {
            setAdmin(false);
            setLogin(false);
        }
    }, [isAuthenticated])

    const cart = useSelector(getCart);

    useEffect(() => {
        updateCartCount();
    }, [cart]);

    const updateCartCount = () => {
        const cartCount = cart ? cart.length : 0;
        setCartCount(cartCount);
    };


    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            <Container>
                <Nav.Link as={NavLink} to="/">
                    <Navbar.Brand>Announcement.app</Navbar.Brand>
                </Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="justify-content-end" >
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        {!login && <Nav.Link as={NavLink} to="/login">Sign In</Nav.Link>}
                        {!login && <Nav.Link as={NavLink} to="/register">Sign Up</Nav.Link>}
                        {login && <Nav.Link as={NavLink} to="/logout">Sign Out</Nav.Link>}
                        <Nav.Link as={NavLink} to="/cart">
                            Cart
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </Nav.Link>
                        {admin && <Nav.Link as={NavLink} to="/adminPanel">Admin Panel</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;