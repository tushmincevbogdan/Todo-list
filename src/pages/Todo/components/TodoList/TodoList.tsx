import React, {useMemo, useState} from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {Button, ButtonGroup, Container} from "@mui/material";
import {reorderTodo} from "../../../../redux/data/todo.slice";
import {useAppSelector} from "../../../../redux/storeConfig";
import TodoItem from "../TodoItem/TodoItem";
import "./todo-list.scss";
import {TodoListFilterTypeEnum} from "./components/TodoList.types";
import TodoFilterButtons from "./components/TodoFilterButtons";


const TodosPage = () => {
    const [todoListFilterType, setTodoListFilterType] = useState<string>(TodoListFilterTypeEnum.All);
    const dispatch = useDispatch();
    const todos = useAppSelector((state) => state.dataToolkit);

    function onDragEnd({destination, source}: any) {
        if (destination && destination.index !== source.index) {
            dispatch(reorderTodo({prevIndex: source.index, nextIndex: destination.index}));
        }
    }

    const {activeCount, completedCount} = useMemo(() => ({
        activeCount: todos.filter(todo => todo.active).length,
        completedCount: todos.filter(todo => !todo.active).length
    }), [todos]);


    const filteredTodos = useMemo(() => todos.filter(todo => {
        if (todoListFilterType === TodoListFilterTypeEnum.Completed) {
            return !todo.active;
        } else if (todoListFilterType === TodoListFilterTypeEnum.Current) {
            return todo.active;
        } else {
            return true;
        }
    }), [todoListFilterType, todos])

    return (
        <>
            <TodoFilterButtons todoListFilterType={todoListFilterType} setTodoListFilterType={setTodoListFilterType}/>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <p>{todoListFilterType === TodoListFilterTypeEnum.Completed ? '' : `Active tasks: ${activeCount}`}</p>
                    <p>{todoListFilterType === TodoListFilterTypeEnum.Current ? '' : `Completed tasks: ${completedCount}`}</p>
                </div>
                <Droppable droppableId="list">
                    {(provided) => (
                        <Container
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="root-todos-container"
                            maxWidth="md"
                        >
                            {filteredTodos.length > 0
                                ? filteredTodos.map((todo, index) => (
                                    <TodoItem key={todo.id} index={index} todo={todo}/>
                                ))
                                : "You have no tasks"}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};
export default TodosPage