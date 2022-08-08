
export function dbinit(){

	if(!window.indexedDB) {
		window.alert("this browser does't support indexedDB");
	}

	let db;

	let request = indexedDB.open("force", 1);

	request.onerror = function(e) {
		alert('database error: ' + e.message);
	}

	request.onsuccess = function(e) {
		let db = request.request;
	}

	request.onupgradeneeded = function(e) {
		let db = request.result;

		let todayStore = db.createObjectStore("todayStore", {keyPath:"id", autoIncrement: true});
		let totalDayStore = db.createObjectStore("totalDayStore", {keyPath:"id"});

		todayStore.createIndex("elseName", "elseName", {unique: false});
		todayStore.createIndex("elseTime", "elseTime", {unique: false});
		todayStore.createIndex("todoName", "todoName", {unique: false});
		todayStore.createIndex("todoTime", "todoTiem", {unique: false});
		todayStore.createIndex("etcTime", "etcTime", {unique: false});


	}

}

export let acceptTodo = (e) => {

	let request = indexedDB.open("force", 1);
	request.onerror = function(event) {
		alert('database error: ' + event.target.errorCode);
	}

	request.onsuccess = (event) => {
		let db = request.result;
		let transaction = db.transaction(['todayStore'], 'readwrite');
		transaction.onerror = (event) => console.log('failed');
		transaction.oncomplete = (event) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let addReq = objStore.add({
			todoName: e.target.value
		})
	}
	createTodo();
}

export let createTodo = () => {

	let request = window.indexedDB.open('force', 1);
	request.onerror = (e) => alert('database error', e.target.errorCode);
	
	request.onsuccess = (e) => {
		let db = request.result;
		let transaction = db.transaction(['todayStore'], 'readonly');
		transaction.onerror = (e) => console.log('error');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');

		let todoNameIndex = objStore.index('todoName');
		let todoNameReq = todoNameIndex.openCursor();

		todoNameReq.onsuccess = (e) => {
			let cursor = e.target.result;

			if(cursor){
				let value = todoNameIndex.get(cursor.key);

				value.onsuccess = (event) => {
					return(todoList.innerHTML += `
						<div class="todoItem" id=${value.result.id}>
							<button class="deleteBtn">
								<i class="fa-solid fa-ban"></i>
							</button>
							<span>${value.result.todoName}</span>
							<button class="startBtn">
								<i class="fa-solid fa-circle-play"></i>
								<span class="todoTime">todoTime</span>
							</button>
							<button class="checkBtn">
								<i class="fa-solid fa-circle-notch"></i>
							</button>
						</div>
						`)
				}
				cursor.continue();
			}
		}
	}
}

export let acceptTodoTime = () => {
	let request = window.indexedDB.open('force', 1);
	request.onerror = (e) => console.log('error');
	request.oncomplete = (e) => {
		let db = request.request;
		let transaction = db.transaction(['todayStore'], 'readwrite');
		transaction.onerror = (e) => console.log('failed');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let addReq = objectStore.add({
			todoTime: todoTime.value
		})
	}
}

export let acceptElse = (e) => {

	let request = indexedDB.open("force", 1);
	request.onerror = function(event) {
		alert('database error: ' + event.target.errorCode);
	}

	request.onsuccess = (event) => {
		let db = request.result;
		let transaction = db.transaction(['todayStore'], 'readwrite');
		transaction.onerror = (event) => console.log('failed');
		transaction.oncomplete = (event) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let addReq = objStore.add({
			elseName: e.target.value
		})
	}
	createElse();
}

export let createElse = () => {

	let request = window.indexedDB.open('force', 1);
	request.onerror = (e) => alert('database error', e.target.errorCode);
	
	request.onsuccess = (e) => {
		let db = request.result;
		let transaction = db.transaction(['todayStore'], 'readonly');
		transaction.onerror = (e) => console.log('error');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let elseNameIndex = objStore.index('elseName');

		let elseNameReq = elseNameIndex.openCursor();

		elseNameReq.onsuccess = (e) => {
			let cursor = e.target.result;

			if(cursor){
				let value = elseNameIndex.get(cursor.key);

				value.onsuccess = (event) => {
					return(elseList.innerHTML += `
						<div class="elseItem" id=${value.result.id}>
							<button class="deleteBtn">
								<i class="fa-solid fa-ban"></i>
							</button>
							<span>${value.result.elseName}</span>
							<button class="startBtn">
								<i class="fa-solid fa-circle-play"></i>
								<span class="elseTime">elseTime</span>
							</button>
						</div>
						`);
				};
				cursor.continue();
			}
		}
	}

}

export let acceptElseTime = () => {
	let request = window.indexedDB.open('force', 1);
	request.onerror = (e) => console.log('error');
	request.oncomplete = (e) => {
		let db = request.request;
		let transaction = db.transaction(['todayStore'], 'readwrite');
		transaction.onerror = (e) => console.log('failed');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let addReq = objectStore.add({
			elseTime: elseTime.value
		})
	}

}

export let acceptEtcTime = () => {

	let request = window.indexedDB.open('force', 1);
	request.onerror = (e) => console.log('error');
	request.oncomplete = (e) => {
		let db = request.request;
		let transaction = db.transaction(['todayStore'], 'readwrite');
		transaction.onerror = (e) => console.log('failed');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let addReq = objectStore.add({
			elseTime: elseTime.value
		})
	}
}

export let deleteItem = (event) => {

	let request = window.indexedDB.open('force', 1);
	request.onerror = (e) => console.log('error')
	request.onsuccess = (e) => {
		let db = request.result;
		let transaction = db.transaction(['todayStore'], 'readwrite');
		transaction.onerror = (e) => console.log('error');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let deleteReq = objStore.delete(Number(event.target.parentElement.id));
		deleteReq.onsuccess = (e) => {
			console.log('delete Item');
		}
	}
}

export let makeTotalTime = () => {

	let request = window.indexedDB.open('force', 1);
	request.onerror = (e) => console.log('failed');
	request.oncomplete = (e) => {
		let db =request.request;
		let transaction = db.transaction(['todayStore'], 'readwrite');
		transaction.onerror = (e) => console.log('failed');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let getTodoTimeReq = objStore.getAll('todoTime')
		getTodoTimeReq.onsuccess = (e) => {
			//console.log('todoTime', getTodoTimeReq.result);
			//let totalTodoTime = ...
			//return totalTodoTime;
		}

		let getElseTimeReq = objStore.getAll('elseTime');
		getElseTimeReq.onsuccess = (e) => {
			//let totalElseTime = ...
			// return totalElseTime;
		}

		let getEtcTimeReq = objStore.getAll('etcTime');
		getEtcTimeReq.onsuccess = (e) => {
			//let getElseTimeReq = ...
			//return getElseTimeReq;
		}

		let totalTransaction = db.transaction(['totalDayStore'], 'readwrite');
		totalTransaction.onerror = (e) => console.log('failed');
		totalTransaction.oncomplete = (e) => console.log('success');

		let totalObjStoreReq = totalTransaction.objectStore('totalDayStore');
		let addTotalReq = totalObjStoreReq.add({
			//dayId: totalTodoTime, totalelseTime, totalEtcTime
		})
	}

}
