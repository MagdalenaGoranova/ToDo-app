import TodoItem from "./TodoItem";

export default function TodoList() {
    const todos = [
        {id: 1, text: 'Clean'}, 
        {id: 2, text: 'Wash clothes'}, 
        {id: 3, text: 'Study React'},
    ];

    return (
        <ul>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </ul>
    );

};