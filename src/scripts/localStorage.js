function saveArray(array) {
  const arr = JSON.stringify(array);
  localStorage.setItem("todos", arr);
}

function saveProjects(array) {
  const arr = JSON.stringify(array);
  localStorage.setItem("projects", arr);
}

function getArray() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function getProjs() {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
}

export { saveArray, getArray, saveProjects, getProjs };
