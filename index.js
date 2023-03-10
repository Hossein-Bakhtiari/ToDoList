/* selectors */
const todoInput = document.querySelector(".todo-input");
const todoButton= document.querySelector(".todo-button");
const todoList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filter-todo");
/* event listeners */
todoButton.addEventListener("click" , addTodo);
todoList.addEventListener("click" , checkRemove);
filterOption.addEventListener("click" , filterToDos);
document.addEventListener("DOMContentLoaded" , getLocalTodos);
/* Functions */
function addTodo(e){
  e.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo =
  ` <li>${todoInput.value}</li>
    <span><i class="far fa-check-square"></i></span>
    <span><i class="far fa-trash-alt"></i></span> `
    todoDiv.innerHTML = newTodo;
    // append to todoList
    todoList.appendChild(todoDiv);
    savedLocalTOdos(todoInput.value);
    todoInput.value ="";
}

function checkRemove(e){
  const classList = [... e.target.classList];
  const item = e.target;
  if(classList[1] === "fa-check-square"){
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
  }else if(classList[1] === "fa-trash-alt") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
  

}



function filterToDos(e){
  // console.log(todoList.childNodes)
  const todos = [...todoList.childNodes];
  todos.forEach((todo)=>{
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else{
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")){
          todo.style.display = "flex";
        }  else{
          todo.style.display = "none";
        }
        break;
    }

  });
};

function savedLocalTOdos(todo){
  let savedTodos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
  savedTodos.push(todo);
  localStorage.setItem("todos" , JSON.stringify(savedTodos));
}
function getLocalTodos(){
  let savedTodos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
  savedTodos.forEach((todo)=>{
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo =
    ` <li>${todo}</li>
    <span><i class="far fa-check-square"></i></span>
    <span><i class="far fa-trash-alt"></i></span> `
      todoDiv.innerHTML = newTodo;
      // append to todoList
       todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo){
  let savedTodos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
  const filteredTodos= savedTodos.filter(
    (t)=> t !== todo.children[0].innerText
  );
  localStorage.setItem("todos" , JSON.stringify(filteredTodos));
}