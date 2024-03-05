import React from 'react';
import {Button, ButtonGroup, styled} from "@mui/material";
import {allTodosFilterTypes} from "./TodoList.constants";


const StyledButtonGroup = styled(ButtonGroup)({
    ".my-button, .active": {
        color: "black",
        backgroundColor: "#f5f5f5",
        border: "1px solid black",
        padding: "5px 10px",
        cursor: "pointer"
    },
    ".active": {
        color: "red"
    },
    ".my-button:hover": {
        backgroundColor: "#616465",
        color: "red"
    }
});

const TodoFilterButtons = ({
                               todoListFilterType,
                               setTodoListFilterType
                           }: { todoListFilterType: string, setTodoListFilterType: (filter: string) => void }) => {

    const handleFilterChange = (filter: string) => {
        setTodoListFilterType(filter);
    };

    return (
        <StyledButtonGroup className="group-button" variant="text" aria-label="text button group">
            {allTodosFilterTypes.map((item) => (
                <Button
                    key={item}
                    className={`my-button ${todoListFilterType === item ? 'active' : ''}`}
                    onClick={() => handleFilterChange(item)}
                >
                    {item}
                </Button>
            ))}
        </StyledButtonGroup>
    );
}

export default TodoFilterButtons;