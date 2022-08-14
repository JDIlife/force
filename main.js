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
				<span class="elsetime">00:00:00</span>
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
			<span class="elsetime">00:00:00</span>
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
		e.target.classList.toggle("btnBgColor");
		console.log(e.target.classList)
	} else if(e.target.className === "stopBtn"){
		e.target.previousSibling.classList.toggle("btnBgColor");
	}
})

// change icon to check

todoList.addEventListener('click', (e) => {
	if(e.target.className === "checkBtn"){
		const checkedBtnIcon = e.target.childNodes[1];
		checkedBtnIcon.classList.toggle('fa-circle-notch');
		checkedBtnIcon.classList.toggle('fa-circle-check');
		console.log(checkedBtnIcon.classList)
	}
})

// stopwatch

let Stopwatch = function(elem, options) {

	let timer = createTimer(),
			startBtn = createBtn("start", start),
			stopBtn = createBtn("stop", stop),
			offset,
			clock,
			interval;

	//default optinos
	options = options || {};
	options.delay = options.delay || 1000;

	// button custom
	startBtn.classList.add("startBtn");
	startBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
	stopBtn.classList.add("stopBtn");
	stopBtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;

	elem.appendChild(startBtn);
	elem.appendChild(stopBtn);
	startBtn.appendChild(timer);
	// initialize
	reset();

	function createTimer() {
		return document.createElement("span");
	}

	function createBtn(action, handler) {

		let btn = document.createElement("button");
		
		btn.addEventListener("click", function(event){
			handler();
			event.preventDefault();
		});
		return btn;
	}

	function start() {
		if(!interval) {
			offset = Date.now();
			interval = setInterval(update, options.delay);
		}
	}

	function stop() {
		if(interval) {
			clearInterval(interval);
			interval = null;
		}
	}

	function reset() {
		clock = 0;
		render(0);
	}

	function update() {
		clock += delta();
		render();
	}

	function render() {
		let hour = Math.floor(clock / (1000 * 60 * 60)) % 24;
		let min = Math.floor(clock / (1000 * 60)) % 60;
		let sec = Math.floor(clock / 1000) % 60;

		if (hour < 10) {
			hour = "0" + hour;
		}
		if (min < 10) {
			min = "0" + min;
		}
		if (sec < 10) {
			sec = "0" + sec;
		}

		timer.innerHTML = hour + ':' + min + ':' + sec;
	}

	function delta() {
		let now = Date.now(),
				d = now - offset;
		offset = now;
		return d;
	}

	this.start = start;
	this.stop = stop;
	this.reset = reset;
}

let elems = document.getElementsByClassName("stopwatch");



function createStopwatch(elems) {
	for(let i = 0; i < elems.length; i++){
		new Stopwatch(elems[i]);
		console.log("elems.lenght = ", elems.length)
	}
}


// init db

dbfunc.dbinit();


// show todo and else items when refresh the page
//dbfunc.createTodo();
//dbfunc.createElse();
// 중복되는 문제 
createStopwatch(elems);

// make item with enter and delete itemInput

elseList.addEventListener('keypress', (e) => {
	if(e.target.value != "" && e.key === 'Enter'){
		dbfunc.acceptElse(e);
		e.target.parentElement.remove();
		elseList.innerHTML += `
			<div class="elseItem">
				<button class="deleteBtn">
					<i class="fa-solid fa-ban"></i>
				</button>
				<span>${e.target.value}</span>
				<span class="stopwatch">
				</span>
			</div>
	`;
	}
})

todoList.addEventListener('keypress', (e) => {
	if(e.target.value != "" && e.key === 'Enter'){
		dbfunc.acceptTodo(e);
		e.target.parentElement.remove();
		todoList.innerHTML += `
			<div class="elseItem">
				<button class="deleteBtn">
					<i class="fa-solid fa-ban"></i>
				</button>
				<span>${e.target.value}</span>
				<span class="stopwatch">
				</span>
				<button class="checkBtn">
					<i class="fa-solid fa-circle-notch"></i>
				</button>
			</div>
		`;
	}
})

itemArea.addEventListener('keypress', (e) => {
	if(e.key === 'Enter'){
		createStopwatch(elems);
		console.log("startBtn length = ", elems.length);
	}
})
