import { readData, writeData } from "../utils/fs_utils.js";
import { getNewId } from "../utils/utils.js";

const DB_PATH = "src/db/users.json";

export const readUser = async (id) => {
	try {
		const users = await readData(DB_PATH);
		const user = users.find((element) => element.id == id);
		if (!user) {
			throwUserError(id);
		}
		return user;
	}
	catch (err) {
		throw err
	}
}

export const readUsers = async () => {
	try {
		const users = await readData(DB_PATH);
		return users;
	}
	catch (err) {
		throw err
	}
}

export const writeUser = async (user) => {
	try {
		const users = await readData(DB_PATH);
		const newId = getNewId(users);
		if(!user.hobbies){
			user.hobbies=[];
		}
		const newUSer = { id: newId, ...user };
		users.push(newUSer);
		await writeData(DB_PATH, users);
		return newUSer;
	}
	catch (err) {
		throw err
	}
}

export const removeUser = async (id) => {
	try {
		const users = await readData(DB_PATH);
		const index = users.findIndex((element) => element.id == id);
		if (index === -1) {
			throwUserError(id);
		}
		users.splice(index, 1);
		await writeData(DB_PATH, users);
	}
	catch (err) {
		throw err
	}
}

export const rewriteUser = async (id, values) => {
	try {
		const users = await readData(DB_PATH);
		const user = users.find((element) => element.id == id);
		if (!user) {
			throwUserError(id);
		}
		for (const [key, value] of Object.entries(values)) {
			if (!user.hasOwnProperty(key)) {
				throwUserPropertyError(id, key);
			}
			else {
				user[key] = value;
			}
			await writeData(DB_PATH, users);
		}
	}
	catch (err) {
		throw err
	}
}

export const pushUserPropertyValue = async (id, key, value) => {
	try {
		const users = await readData(DB_PATH);
		const user = users.find((element) => element.id == id);
		if (!user) {
			throwUserError(id);
		}
		if (isValidArrayProperty(user, key, value)) {
			user[key].push(value);
			await writeData(DB_PATH, users);
		}
	}
	catch (err) {
		throw err
	}
}


export const popUserPropertyValue = async (id, key, value) => {
	try {
		const users = await readData(DB_PATH);
		const user = users.find((element) => element.id == id);
		if (!user) {
			throwUserError(id);
		}
		if (isValidArrayProperty(user, key)) {
			const index = user[key].findIndex((element) => element === value);
			if (index === -1) {
				throwUserExistValueError(id, key, value);
			}
			user[key].splice(index, 1);
			await writeData(DB_PATH, users);
		}
	}
	catch (err) {
		throw err
	}
}

const isValidArrayProperty = (user, key, value) => {
	if (!user.hasOwnProperty(key)) {
		throwUserPropertyError(user.id, key);
	}
	if (!Array.isArray(user[key])) {
		throwUserArrayError(user.id, key);
	}
	if (value && user[key].includes(value)) {
		throwUserUniqueValueError(user.id, key, value);
	}
	return true;
}

const throwUserError = (id) => {
	throw new Error(`No user with id ${id} found`);
}

const throwUserPropertyError = (id, key) => {
	throw new Error(`User with id ${id} doesn't have the property$ {key}`);
}

const throwUserArrayError = (id, key) => {
	throw new Error(`User with id ${id} doesn't have the array property$ {key}`);
}
const throwUserUniqueValueError = (id, key, value) => {
	throw new Error(`User with id ${id} has the property "${key}" with the value "${value}"`);
}
const throwUserExistValueError = (id, key, value) => {
	throw new Error(`User with id ${id} doesn't have the the value "${value}" within property "${key}"`);
}
