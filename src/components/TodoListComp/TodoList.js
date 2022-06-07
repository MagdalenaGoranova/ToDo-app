
import { useState, useEffect } from "react";
import TodoItem from "../TodoItemComp/TodoItem";
import {createTodo} from '../../services/todoService';
import uniqid from 'uniqid';

const API_URL = 'http://localhost:3030/jsonstore';

export default function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/todos`)
        .then(res => res.json())
        .then(todoResult => {
            //console.log(todoResult);
            setTodos(Object.values(todoResult));
        })
        }, []);

    const onTodoInputBlur = (e) => {
        let todo = {
            id: uniqid(),
            text: e.target.value,
            isDone: false,
        };

        createTodo(todo)
            .then(createdTodo => {
                setTodos(oldTodos => [
                    ...oldTodos,
                    createdTodo
                ]);
                e.target.value = '';
            }) 
            .catch(err => {
                console.log(err);
            })

        };
    
    const deleteTodoItemHandler = (e, id) => {
        e.stopPropagation();
       setTodos(oldTodos => oldTodos.filter(todo => todo.id !== id));

    }
    const toggleTodoItemClickHandler = (id) => {
        setTodos(oldTodos => {
            return oldTodos.map(todo => 
                todo.id === id 
                ? {...todo, isDone: !todo.isDone} 
                : todo
            );
        });
    };

    return (
        <>
            <h1 className="title"> My ToDo List </h1>
            <label id="todo-name-label" htmlFor="todo-name">Add Todo</label>
            <input type="text" id="todo-name" onBlur={onTodoInputBlur} name="todo"/>
            <ul className="todo-list-ul">
                {todos.map(todo => 
                <TodoItem 
                key={todo.id} 
                todo={todo} 
                onDelete={deleteTodoItemHandler}
                onClick={toggleTodoItemClickHandler}
                />
                )}
            </ul>
        </>
    );

};