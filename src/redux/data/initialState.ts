import {ITodoItem} from "../../shared/types/types";


export const initialState:  ITodoItem[] = Array.from({length: 5}, (_, k) => ({
    id: k,
    active: true,
    text: `Todo ${k + 1}`,
}));