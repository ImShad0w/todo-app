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

openModal.addEventListener("click", () => {
  modal.style.display = "block";
})

cancel.addEventListener("click", () => {
  closeModal();
})

//If the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
}

addTodo.addEventListener("click", () => {
  createTodo(title.value, description.value, date.value, priority.value);
  closeModal();
  renderTodos();
})

function renderTodos() {
  //Emtpy the list
  todoList.innerHTML = "";

  getTodos().forEach(todo => {
    if (todo.status === "pending") {
      //Create the elements
      const div = document.createElement("div");
      const para = document.createElement("p");
      const para2 = document.createElement("p");
      const para3 = document.createElement("p");
      const toggle = document.createElement("button");


      //Set button text

      toggle.textContent = "Mark as done";

      //Set data attributes
      div.setAttribute("data-id", todo.id);

      //Add also a button to be able to toggle it's status
      toggle.addEventListener("click", () => {
        toggleTodo(todo.id);
        renderTodos();
      })

      //Assign the values
      para.textContent = todo.title;
      para2.textContent = todo.description;
      para2.classList.add("description");
      para3.textContent = todo.priority;
      div.classList.add("todo-item");

      //Append the elements
      div.appendChild(para);
      div.appendChild(para2);
      div.appendChild(para3);
      div.appendChild(toggle);
      todoList.appendChild(div);
    }
  })
}

function closeModal() {
  //Close the modal
  modal.style.display = "none";

  //Clear the input fields too
  title.value = "";
  description.value = "";
  date.value = "";
  priority.value = "";
}
