const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const toDoList = document.getElementById("toDoList");
let editToDo = null;


// ADD TODO
const addtodo = () => {
    const inputText = inputBox.value.trim();

    if (inputText.length <= 0) {
        alert("You Must type something in your todo");
        return false;
    }

    if (addBtn.value === "update") {
        editLocaltoDos(editToDo.oldText);
        editToDo.li.children[1].innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
        return;
    }

    createTodoElement({ text: inputText, completed: false });
    saveLoadTodos(inputText);
    inputBox.value = "";
};


// CREATE TODO ELEMENT
function createTodoElement(todoObj) {
    const li = document.createElement("li");

    // CHECKBOX (FIRST)
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkTodo");
    checkBox.checked = todoObj.completed;
    li.appendChild(checkBox);

    // TEXT
    const p = document.createElement("p");
    p.innerHTML = todoObj.text;
    li.appendChild(p);

    // EDIT BUTTON
    const EditBtn = document.createElement("button");
    EditBtn.innerHTML = "Edit";
    EditBtn.classList.add("btns", "EditBtn");
    li.appendChild(EditBtn);

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove";
    deleteBtn.classList.add("btns", "deleteBtn");
    li.appendChild(deleteBtn);

    // APPLY GREEN BACKGROUND IF COMPLETED
    if (todoObj.completed === true) {
        li.classList.add("completed");
    }

    toDoList.appendChild(li);
}


// SAVE A NEW TODO
const saveLoadTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ text: todo, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
};


// LOAD TODOS ON REFRESH
const getLocaltoDo = () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => createTodoElement(todo));
};


// DELETE FROM LOCAL STORAGE
const deleteLocaltoDo = (li) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let text = li.children[1].innerHTML;
    let index = todos.findIndex(t => t.text === text);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};


// EDIT LOCAL STORAGE TODO
const editLocaltoDos = (oldText) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let index = todos.findIndex(t => t.text === oldText);

    todos[index].text = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
};


// EVENT HANDLER FOR EDIT / DELETE / CHECKBOX
const updateTodo = (e) => {

    const li = e.target.parentElement;

    // DELETE
    if (e.target.innerHTML === "Remove") {
        deleteLocaltoDo(li);
        toDoList.removeChild(li);
    }

    // EDIT
    if (e.target.innerHTML === "Edit") {
        let text = li.children[1].innerHTML;
        inputBox.value = text;
        inputBox.focus();
        addBtn.value = "update";
        editToDo = { li: li, oldText: text };
    }

    // CHECKBOX
    if (e.target.type === "checkbox") {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        let text = li.children[1].innerHTML;
        let index = todos.findIndex(t => t.text === text);

        todos[index].completed = e.target.checked;
        localStorage.setItem("todos", JSON.stringify(todos));

        if (e.target.checked) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }
    }
};


// EVENTS
document.addEventListener("DOMContentLoaded", getLocaltoDo);
addBtn.addEventListener("click", addtodo);
toDoList.addEventListener("click", updateTodo);

