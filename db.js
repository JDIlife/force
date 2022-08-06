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
}

let acceptTodo = () => {

	let request = indexedDB.open("force", 1);
	request.onerror = function(e) {
		alert('database error: ' + e.target.errorCode);
	}

	request.onsuccess = (e) => {
		let db = request.request;
		let transaction = db.transaction(['todayStore'], 'readwrite');
		transaction.onerror = (e) => console.log('failed');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let addReq = objStore.add({
			todoName: todoName.value
		})
	}
	createTodo();
}

let createTodo = () => {

	let request = window.indexedDB.open('force', 1);
	request.onerror = (e) => alert('database error', e.target.errorCode);
	
	request.onsuccess = (e) => {
		let db = request.request;
		let transaction = db.transaction(['todayStore'], 'readonly');
		transaction.onerror = (e) => console.log('error');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let cursorReq =- objStore.openCursor();

		cursorReq.onsuccess = (e) => {
			let cursor = e.target.result;

			if(cursor){
				let value = objStore.get(cursor.key);

				value.onsuccess = (e) => {
					console.log(e.target.resutl);
					/*
					return(todoList.innerHTML += `
						<div>${value.result.todoName}</div>
						`)
					*/
				}
			}
			cursor.continue();
		}
	}
}

let acceptTodoTime = () => {
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

let acceptElse = () => {

	let request = indexedDB.open("force", 1);
	request.onerror = function(e) {
		alert('database error: ' + e.target.errorCode);
	}

	request.onsuccess = (e) => {
		let db = request.request;
		let transaction = db.transaction(['todayStore'], 'readwrite');
		transaction.onerror = (e) => console.log('failed');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let addReq = objStore.add({
			elseName: elseName.value
		})
	}
	createElse();
}

let createElse = () => {

	let request = window.indexedDB.open('force', 1);
	request.onerror = (e) => alert('database error', e.target.errorCode);
	
	request.onsuccess = (e) => {
		let db = request.request;
		let transaction = db.transaction(['todoStore'], 'readonly');
		transaction.onerror = (e) => console.log('error');
		transaction.oncomplete = (e) => console.log('success');

		let objStore = transaction.objectStore('todayStore');
		let cursorReq =- objStore.openCursor();

		cursorReq.onsuccess = (e) => {
			let cursor = e.target.result;

			if(cursor){
				let value = objStore.get(cursor.key);

				value.onsuccess = (e) => {
					console.log(e.target.resutl);
					//return(elseList.innerHTML += `
						//<div>${value.result.elseName}</div>
						//`)
				}
			}
			cursor.continue();
		}
	}

}

let acceptElseTime = () => {
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

let acceptEtcTime = () => {

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

let makeTotalTime = () => {

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
