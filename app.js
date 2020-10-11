const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('.filter-todo');

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
    console.log(todos);
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