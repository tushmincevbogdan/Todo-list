import React from 'react';
import Header from "../../../shared/components/Header/Header";
import FieldAddTodos from "../components/FieldAddTodos/FieldAddTodos";
import TodoList from "../components/TodoList/TodoList";
import Footer from "../../../shared/components/Footer/Footer";
import './todos-page.scss'

function TodosPage() {
    return (
        <div className="todos-page">
            <Header/>
            <div className="content">
                <FieldAddTodos/>
                <TodoList/>
            </div>
            <Footer/>
        </div>
    );
}

export default TodosPage;

