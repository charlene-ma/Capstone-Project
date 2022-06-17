
/*
    ===============
    side bar toggle
    ===============
*/

const sideBar = document.querySelector('.side-bar');
const sideBarBtn = document.querySelector('.open-side-bar-btn');
const mainContent = document.querySelector('main');

sideBarBtn.addEventListener('click', function() {
    sideBar.classList.toggle('show-side-bar');
    mainContent.classList.toggle('shift-main');
});

/*
    ===============
    show item input
    ===============
*/

const addTaskBtn = document.querySelector('.add-btn');
const inputContainer = document.querySelector('.add-item-container');

addTaskBtn.addEventListener('click', function() {
    inputContainer.classList.toggle('show-add-item-container');
    sideBar.classList.remove('show-side-bar');
    mainContent.classList.remove('shift-main');
})

/*
    ======================================================
    add item to list and earn currency by completing tasks
    ======================================================
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

// adds currency and removes task when task is completed
const currencyText = document.querySelector('.currency-amount');
let currencyValue = null;
function completeTask(e) {
  currencyValue += 5;
  localStorage.setItem('currencyValue', currencyValue);
  currencyText.textContent = "$" + currencyValue;

  let element = e.currentTarget.parentElement;
  let id = element.dataset.id;
  list.removeChild(element);
  removeFromLocalStorage(id);
}

/*
    ================================
    purchase stickers using currency
    ================================
*/

const clawMachineBtn = document.querySelector('.enter-claw-machine');
const clawMachineContainer = document.querySelector('.claw-machine-container');
const closeMachineBtn = document.querySelector('.machine-x-btn');

// open and close claw machine
clawMachineBtn.addEventListener('click', function() {
  backToNormalMachine();
  clawMachineContainer.classList.add('show-claw-machine');
  sideBar.classList.remove('show-side-bar');
  mainContent.classList.remove('shift-main');
});

closeMachineBtn.addEventListener('click', closeClawMachine);

function closeClawMachine() {
  clawMachineContainer.classList.remove('show-claw-machine');
  okBtn.classList.remove('show-btn');
}

// stickers
let stickers = [
  {
    title: "cat",
    img: "cat.png"
  },
  {
    title: "bear",
    img: "bear.png"
  },
  {
    title: "baby chick",
    img: "baby chick.png"
  },
  {
    title: "tiger",
    img: "tiger.png"
  },
  {
    title: "panda",
    img: "panda.png"
  },
  {
    title: "pig",
    img: "pig.png"
  }
];

// purchase random sticker currencyValue is greater than or equal to $25

const clawMachineText = document.querySelector('.claw-machine-title');
const clawMachineImg = document.querySelector('.machine-img');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const okBtn = document.querySelector('.ok-btn');

function getRandomSticker() {
  return Math.floor(Math.random() * stickers.length);
}

function purchaseSticker() {
  if(currencyValue >= 25) {
    const randomNum = getRandomSticker();
    clawMachineText.textContent = "You have purchased a " + stickers[randomNum].title + " sticker!";
    clawMachineImg.src = stickers[randomNum].img;
    
    yesBtn.classList.add('hide');
    noBtn.classList.add('hide');
    okBtn.classList.add('show-btn');

    currencyValue = currencyValue - 25;
    currencyText.textContent = "$" + currencyValue;
    
    ownedStickers.push(stickers[randomNum].title);
    console.log(ownedStickers);
  } else {
    clawMachineText.textContent = "Sorry, you do not have enough currency to purchase a sticker";
    clawMachineImg.src = "sad.png";

    yesBtn.classList.add('hide');
    noBtn.classList.add('hide');
    okBtn.classList.add('show-btn');
  }
}

function backToNormalMachine() {
  clawMachineText.textContent = "Would you like to purchase a sticker for $25?";
  yesBtn.classList.remove('hide');
  noBtn.classList.remove('hide');
  clawMachineImg.classList.remove('hide');
  clawMachineImg.src = "claw machine.png";
}

yesBtn.addEventListener('click', purchaseSticker);
noBtn.addEventListener('click', closeClawMachine);
okBtn.addEventListener('click', closeClawMachine);

/*
    =======================
    show purchased stickers
    =======================
*/

// open and close modal
const showStickersBtn = document.querySelector('.show-my-stickers');
const stickerContainer = document.querySelector('.owned-stickers-modal');
const closeStickersBtn = document.querySelector('.stickers-x-btn');

showStickersBtn.addEventListener('click', function() {
  stickerContainer.classList.add('show');
  sideBar.classList.remove('show-side-bar');
  mainContent.classList.remove('shift-main');
  showOwnedStickers();
});
closeStickersBtn.addEventListener('click', function() {
  stickerContainer.classList.remove('show');
})

// change opacity of owned sticker to 100%
let ownedStickers = [];

const sticker1 = document.querySelector('.sticker1');
const sticker2 = document.querySelector('.sticker2');
const sticker3 = document.querySelector('.sticker3');
const sticker4 = document.querySelector('.sticker4');
const sticker5 = document.querySelector('.sticker5');
const sticker6 = document.querySelector('.sticker6');

function showOwnedStickers() {
  if(ownedStickers.includes(stickers[0].title) == false) {
    sticker1.classList.add('show-sticker');
    sticker1.style.opacity = "0.2";
  } else {
    sticker1.style.opacity = "1";
  }

  if(ownedStickers.includes(stickers[1].title) == false) {
    sticker2.classList.add('show-sticker');
    sticker2.style.opacity = "0.2";
  } else {
    sticker2.style.opacity = "1";
  }
  
  if(ownedStickers.includes(stickers[2].title) == false) {
    sticker3.classList.add('show-sticker');
    sticker3.style.opacity = "0.2";
  } else {
    sticker3.style.opacity = "1";
  }
  
  if(ownedStickers.includes(stickers[3].title) == false) {
    sticker4.classList.add('show-sticker');
    sticker4.style.opacity = "0.2";
  } else {
    sticker4.style.opacity = "1";
  }
  
  if(ownedStickers.includes(stickers[4].title) == false) {
    sticker5.classList.add('show-sticker');
    sticker5.style.opacity = "0.2";
  } else {
    sticker5.style.opacity = "1";
  }
  
  if(ownedStickers.includes(stickers[5].title) == false) {
    sticker6.classList.add('show-sticker');
    sticker6.style.opacity = "0.2";
  } else {
    sticker6.style.opacity = "1";
  }
}

/*
    ===================
    add important dates
    ===================
*/





