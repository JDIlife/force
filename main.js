// import modules
import * as dbfunc from './db.js';

// pages
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

// area
const autoDateTime = document.getElementById('autoDateTime');
const etcArea = document.getElementById('etcArea');
const todoArea = document.getElementById('todoArea');
const arrowArea = document.getElementById('arrowArea');

// list
const elseList = document.getElementById('elseList');
const todoList = document.getElementById('todoList');

// buttons
const addElseBtn = document.getElementById('addElseBtn');
const addTodoBtn = document.getElementById('addTodoBtn');
const deleteBtn = document.getElementsByClassName('deleteBtn');
const leftArrowBtn = document.getElementById('leftArrowBtn');
const rightArrowBtn = document.getElementById('rightArrowBtn');


// auto date and time

let getTime = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const days = String(date.getDate()).padStart(2, "0");
	const hour = String(date.getHours()).padStart(2, "0");
	const minute = String(date.getMinutes()).padStart(2, "0");
	const second = String(date.getSeconds()).padStart(2, "0");
	autoDateTime.innerHTML = `${year}/${month}/${days}/ ${hour}:${minute}:${second}`
}

setInterval(getTime, 1000);

// add something else

addElseBtn.addEventListener('click', () => {
	return(elseList.innerHTML += `
		<div class="elseItemInput">
			<button class="deleteBtn">
				<i class="fa-solid fa-ban"></i>
			</button>
			<input type="text" class"elseInput">
			<button class="startBtn">
				<i class="fa-solid fa-circle-play"></i>
				<span class="elsetime">elseTime</span>
			</button>
		</div>
		`)
})


// add todo
addTodoBtn.addEventListener('click', () => {
	return(todoList.innerHTML += `
	<div class="todoItemInput">
		<button class="deleteBtn">
			<i class="fa-solid fa-ban"></i>
		</button>
		<input type="text" class"todoInput">
		<button class="startBtn">
			<i class="fa-solid fa-circle-play"></i>
			<span class="elsetime">todoTime</span>
		</button>
		<button class="checkBtn">
			<i class="fa-solid fa-circle-notch"></i>
		</button>
	</div>
	`)
})


// delete item in itemArea

itemArea.addEventListener('click', (e) => {
	if(e.target.className === "deleteBtn"){
		const deletedItem = e.target.parentElement;
		dbfunc.deleteItem(e);
		deletedItem.remove();
	}
})

// change start icon to stop icon

itemArea.addEventListener('click', (e) => {
	if(e.target.className === "startBtn"){
		const startBtnIcon = e.target.childNodes[1];
		startBtnIcon.classList.toggle('fa-circle-play');
		startBtnIcon.classList.toggle('fa-circle-pause');
	}
})

// change icon to check

todoList.addEventListener('click', (e) => {
	if(e.target.className === "checkBtn"){
		const checkedBtnIcon = e.target.childNodes[1];
		checkedBtnIcon.classList.toggle('fa-circle-notch');
		checkedBtnIcon.classList.toggle('fa-circle-check');
	}
})

// init db

dbfunc.dbinit();


// show todo and else items when refresh the page
dbfunc.createTodo();
dbfunc.createElse();

// make item with enter and delete itemInput

elseList.addEventListener('keypress', (e) => {
	if(e.target.value != "" && e.key === 'Enter'){
		dbfunc.acceptElse(e);
		e.target.parentElement.remove();
	}
})

todoList.addEventListener('keypress', (e) => {
	if(e.target.value != "" && e.key === 'Enter'){
		dbfunc.acceptTodo(e);
		e.target.parentElement.remove();
	}
})
