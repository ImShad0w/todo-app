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

export { createTodo, getTodos, toggleTodo, getTodo, updateTodo, setTodos, createProject, getProjects };
