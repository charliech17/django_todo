// const btnId = document.getElementById('getTodo');
const todoListId = document.getElementById('todoList');
const inputId = document.getElementById('todoInput');
const addBtnId = document.getElementById('addTodo');

let todoData = []
// const apiBaseUrl = 'http://localhost:8000';
const apiBaseUrl = '';

function initPage() {
    apiFetchTodo();
    handleCreateTodoClick();
}


function apiFetchTodo() {
    fetch(`${apiBaseUrl}/api/todo/`)
        .then(res => res.json())
        .then(data => {
            todoData = data;
            renderTodoList(todoData);
        });
}

function handleCreateTodoClick() {
    addBtnId.addEventListener('click', (event) => {
        event.preventDefault();
        
        const content = inputId.value;

        if (!content) {
            alert('請輸入待辦事項');
            return;
        }
    
        inputId.value = '';
        fetch(`${apiBaseUrl}/api/todo/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })
            .then(res => res.json())
            .then(data => {
                todoData.push(data);
                renderTodoList(todoData);
            });
    });
}

function renderTodoList(todoData) {
    todoListId.innerHTML = '';
    todoData.forEach(todo => {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todo.completed;
        checkBox.addEventListener('change', (event) => {
            event.preventDefault();
            event.stopPropagation();
            fetch(`${apiBaseUrl}/api/todo/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: todo.id ,completed: checkBox.checked }),
            })
                .then(res => res.json())
                .then(data => {});
        });

        const li = document.createElement('li');

        const span = document.createElement('span');
        span.innerText = todo.title;
        
        li.appendChild(checkBox);
        li.appendChild(span);

        todoListId.appendChild(li);
    });
}

initPage();