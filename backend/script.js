// ---------------- BACKEND DATA ----------------

// selected date
let selectedDate = new Date().toDateString();

// load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};


// ---------------- TAB CONTROL ----------------
function showTab(tab) {
  document.getElementById("calendar").classList.add("hidden");
  document.getElementById("tasks").classList.add("hidden");
  document.getElementById("settings").classList.add("hidden");

  document.getElementById(tab).classList.remove("hidden");
}


// ---------------- CALENDAR ----------------
const calendar = document.getElementById("calendar");
const today = new Date();
const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

function renderCalendar() {
  calendar.innerHTML = "";

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), i);
    const div = document.createElement("div");
    div.innerText = i;

    if (i === today.getDate()) {
      div.classList.add("today");
    }

    div.onclick = () => {
      selectedDate = date.toDateString();
      document.getElementById("selectedDateText").innerText = selectedDate;
      renderTasks();
      showTab("tasks");
    };

    calendar.appendChild(div);
  }
}

renderCalendar();


// ---------------- BACKEND FUNCTIONS ----------------

// SAVE to LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// READ tasks
function renderTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  const dateTasks = tasks[selectedDate] || [];

  dateTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task}
      <button onclick="deleteTask(${index})">❌</button>
    `;
    ul.appendChild(li);
  });
}

// CREATE task
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (task === "") return;

  if (!tasks[selectedDate]) {
    tasks[selectedDate] = [];
  }

  tasks[selectedDate].push(task);
  input.value = "";

  saveTasks();
  renderTasks();
}

// DELETE task
function deleteTask(index) {
  tasks[selectedDate].splice(index, 1);
  saveTasks();
  renderTasks();
}

// RESET all data
function resetAllTasks() {
  if (confirm("Delete all tasks?")) {
    tasks = {};
    localStorage.clear();
    renderTasks();
  }
}

// SETTINGS
function changeColor(color) {
  document.documentElement.style.setProperty("--primary", color);
}
