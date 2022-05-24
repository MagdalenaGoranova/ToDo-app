import './TodoItem.css';

export default function TodoItem({
    todo,
    onDelete,
    onClick
}) {

    let listItemClasses = ['todo-item'];
    if(todo.isDone) {
        listItemClasses.push('todo-item-completed');
    }

    return (
     <li onClick={(e) => onClick(todo.id)} className={listItemClasses.join(' ')}>
     {todo.text} 
     <button onClick={(e) => onDelete(e, todo.id)}>x</button>
     </li>
    );
}