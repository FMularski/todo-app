const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', completeRemove);
filter.addEventListener('change', filterTodos);


function addTodo(event){
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    listItem.innerText = todoInput.value;
    saveTodosToLocalStorage(todoInput.value);
    todoInput.value = "";
    todoDiv.appendChild(listItem);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add('remove-btn');
    todoDiv.appendChild(removeButton);

    todoList.appendChild(todoDiv);
}

function completeRemove(event){
    const clickedBtn = event.target;
    const parent = clickedBtn.parentElement;

    if (clickedBtn.classList[0] === 'remove-btn'){
        removeTodoFromLocalStorage(parent);
        parent.classList.add('fall');
        parent.addEventListener('transitionend', () =>{
            parent.remove();
        })
    }

    if (clickedBtn.classList[0] === 'complete-btn'){
        parent.classList.toggle('completed');
        clickedBtn.classList.toggle('completed');
    }
}

function filterTodos(event) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(filter.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (todo.classList.contains('completed')){
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
        }
    })
}

function saveTodosToLocalStorage(todo){
    let todos;
    if (localStorage.getItem('todos') === null)
        todos = [];
    else 
        todos = JSON.parse(localStorage.getItem('todos'));
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null)
        return;
    else
        todos = JSON.parse(localStorage.getItem('todos'));

    todos.forEach((todo) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');
        listItem.innerText = todo;
        todoDiv.appendChild(listItem);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.classList.add('remove-btn');
        todoDiv.appendChild(removeButton);

        todoList.appendChild(todoDiv);
    })
}

function removeTodoFromLocalStorage(todoDiv){
    let todos = JSON.parse(localStorage.getItem('todos'));
    let todo = todoDiv.children[0].innerText;
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}