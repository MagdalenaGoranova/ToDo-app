import TodoItem from "./TodoItem";
import { useState, useEffect } from "react";
import uniqid from 'uniqid'

export default function TodoList() {
    const [todos, setTodos] = useState([
        {id: 1, text: 'Clean', isDone: false}, 
        {id: 2, text: 'Wash clothes', isDone: false}, 
        {id: 3, text: 'Study React', isDone: false},
    ]);

    useEffect(() => {
        console.log('Mounted');
    }, []);

    const onTodoInputBlur = (e) => {
        let todo = {
            id: uniqid(),
            text: e.target.value
        };

        setTodos(oldTodos => [
            ...oldTodos, 
            todo
        ]);

        e.target.value = '';
    }; 
    const deleteTodoItemHandler = (id) => {
       setTodos(oldTodos => oldTodos.filter(todo => todo.id !== id));

    }
    const toggleTodoItemClickHandler = (id) => {
        setTodos(oldTodos => {
            let selectedTodo = oldTodos.find(x => x.id === id);
            let toggledTodo = {...selectedTodo, isDone: !selectedTodo.isDone}
            let restTodos = oldTodos.filter(x => x.id !== id);

            return [...restTodos, toggledTodo];
        });
    }
    return (
        <>
            <input type="text" onBlur={onTodoInputBlur} name="todo"/>Add
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