const autoDateTime = document.getElementById('autoDateTime');
const etcArea = document.getElementById('etcArea');
const todoArea = document.getElementById('todoArea');
const arrowArea = document.getElementById('arrowArea');






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
