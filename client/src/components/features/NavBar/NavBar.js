import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';


const NavBar = () => {
    const [login, setLogin] = useState(false);
    const [admin, setAdmin] = useState(false)

    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated)
    const userData = sessionStorage.getItem('authToken');
     
     useEffect(() => {
        
        if (isAuthenticated) {
            setLogin(true)
            const parsedData = JSON.parse(userData)

            if (parsedData && parsedData.role === 'ADMIN') {
                console.log('kuku')
                 setAdmin(true)
             }
          
            // ...kontynuuj operacje na zdekodowanym tokenie JWT według potrzeb...
          } else {
            setAdmin(false);
            setLogin(false);
            console.error("Brak tokenu JWT w sessionStorage.");
          }
    }, [isAuthenticated])

    
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            {/* <LoginForm /> */}
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
                        <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
                        {admin && <Nav.Link as={NavLink} to="/adminPanel">Admin Panel</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;