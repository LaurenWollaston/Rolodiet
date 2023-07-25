import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import AuthService from '../utils/auth';
import './SignupForm.css'; // Import the CSS file

const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const [createUser] = useMutation(CREATE_USER, {
        onCompleted(data) {
            const { token } = data.createUser;
            AuthService.login(token);
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await createUser({ variables: { input: { ...userFormData } } });

        } catch (error) {
            console.error(error); const form = event.currentTarget;
            validated(true);
            if (form.checkValidity() === false) {
                event.stopPropagation();
                return;
            }

            try {
                const { data } = await create({
                    variables: { input: userFormData },
                });

                AuthService.login(data.createUser.token);

            } catch (error) {
                console.error(error);
                setShowAlert(true);
            }

            setUserFormData({
                username: '',
                email: '',
                password: '',
            });
        };
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
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control
                        className='signup-input'
                        type='text'
                        placeholder='Your email'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
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
