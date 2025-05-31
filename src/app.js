import "./css/styles.css";
import { createTodo, getTodos, deleteTodo, toggleTodo } from "./scripts/todoLogic.js";

const openModal = document.getElementById("openModal");
const title = document.getElementById("title");
const description = document.getElementById("description");
const modal = document.getElementById("myModal");
const cancel = document.getElementById("cancel");
const date = document.getElementById("date");
const priority = document.getElementById("priority");
const addTodo = document.getElementById("addTodo");
const todoList = document.getElementById("todo-list");

//Opens the modal
openModal.addEventListener("click", () => {
  modal.style.display = "block";
})

cancel.addEventListener("click", () => {
  modal.style.display = "none";
})

//If the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

addTodo.addEventListener("click", () => {
  createTodo(title.value, description.value, date.value, priority.value);
  renderTodos();
})

function renderTodos() {
  todoList.innerHTML = "";

  getTodos().forEach(todo => {
    const div = document.createElement("div");
    const para = document.createElement("p");
    const para2 = document.createElement("p");
    const para3 = document.createElement("p");
    para.textContent = todo.title;
    para2.textContent = todo.description;
    para3.textContent = todo.priority;
    div.appendChild(para);
    div.appendChild(para2);
    div.appendChild(para3);
    todoList.appendChild(div);
  })
}
