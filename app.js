const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

todoButton.addEventListener('click', addTodo);

function addTodo(event){
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    listItem.innerText = todoInput.value;
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