import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {initialState} from "./initialState";
import {ITodoItem} from "../../shared/types/types";

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<ITodoItem>) => {
                return [...state, action.payload];
            },
            prepare: (text: string) => ({
                payload: {
                    id: new Date().getTime(),
                    active: true,
                    text,
                },
            }),
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            return state.filter((todo) => todo.id !== action.payload);
        },
        reorderTodo: (
            state,
            action: PayloadAction<{ prevIndex: number; nextIndex: number }>
        ) => {
            const {prevIndex, nextIndex} = action.payload;
            const [removed] = state.splice(prevIndex, 1);
            state.splice(nextIndex, 0, removed);
        },
        toggleTodoActive: (state, action: PayloadAction<number>) => {
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
                todo.active = !todo.active;
            }
        },
    },
});

// Export actions and reducer
export const {addTodo, deleteTodo, toggleTodoActive, reorderTodo} = todosSlice.actions;
export default todosSlice.reducer;