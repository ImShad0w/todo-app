import "./css/styles.css";
import { saveArray, getArray } from "./scripts/localStorage.js";
import { createTodo, getTodos, getTodo, toggleTodo, updateTodo, setTodos } from "./scripts/todoLogic.js";

// On opening the app render the todos
window.onload = () => {
  const savedTodos = getArray();
  console.log(getArray());
  if (savedTodos) {
    setTodos(savedTodos);
  }
  renderTodos();
}

//Get the elements
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
  saveArray(getTodos());
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
        saveArray(getTodos());
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
      todoContent.addEventListener("click", () => {
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
    //Create elements based on the todo properties
    const title = document.createElement("p");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    const btnDiv = document.createElement("div");

    title.classList.add("title");
    description.classList.add("description");
    description.classList.add("wrap-text");
    dueDate.classList.add("date");
    priority.classList.add("priority");
    //Create edit and close buttons
    const close = document.createElement("button");
    const edit = document.createElement("button");

    //Add the values
    title.textContent = todo.title;
    description.textContent = todo.description;
    dueDate.textContent = "Due date: " + todo.dueDate;
    close.textContent = "Close";
    edit.textContent = "Edit";

    edit.classList.add("btn");
    close.classList.add("cancel");

    //Append the content
    btnDiv.appendChild(edit);
    btnDiv.appendChild(close);
    todoModalContent.appendChild(title);
    todoModalContent.appendChild(description);
    todoModalContent.appendChild(dueDate);
    todoModalContent.appendChild(btnDiv);

    //Add closing logic
    close.addEventListener("click", () => {
      todoModal.style.display = "none";
    })

    edit.addEventListener("click", () => {
      //Clear the form
      todoModalContent.innerHTML = "";

      //Create the input fields in which i can store the new properties
      const newTitle = document.createElement("input");
      const newDescription = document.createElement("input");
      const newDueDate = document.createElement("input");
      const newPriority = document.createElement("select");
      const updateBtn = document.createElement("button");

      updateBtn.classList.add("btn");
      //Clear btnDiv
      btnDiv.innerHTML = "";
      //Add types and content
      newTitle.type = "text";
      newTitle.value = todo.title;

      newDescription.type = "text";
      newDescription.value = todo.description;

      newDueDate.type = "date";
      newDueDate.value = todo.dueDate;

      //Create select options
      const option1 = document.createElement("option");
      option1.textContent = "Severe";
      option1.value = "severe"

      const option2 = document.createElement("option");
      option2.textContent = "High";
      option2.value = "high";

      const option3 = document.createElement("option");
      option3.textContent = "Mild";
      option3.value = "mild";

      const option4 = document.createElement("option");
      option4.textContent = "Low";
      option4.value = "low";

      updateBtn.textContent = "Keep changes";

      //Append the options to the select element
      newPriority.appendChild(option1);
      newPriority.appendChild(option2);
      newPriority.appendChild(option3);
      newPriority.appendChild(option4);

      //Append the inputs into the todoModal
      todoModalContent.appendChild(newTitle);
      todoModalContent.appendChild(newDescription);
      todoModalContent.appendChild(newDueDate);
      todoModalContent.appendChild(newPriority);
      btnDiv.appendChild(updateBtn);
      btnDiv.appendChild(close);
      todoModalContent.appendChild(btnDiv);
      //Add event listener to commit changes
      updateBtn.addEventListener("click", () => {
        updateTodo(newTitle.value, newDescription.value, newDueDate.value, newPriority.value, id)
        //Render and close
        renderTodos();
        saveArray(getTodos());
        todoModal.style.display = "none";
      })
    })
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

