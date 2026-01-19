let selectedDate = new Date().toDateString();

function showTab(id){
  ['calendar','tasks','settings'].forEach(i=>{
    document.getElementById(i).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}


const cal = document.getElementById('calendar');
const today = new Date();
const daysInMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();

function renderCalendar(){
  cal.innerHTML='';
  for(let i=1;i<=daysInMonth;i++){
    const d = new Date(today.getFullYear(), today.getMonth(), i);
    const div = document.createElement('div');
    div.innerText=i;
    if(i===today.getDate()) div.classList.add('today');
    div.onclick = ()=>{
      selectedDate = d.toDateString();
      updateSelectedDate();
      renderTasks();
      document.querySelectorAll('#calendar div').forEach(el=>el.classList.remove('selected'));
      div.classList.add('selected');
    }
    cal.appendChild(div);
  }
}
renderCalendar();


let tasks = JSON.parse(localStorage.getItem('tasks')) || {};

function updateSelectedDate(){
  document.getElementById('selectedDateText').innerText = selectedDate;
  showTab('tasks');
}

function renderTasks(){
  const ul = document.getElementById('taskList');
  ul.innerHTML='';
  const dateTasks = tasks[selectedDate] || [];
  dateTasks.forEach((t,i)=>{
    const li = document.createElement('li');
    li.innerHTML = `<span>${t}</span>
      <div>
        <button class="task-btn update" onclick="updateTask(${i})">Edit</button>
        <button class="task-btn" onclick="deleteTask(${i})">Delete</button>
      </div>`;
    ul.appendChild(li);
  });
}

function addTask(){
  const input = document.getElementById('taskInput');
  if(input.value.trim()==='') return;
  if(!tasks[selectedDate]) tasks[selectedDate]=[];
  tasks[selectedDate].push(input.value.trim());
  input.value='';
  saveTasks();
  renderTasks();
}

function deleteTask(index){
  tasks[selectedDate].splice(index,1);
  saveTasks();
  renderTasks();
}

function updateTask(index){
  const newTask = prompt("Edit Task", tasks[selectedDate][index]);
  if(newTask) tasks[selectedDate][index] = newTask;
  saveTasks();
  renderTasks();
}

function saveTasks(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function changeColor(color){
  document.documentElement.style.setProperty('--primary',color);
}

function resetAllTasks(){
  if(confirm('Delete all tasks for all dates?')){
    tasks={};
    saveTasks();
    renderTasks();
  }
}