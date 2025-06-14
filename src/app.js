import "./css/styles.css";
import { createTodo, getTodos, getTodo, toggleTodo } from "./scripts/todoLogic.js";

const openModal = document.getElementById("openModal");
const title = document.getElementById("title");
const description = document.getElementById("description");
const modal = document.getElementById("myModal");
const cancel = document.getElementById("cancel");
const date = document.getElementById("date");
const priority = document.getElementById("priority");
const addTodo = document.getElementById("addTodo");
const todoList = document.getElementById("todo-list");
const todoModal = document.getElementById("todoModal");

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
  sortTodos();
})

function renderTodos() {
  //Emtpy the list
  todoList.innerHTML = "";

  getTodos().forEach(todo => {
    if (todo.status === "pending") {
      //Create the elements
      const todoItem = document.createElement("div");
      const para = document.createElement("p");
      const para2 = document.createElement("p");
      const para3 = document.createElement("p");
      const toggle = document.createElement("button");
      const todoBtn = document.createElement("div");
      const todoContent = document.createElement("div");

      //Add also a button to be able to toggle it's status
      toggle.addEventListener("click", () => {
        toggleTodo(todo.id);
        renderTodos();
      })

      //Assign the values
      para.textContent = todo.title;
      para2.textContent = todo.description;
      para2.classList.add("description");
      para3.textContent = todo.dueDate;
      todoItem.classList.add("todo-item");
      toggle.classList.add("toggle-btn");

      //Assign an event listener to todoItem
      todoItem.addEventListener("click", () => {
        showTodo(todo.id);
      })

      //Style the button according to the priority
      switch (todo.priority) {
        case "mild":
          toggle.classList.add("mild");
          break;
        case "severe":
          toggle.classList.add("severe");
          break;
        case "high":
          toggle.classList.add("high");
          break;
        case "low":
          toggle.classList.add("low");
          break;
      }

      //Append the elements
      todoBtn.appendChild(toggle);
      todoContent.appendChild(para);
      todoContent.appendChild(para2);
      todoContent.appendChild(para3);
      todoItem.appendChild(todoBtn);
      todoItem.appendChild(todoContent);
      todoList.appendChild(todoItem);
    }
  })
}

function sortTodos() {
  const container = document.getElementById('todo-list');
  const todos = Array.from(container.children);

  // Define priority order
  const priorityOrder = {
    'severe': 1,
    'high': 2,
    'mild': 3,
    'low': 4
  };

  // Sort todos based on the button's priority class
  todos.sort((a, b) => {
    const buttonA = a.querySelector('button');
    const buttonB = b.querySelector('button');

    // Get the priority classes
    const priorityA = priorityOrder[buttonA.classList[1]]; // Access the first class of the button
    const priorityB = priorityOrder[buttonB.classList[1]]; // Access the first class of the button

    return priorityA - priorityB; // Sort based on priority
  });

  // Append sorted todos back to the container
  todos.forEach(todo => container.appendChild(todo));
}

//Gets the todo by id
function showTodo(id) {

  const todoModalContent = document.querySelectorAll(".modal-content")[1];
  //Cleanup after each opening
  todoModalContent.innerHTML = "";
  //Get the todo and the modal
  const todo = getTodo(id);

  if (todo) {
    //Select the modal content of the todo

    //Create elements based on the todo properties
    const title = document.createElement("p");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    const priority = document.createElement("p");

    //Create edit and close buttons
    const close = document.createElement("button");
    const edit = document.createElement("button");

    //Add the values
    title.textContent = todo.title;
    description.textContent = todo.description;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;
    close.textContent = "Close";
    edit.textContent = "Edit";

    //Append the content
    todoModalContent.appendChild(title);
    todoModalContent.appendChild(description);
    todoModalContent.appendChild(dueDate);
    todoModalContent.appendChild(priority);
    todoModalContent.appendChild(close);
    todoModalContent.appendChild(edit);

    //Add closing logic
    close.addEventListener("click", () => {
      todoModal.style.display = "none";
    })
    //TODO: Create edit function that lets change the title, description, dueDate or priority of the todo
  }

  //Open the modal with it's content
  todoModal.style.display = "block";
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
