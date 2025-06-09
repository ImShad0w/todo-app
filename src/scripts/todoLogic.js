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

export { createTodo, getTodos, toggleTodo };
