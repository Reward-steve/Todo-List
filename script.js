const userInput = document.querySelector("form .input-form input");
const AddTaskbtn = document.getElementById("add-task");
const ClearTaskbtn = document.getElementById("clear-task");
const uList = document.querySelector("form .uList");
const filter = document.getElementById("filter");

let taskArray = []; //create and empty array

function onclickAddTask(e) {
  e.preventDefault();

  if (userInput.value.trim()) {
    const updateTask = {
      taskName: userInput.value,
      isCompleted: false,
    };
    taskArray.push(updateTask);
    renderTask();
    AddToLocalStorage(taskArray);
  } else {
    alert("Please Input text");
  }
  userInput.value = "";
}

// Toggle complete task
function toggleTask(e) {
  const index = Array.from(uList.children).indexOf(e.target.closest("li"));
  taskArray[index].isCompleted = !taskArray[index].isCompleted;
  renderTask();
  AddToLocalStorage(taskArray);
}

//delete or remove for each task
function removeTask(e) {
  const index = Array.from(uList.children).indexOf(e.target.closest("li"));
  taskArray.splice(index, 1);
  renderTask();
  AddToLocalStorage(taskArray);
}

//clear Task function
function clearAllTask(e) {
  e.preventDefault();
  taskArray = [];
  renderTask();
  AddToLocalStorage(taskArray);
}

//creating new task for ul innerHTML
function renderTask() {
  uList.innerHTML = taskArray
    .map((task) => {
      return `
        <li>
          <input type="checkbox" ${
            task.isCompleted ? "checked" : ""
          } title="Check-Task"/>
          <span class="${task.isCompleted ? "completed" : ""}">${
        task.taskName
      }</span>
          <span>
          <span class="cancle" title="Delete">×</span>
          </span>
          </li>
          `;
    })
    .join("");

  // Add event listeners for toggle and remove tasks
  uList.querySelectorAll("li").forEach((li) => {
    li.querySelector("input").addEventListener("change", toggleTask);
    li.querySelector(".cancle").addEventListener("click", removeTask);
  });
}

//Sorting through the Array
function sortFilteredArray(e) {
  let sortedArr;
  if (e.target.value === "a-z") {
    sortedArr = taskArray
      .slice()
      .sort((a, b) => a.taskName.localeCompare(b.taskName));
  } else if (e.target.value === "z-a") {
    sortedArr = taskArray
      .slice()
      .sort((a, b) => b.taskName.localeCompare(a.taskName));
  } else if (e.target.value === "checked") {
    sortedArr = taskArray.slice().sort((a, b) => a.isCompleted - b.isCompleted);
  }
  taskArray.length = 0;
  taskArray.push(...sortedArr);
  renderTask();
}

//Add Task to LocalStorage
function AddToLocalStorage(items) {
  localStorage.setItem("item", JSON.stringify(items));
}

//Get Task from LocalStorage
function getLocalStorage() {
  const info = localStorage.getItem("item");
  return JSON.parse(info) || [];
}

//adding eventListener to all input with type radio
filter.querySelectorAll("input").forEach((el) => {
  el.addEventListener("change", sortFilteredArray);
});

//add Task to list onClick
AddTaskbtn.addEventListener("click", onclickAddTask);

//clear all Task from list onClick
ClearTaskbtn.addEventListener("click", clearAllTask);

// Initial render with data from local storage
const storedTasks = getLocalStorage();
taskArray.push(...storedTasks);
renderTask();
