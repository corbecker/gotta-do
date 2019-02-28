const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const submitBtn = document.querySelector('#submit-btn');

loadEventListeners();
populateList();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);

}

function addTask(e){
  e.preventDefault();

  if(taskInput.value === '' || taskInput.value === ' '){
    return;
  }

  createListItem(taskInput.value);

  addToLocalStorage(taskInput.value);

  taskInput.value = '';
}

function removeTask(e){
  let taskListItem = e.target.parentElement.parentElement;
  let taskList = [...taskListItem.parentNode.children];
  let taskIndex = taskList.indexOf(taskListItem);

  //event delegation
  if(e.target.parentElement.classList.contains('delete-item')){
    removeFromLocalStorage(taskIndex, taskList.length === 1 ? true : false);
    taskListItem.remove();
  }
  
}

function createListItem(taskValue){
    //create the new task list item
    const task = document.createElement('li');
    task.className = 'collection-item';
    task.appendChild(document.createTextNode(taskValue));
    //create the delete task button
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="material-icons">close</i>';
    task.appendChild(link);
  
    taskList.appendChild(task);
}

function addToLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromLocalStorage(index, empty){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  //if the local storage is now empty
  if(empty){
    localStorage.removeItem('tasks');
  }
}

function populateList(){
  let tasks;
  if(localStorage.getItem('tasks') !== null){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    for(task of tasks){
      createListItem(task);
    }
  }
}

function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.removeItem('tasks');
}