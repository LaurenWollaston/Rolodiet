import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
    // Set the state of the form values to the initial state of empty strings
    const [values, setValues] = useState(initialState);

    // When the user types in the form, update the state of the form values
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        console.log(values);
    };

    // When the user submits the form, call the callback function
    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}
