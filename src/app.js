import "./css/styles.css";

import {createTodo, showTodo} from "./scripts/todoLogic.js";

const submit = document.getElementById("submit");
const title = document.getElementById("title");
const description = document.getElementById("description");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const show = document.getElementById("show");
submit.addEventListener("click", () => {
  createTodo(title.value, description.value, dueDate.value, priority.value);
})

show.addEventListener("click", () =>{
  showTodo();
})

