import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utils/hooks";
import { useMutation } from '@apollo/react-hooks';

import { Button, TextField, Container, Stack, Alert } from '@mui/material';

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

    const [loginUser] = useMutation(LOGIN_USER, {
        update(_, { data: { loginUser: userData } }) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { loginInput: values }
    });

    return (
        <Container spacing={2} maxWidth="sm">
            <h3>Login</h3>
            <p>Login to your account</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    onChange={onChange}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    onChange={onChange}
                />
            </Stack>
            {errors.map(error => (
                <Alert severity="error">{error.message}</Alert>
            ))}
            <Button variant="contained" onClick={onSubmit}>Login</Button>
        </Container>
    );
}

export default LoginForm;
