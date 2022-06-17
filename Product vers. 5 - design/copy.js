/*
    ===============
    show item input
    ===============
*/

const addDateBtn = document.getElementById('add-date');
const dateInputContainer = document.getElementById('add-date-container');

addDateBtn.addEventListener('click', function() {
    dateInputContainer.classList.toggle('show-add-item-container');
    sideBar.classList.remove('show-side-bar');
    mainContent.classList.remove('shift-main');
})

/*
    ================
    add items to list
    ================
*/

const form = document.querySelector('.add-item-container');
const submitBtn = document.querySelector('.submit-btn');
const listItem = document.querySelector('.add-item-input');
const container = document.querySelector('.to-do-list-container');
const list = document.querySelector('.to-do-list');
const task = document.querySelector('.to-do-item');

// load items
window.addEventListener("DOMContentLoaded", loadItems);
//window.addEventListener("DOMContentLoaded", loadCurrency);

//submit item
form.addEventListener('submit', addItem);

//add item
function addItem(e) {
  e.preventDefault();
  const item = listItem.value;
  let id = new Date().getTime().toString();

  const a = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  a.setAttributeNode(attr);
  a.classList.add('to-do-item');
  a.innerHTML = `<!-- item delete button -->
    <button class="delete-btn main-btn">
        <i class="fa-solid fa-trash"></i>
    </button>
    <!-- to-do item text -->
    <p class="to-do-title">${item}</p>
    <!-- check box button -->
    <button class="check-box main-btn">
        <i class="fa-regular fa-square"></i>
    </button>
    <button class="check-box-complete main-btn">
        <i class="fa-solid fa-square-check"></i>
    </button>
    `;

  // delete button
  const deleteBtn = a.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', deleteItem);

  //complete task buttons
  const completeBtn = a.querySelector('.check-box');
  completeBtn.addEventListener('click', completeTask);

  // append child and add to local storage
  list.appendChild(a);
  addToLocalStorage(id, item);

  // clear and hide input box
  clearInput();
}

// removes text in input box
function clearInput() {
  if (listItem.value != "") {
    listItem.value = "";
  }
}

// delete item
function deleteItem(e) {
  let element = e.currentTarget.parentElement;
  let id = element.dataset.id;
  list.removeChild(element);
  removeFromLocalStorage(id);
  //window.location.reload();
  console.log(id);
}

// local storage
function addToLocalStorage(id, item) {
  const task = { id, item };
  let tasks = getLocalStorage();
  console.log(tasks);
  tasks.push(task);
  localStorage.setItem("list", JSON.stringify(tasks));
}

function removeFromLocalStorage(id) {
  let tasks = getLocalStorage();
  tasks = tasks.filter(function(task) {
    if(task.id != id) {
      return task;
    }
  });
  localStorage.setItem("list", JSON.stringify(tasks));
}

function getLocalStorage() {
  return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

// items onload
function loadItems() {
  let tasks = getLocalStorage();
  if(tasks.length > 0) {
    tasks.forEach(function(task) {
      createListItem(task.id, task.item)
    })
  }
}

function createListItem(id, item) {
  const a = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  a.setAttributeNode(attr);
  a.classList.add('to-do-item');
  a.innerHTML = `<!-- item delete button -->
    <button class="delete-btn main-btn">
        <i class="fa-solid fa-trash"></i>
    </button>
    <!-- to-do item text --> 
    <p class="to-do-title">${item}</p>
    <!-- check box button -->
    <button class="check-box main-btn">
        <i class="fa-regular fa-square"></i>
    </button>
    <button class="check-box-complete main-btn">
        <i class="fa-solid fa-square-check"></i>
    </button>
    `;

  // delete button
  const deleteBtn = a.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', deleteItem);

  //complete task buttons
  const completeBtn = a.querySelector('.check-box');
  completeBtn.addEventListener('click', completeTask);

  // append child and add to local storage
  list.appendChild(a);
}