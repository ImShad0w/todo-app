function saveArray(array) {
  const arr = JSON.stringify(array);
  localStorage.setItem("todos", arr);
}

function getArray() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

export { saveArray, getArray };
