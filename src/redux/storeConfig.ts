import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/query'
import todosSlice from "./data/todo.slice";

export function makeStore(initialState?: any) {
    return configureStore({
        devTools: process.env.NODE_ENV !== 'production',
        // @ts-ignore
        //todo
        reducer: {dataToolkit: todosSlice},
        preloadedState: initialState || undefined,
    });
}

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

setupListeners(store.dispatch);

export default store;