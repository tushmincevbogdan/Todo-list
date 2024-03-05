import React from 'react';
import {useDispatch} from "react-redux";
import './todo-item.scss'
import {Draggable} from "react-beautiful-dnd";
import {Checkbox, IconButton, Paper, styled} from "@mui/material";
import {deleteTodo, toggleTodoActive} from "../../../../redux/data/todo.slice";
import {ITodoItem} from "../../../../shared/types/types";
import {Delete} from "@mui/icons-material";

interface IProps {
    todo: ITodoItem;
    index: number;
}

const StyledCheckbox = styled(Checkbox)(
    ({theme}) => ({
        '&.Mui-checked .MuiSvgIcon-root': {
            color: theme.palette.common.white,
        },
        '& .MuiSvgIcon-root': {
            color: 'black',
        },
        '&.Mui-disabled': {
            '& .MuiSvgIcon-root': {
                color: theme.palette.action.disabled,
            },
        },
    }),
);

const TodoItem = ({todo, index}: IProps) => {
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTodoActive(todo.id));
    };

    return (
        <Draggable draggableId={`${todo.id}`} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <Paper className={todo.active ? "list-item" : "list-item finished"}>
                        <StyledCheckbox
                            checked={!todo.active}
                            color="primary"
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />
                        <p onClick={handleToggle}>{todo.text}</p>
                        <div className="button-wrapper">
                            <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
                                <Delete/>
                            </IconButton>
                        </div>
                    </Paper>
                </div>
            )}
        </Draggable>
    );
};

export default TodoItem