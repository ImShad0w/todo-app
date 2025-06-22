const todos = [];

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
export { createTodo, getTodos, toggleTodo, getTodo, updateTodo };
