// import './index.css';

const taskContainer = document.querySelector('.task-container');
const taskInput = document.querySelector('.task-input');

//getting localStorage tasks
let localTasks = JSON.parse(localStorage.getItem("tasks"))
// const tasks = [
//   {
//     description: 'Complete Capstone project',
//     completed: true,
//     index: 0,
//   },
//   {
//     description: 'Javascript finished',
//     completed: false,
//     index: 1,
//   },
//   {
//     description: 'Finish Microverse',
//     completed: true,
//     index: 2,
//   },
// ];
function tasksDisplay() {
//   taskContainer.innerHTML = localTasks.map((task, index) => `
// <li class="task-list">
// <label for="${task.index}" class="label-checkbox">
// <input type="checkbox" id="${task.index}" class="check-input">
// <p class="task-name">${task.description}</p>
// </label>
// <div ><i class="fa fa-ellipsis-v more-icon"></i></div>
// </li>
// `).join('');
    let li = "";
   if(localTasks){
    localTasks.forEach((task, id) => {
      let isCompleted = task.completed == true ? "checked": "";
      li += `
        <li class="task-list">
        <label for="${id}" class="label-checkbox">
        <input type="checkbox" onclick="completionStatus(this)" ${isCompleted} id="${id}" class="check-input">
        <p class="task-name ${isCompleted}">${task.description}</p>
        </label>
        <div ><i class="fa fa-ellipsis-v more-icon"></i></div>
        </li>
      `
});
   }
taskContainer.innerHTML = li;
}
tasksDisplay();

function completionStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked) {
    taskName.classList.add("checked");
    localTasks[selectedTask.id].completed = true;
  } else {
    taskName.classList.remove("checked");
    localTasks[selectedTask.id].completed = false;
  }
  localStorage.setItem("tasks", JSON.stringify(localTasks));
}

taskInput.addEventListener('keyup', e=>{
  let EnteredTask = taskInput.value.trim();
  if(e.key ==="Enter" && EnteredTask) {
    if(!localTasks) {
        localTasks = [];
    }
    taskInput.value = "";
    let taskInfo = {description: EnteredTask, completed: false, index: 1};
    localTasks.push(taskInfo);
    localStorage.setItem("tasks", JSON.stringify(localTasks));
    tasksDisplay();
  }
})

