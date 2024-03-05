import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import useInputState from "../../../../shared/hooks/useInputState";
import {addTodo} from "../../../../redux/data/todo.slice";
import './field-add-todos.scss'

const FieldAddTodos = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const {value, onChange, reset} = useInputState();

    const onSubmit = (event: React.FormEvent) => {
        event && event.preventDefault && event.preventDefault();
        if (value.length >= 2 && value.length <= 30) {
            dispatch(addTodo(value));
            reset();
            setError('');
        } else {
            setError('The text must be between 2 and 30 characters');
        }
    };

    return (
        <form className='add-todos-container' onSubmit={onSubmit}>
            <TextField
                className='field'
                label="New todo"
                variant="outlined"
                value={value}
                onChange={onChange}
                autoComplete={'off'}
                error={!!error}
                helperText={error}
            />
            <Button className='my-button' type='submit'>
                Create
            </Button>
        </form>
    );
};
export default FieldAddTodos