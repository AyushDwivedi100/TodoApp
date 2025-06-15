const Inputform = document.querySelector("form");
const toDoUl = document.getElementById("todoul");
const InputValue = document.getElementById("write-text-box");

const toDoList = getItem();
updateToDoList();

Inputform.addEventListener("submit", function (e) {
  e.preventDefault();
  updateToDoList();
});

function updateToDoList() {
  const toDoValue = InputValue.value.trim();
  if (toDoValue != "") {
    const todoObject = {
      todoText: toDoValue,
      completed: false,
    };
    toDoList.push(todoObject);
  }
  setItem();
  InputValue.value = "";
  appendUl();
}

function appendUl() {
  toDoUl.innerHTML = "";
  toDoList.forEach((toDo, toDoIndex) => {
    toDoItem = createToDo(toDo.todoText, toDoIndex);
    toDoUl.append(toDoItem);
    const checkbox = document.getElementById("text-box-" + `${toDoIndex}`);
    checkbox.checked = toDoList[toDoIndex].completed;
  });
}

function deleteToDo(todoIndex) {
  toDoList.splice(todoIndex, 1);
  updateToDoList();
}

function createToDo(toDo, toDoIndex) {
  const Indexing = "text-box-" + toDoIndex;
  const toDoLi = document.createElement("li");
  toDoLi.innerHTML = `
            <input type="checkbox" class="text-box" id="${Indexing}" onclick="checkingUpdate(${toDoIndex})">
            <label for="${Indexing}" class="toDoCheck">
              <svg
                fill="transparent"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path
                  d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                />
              </svg>
            </label>
            <label for="${Indexing}" class="todo-container">
              ${toDo}
            </label>
            <button class="delete-btn" onclick="deleteToDo(${toDoIndex})">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
              </svg>
            </button>
          `;
  return toDoLi;
}

function setItem() {
  const JSONSet = JSON.stringify(toDoList);
  localStorage.setItem("todos", JSONSet);
}

function getItem() {
  const JSONGet = localStorage.getItem("todos") || "[]";
  return JSON.parse(JSONGet);
}

function checkingUpdate(todoIndex) {
  toDoList[todoIndex].completed = true;
  setItem();
}
