const API_URL = 'http://localhost:8000/todos/api';

export const createTodo = async (todo) => {
    let response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(todo)
    });

    let result = await response.json();

    return result;
}