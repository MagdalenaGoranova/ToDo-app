export default function TodoItem({
    todo,
    onDelete,
    onClick
}) {
    return (
     <li onClick={onClick(todo.id)} className="todo-item">
     {todo.text} 
     <button onClick={() => onDelete(todo.id)}>x</button>
     </li>
    );
}