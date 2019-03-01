const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const submitBtn = document.querySelector('#submit-btn');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', populateList)
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
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

//deletes a task from local storage
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

// takes a string value and creates a list item
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

//adds an item into localstorage
function addToLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/*removes items from local storage based on index in array
* if the array is empty the item gets removed from local storage
*/
function removeFromLocalStorage(index, empty){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  //if the local storage is now empty
  if(empty){
    localStorage.removeItem('tasks');
  }
}

//takes tasks from local storage and creates list items
function populateList(){
  let tasks;
  if(localStorage.getItem('tasks') !== null){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    for(task of tasks){
      createListItem(task);
    }
  }
}

//removes all tasks from local storage
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.removeItem('tasks');
}

//if the text inputted exists in a list item display it, if not hide it
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(function(task){    
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}