const todos = [];

function createTodo(title, description, dueDate, priority) {
  const todo = { title, description, dueDate, priority, status: "pending" };
  todos.push(todo);
  return todo;
}

function getTodos() {
  return todos.slice();
}

function deleteTodo(todoIndex) {
  return todos.splice(todoIndex, 1)
}

function toggleTodo() {
  this.status = this.status === "pending" ? "done" : "pending";
}

export { createTodo, getTodos, deleteTodo, toggleTodo };
