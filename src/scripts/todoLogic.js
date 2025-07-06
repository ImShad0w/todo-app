import { saveProjects } from "./localStorage.js";

let todos = [];
let projects = [];

function createTodo(
  title = "Untitled",
  description = "No description provided",
  dueDate = "No due date",
  priority = "low",
  status = "pending",
  id = Date.now()
) {
  const todo = { title, description, dueDate, priority, status, id };
  todos.push(todo);
}

//Gets the array of todos from localStorage and replaces the empty one
function setTodos(newTodos) {
  todos = newTodos;
}

function getTodos() {
  return todos.slice();
}

function toggleTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.status = todo.status === "pending" ? "done" : "pending";
  }
}

function getTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    return todo;
  } else {
    alert("No such todo.");
  }
}

function updateTodo(title, description, dueDate, priority, id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.title = title;
    todo.description = description;
    todo.duieDate = dueDate;
    todo.priority = priority;
  }
}

//Projects section

function createProject(name) {
  const project = { name, todos: [] };
  projects.push(project);
}

function getProjects() {
  return projects.slice();
}

function addTodoToProject(todo, projectName) {
  const project = projects.find(p => p.name === projectName)
  if (project) {
    project.todos.push(todo);
  }
}

function removeTodoFromProject(todo) {
  for (let i = 0; i < projects.length; i++) {
    let project = projects[i];
    for (let o = 0; o < project.todos.length; o++) {
      let task = project.todos[o];
      if (todo.id === task.id) {
        project.todos.splice(o, 1);
      }
    }
  }
}

function toggleTodoInProject(task, projectName) {
  const project = projects.find(p => p.name === projectName);
  const todo = project.todos.find(todo => todo.id === task.id);
  todo.status = todo.status === "pending" ? "done" : "pending";
  setProjs(projects);
}

function setProjs(newProjs) {
  projects = newProjs;
  saveProjects(projects);
}

function removeProject(proj) {
  const project = projects.findIndex(p => p.name === proj.name);
  if (project !== -1) {
    projects.splice(project, 1);
  }
}

export { createTodo, getTodos, toggleTodo, getTodo, updateTodo, setTodos, createProject, getProjects, addTodoToProject, setProjs, removeTodoFromProject, toggleTodoInProject, removeProject };
