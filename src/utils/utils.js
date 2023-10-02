import {URL} from 'node:url';

export function isUserById(url){
	return /users\/(\d+)$/.test(url);
}

export function isUserHobbies(url){
	return /users\/(\d+)\/hobbies$/.test(url);
}

export function isUserHobby(url){
	console.log(url);
	console.log(/users\/(\d+)\/hobbies\/\w+$/.test(url));
	return /users\/(\d+)\/hobbies\/\w+$/.test(url);
}

function handleRequstUrl(req){
	const baseURL = 'http://' + req.headers.host + '/';
	return new URL(req.url, baseURL);
}

export function stripTrailingSlash(url){
	//replace end slash
	let result = url.replace(/\/$/, '');
	//remove double slash
	result = result.replace(/\/\//, '/');
	return result;
}

export function getId(url){
	return url.match(/([0-9]+)$/g);
}

export function getIdForHobbies(url){
	return url.match(/([0-9]+)\/hobbies/);
}

export function getHobby(url){
	return url.match(/\w+$/);
}

export function getNewId(arr){
	let isExistingId = true;
	let id;
	do{
		id = getRandom(1, arr.length+100);
		isExistingId = arr.find(e => e.id == id);
	}while (isExistingId);
	return id;
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomString(min, max) {
	return getRandom(min, max).toString();
}
