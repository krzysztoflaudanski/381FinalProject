import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import { useForm } from "react-hook-form";

const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [status, setStatus] = useState(null) //loading, success, serverError, clientError, loginError

    const onSubmit = async (data) => {
        try {
            setStatus("loading");
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
            } else if (response.status === 400) {
                setStatus("clientError");
            } else if (response.status === 409) {
                setStatus("loginError");
            } else {
                setStatus("serverError");
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setStatus("serverError");
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="mx-auto" style={{ maxWidth: '300px'}}>

            <h1>Sign Up</h1>

            {status === "success" && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been successfully registered! You can now log in...</p>
                </Alert>)}

            {status === "serverError" && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Unexpected error... Try again!</p>
                </Alert>)}

            {status === "clientError" && (
                <Alert variant="danger">
                    <Alert.Heading>No enought data</Alert.Heading>
                    <p>You have to fill all the field.</p>
                </Alert>)}

            {status === "loginError" && (
                <Alert variant="warning">
                    <Alert.Heading>Login or email already in use</Alert.Heading>
                    <p>You have to use other login or email.</p>
                </Alert>)}

            {status === "loading" && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>)}

            <Form.Group className="mb-3" controlId="login">
                <Form.Label>Login</Form.Label>
                <Form.Control {...register("login", { required: true, minLength: 5, maxLength: 50, pattern: /^[A-Za-z0-9]*$/ })}
                    type="text" placeholder="Enter login" value={login} onChange={e => setLogin(e.target.value)} />
                {errors.login && <small className='d-block form-text text-danger mt-2'>only a-z, A-Z, 1-9, .,!?$-*: are available, min:5, max:50</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control {...register("password", {
                    required: true, minLength: 10, pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message: "Password must contain at least one lowercase letter, one uppercase letter, and one digit.",
                    }
                })}
                    type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                {errors.password && <small className='d-block form-text text-danger mt-2'>Password must contain at least one lowercase letter, one uppercase letter, and one digit. only a-z, A-Z, 1-9, .,;:"'/?!@#$%^&*()--+= are available, min:10,</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="passwordRepeat">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    {...register("passwordRepeat", {
                        required: true,
                        validate: (value) =>
                            value === password || "The passwords do not match",
                    })}
                    type="password"
                    placeholder="Confirm password"
                    value={passwordRepeat}
                    onChange={e => setPasswordRepeat(e.target.value)}
                />
                {errors.passwordRepeat && (
                    <small className="d-block form-text text-danger mt-2">
                        The passwords do not match
                    </small>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control {...register("email", { required: true, minLength: 5, maxLength: 50, pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ })}
                    type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <small className='d-block form-text text-danger mt-2'>Please enter correct email</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control {...register("firstName", { required: true, minLength: 2, maxLength: 25, pattern: /^[a-zA-Z0-9-\s]+$/ })}
                    type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                {errors.firstName && <small className='d-block form-text text-danger mt-2'>Only a-z, A-Z, 0-9, min:2, max:25</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control {...register("lastName", { required: true, minLength: 2, maxLength: 25, pattern: /^[a-zA-Z0-9-\s]+$/ })}
                    type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
                {errors.lastName && <small className='d-block form-text text-danger mt-2'>Only a-z, A-Z, 0-9, min:2, max:25</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control {...register("address", { required: true, minLength: 10, maxLength: 50, pattern: /^[a-zA-Z0-9-\s]+$/ })}
                    as="textarea" rows={3} placeholder="address" value={address} onChange={e => setAddress(e.target.value)} />
                {errors.address && <small className='d-block form-text text-danger mt-2'>Only a-z, A-Z, 0-9, min:10, max:50</small>}
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

export default RegisterForm