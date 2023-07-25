import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import './SignupForm.css'; // Import the CSS file

const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({ username: '', password: '', });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const [create] = useMutation(CREATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await create({
                variables: { ...userFormData },
            });

            const { token, user } = data.createUser;
            Auth.login(token);
            
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            password: '',
        });
    };

    return (
        <>
            <Form className='signup-form' noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert className='signup-alert' dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    We were unable to register your sign up!
                </Alert>

                <Form.Group className='mb-3 signup-group'>
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control
                        className='signup-input'
                        type='text'
                        placeholder='Your username'
                        name='username'
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3 signup-group'>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control
                        className='signup-input'
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>

                <Button
                    className='signup-button'
                    disabled={!(userFormData.username && userFormData.password)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default SignupForm;
