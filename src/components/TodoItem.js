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
     <li onClick={() => onClick(todo.id)} className={listItemClasses.join(' ')}>
     {todo.text} 
     <button className='delete-btn' onClick={(e) => onDelete(e, todo.id)}><i class="fa-solid fa-trash-can"></i></button>
     </li>
    );
}