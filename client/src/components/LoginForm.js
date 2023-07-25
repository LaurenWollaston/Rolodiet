import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';
import './LoginForm.css'; // Import the CSS file

import { LOGIN_USER } from "../utils/mutations";
import AuthService from '../utils/auth';


const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const [login] = useMutation(LOGIN_USER);
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }

        try {
            const { data } = await login({
                variables: { input: userFormData },
            });

            
            AuthService.login(data.login.token);
            
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }

        setUserFormData({
            email: '',
            password: '',
        });
    };

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
