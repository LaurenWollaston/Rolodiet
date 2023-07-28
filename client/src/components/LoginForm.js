import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utils/hooks";
import { useMutation } from '@apollo/react-hooks';
import { Form, Button, Alert } from 'react-bootstrap';
import './LoginForm.css'; // Import the CSS file

import { gql } from 'graphql-tag';
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
    mutation login(
        $loginInput: LoginInput!
    ) {
        loginUser(
            loginInput: $loginInput
        ) {
            email
            username
            token
        }
    }
`;

const LoginForm = () => {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const loginUserCallback = () => {
        console.log("Logging in user...")
        loginUser();
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    });

    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData } }) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { loginInput: values }
    });

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='loginForm'>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger' className='loginFormAlert'>
                    Something went wrong with your login credentials!
                </Alert>

                <Form.Group className='mb-3 loginFormInputGroup'>
                    <Form.Label htmlFor='email' className='loginFormLabel'>Email</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your email'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                        className='loginFormControl'
                        />
                    <Form.Control.Feedback type='invalid' className='loginFormInvalidFeedback'>Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3 loginFormInputGroup'>
                    <Form.Label htmlFor='password' className='loginFormLabel'>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                        className='loginFormControl'
                    />
                    <Form.Control.Feedback type='invalid' className='loginFormInvalidFeedback'>Password is required!</Form.Control.Feedback>
                </Form.Group>

                <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type='submit'
                    variant='success'
                    className='loginFormButton'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;
