import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const LoginForm = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null) //loading, success, serverError, clientError
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault();
        setStatus('loading')
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include', // Wysyłaj ciasteczka w zapytaniu
                body: JSON.stringify({ login, password })
            });

            if (!response.ok) {

                setStatus('serverError')
                throw new Error('log error');
            }

            const data = await response.json();

            // Odpowiedź z se// Dekodowanie wartości z URL-encoded
            const decodedCookieValue = decodeURIComponent(document.cookie);

            //console.log(decodedCookieValue); // Sprawdź zdekodowaną wartość

            // Popraw zakodowany Base64
            const base64String = decodedCookieValue.split('.')[1].replace('-', '+').replace('_', '/');
            const paddedBase64String = base64String + '==='.slice((base64String.length + 3) % 4);

            // Zdekoduj wartość Base64
            const parsedJwt = JSON.parse(atob(paddedBase64String));
            const jwtString = JSON.stringify(parsedJwt);
            sessionStorage.setItem('authToken', jwtString);
            setIsAuthenticated(true);
            setStatus('success');
            navigate('/');

            // Tutaj możesz dodać kod obsługi odpowiedzi z serwera
        } catch (error) {
            console.error('Wystąpił błąd:', error.message);
            setStatus('clientError');
        }
    };

    return (
        <Form onSubmit={handleLogin} className="mx-auto" style={{ width: '300px' }}>

            <h1>Sign in</h1>

            {status === "success" && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been successfully logged in!</p>
                </Alert>)}

            {status === "serverError" && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Unexpected error... Try again!</p>
                </Alert>)}

            {status === "clientError" && (
                <Alert variant="danger">
                    <Alert.Heading>Incorrect data</Alert.Heading>
                    <p>Login or password are incorrect...</p>
                </Alert>)}

            {status === "loading" && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>)}

            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" placeholder="Enter login" value={login} onChange={e => setLogin(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">Sign in</Button>
        </Form>
    )
}

// const handleSubmit = e => {
//     e.preventDefault();

//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ login, password })
//     };

//     setStatus('loading');
//     fetch(`${API_URL}/auth/login`, options)
//         .then(res => {
//             if (res.status === 200) {

//                 return res.json();
//             }
//             else if (res.status === 400) {
//                 setStatus('clientError')
//             } else {
//                 setStatus('serverError')
//             }
//         })
//         .then(data => {

//             const { id, avatar, phone } = data.user;
//             setStatus('success');
//             dispatch(logIn({ login, id, avatar, phone }));
//             navigate('/')
//         })
//         .catch(err => {
//             console.log(err)
//             setStatus('serverError')
//         })
// }


export default LoginForm