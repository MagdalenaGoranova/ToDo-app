
import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import {createTodo} from '../services/todoService';

const API_URL = 'http://localhost:8000/todos/api';

export default function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}`)
        .then(res => res.json())
        .then(todoResult => {
            //console.log(todoResult);
            setTodos(Object.values(todoResult));
        })
        }, []);

    const onTodoInputBlur = (e) => {
        let todo = {
            task: e.target.value,
            completed: false,
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
                ? {...todo, completed: !todo.completed} 
                : todo
                );
        });
    };

    return (
        <>
            <label htmlFor="todo-name">Add Todo</label>
            <input type="text" id="todo-name" onBlur={onTodoInputBlur} name="todo"/>
            <ul>
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