import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
    user: {},
};

if (localStorage.getItem("token")) {
    const decodeedToken = jwtDecode(localStorage.getItem("token"));

    if (decodeedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.user = decodeedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { },
});

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Login functions will be called from the login and register pages
    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        dispatch({
            type: "LOGIN",
            payload: userData
        });
    }

    function logout() {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider};