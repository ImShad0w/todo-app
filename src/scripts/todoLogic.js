// Todo array
const todos = [];

//base function to create a todo task
function createTodo(title, description, dueDate,priority){
  const todo = {title, description, dueDate, priority};
  todos.push(todo);
  return todo;
}

function showTodo(){
  todos.forEach(todo => console.log(todo))
}


//Export the functions
export{createTodo, showTodo};
