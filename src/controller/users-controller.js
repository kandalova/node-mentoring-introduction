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
			console.log(`${key}: ${value}`);
			if (user.hasOwnProperty(key)) {
				user[key] = value;
			};
			await writeData(DB_PATH, users);
		}
	}
	catch (err) {
		throw err
	}
}

const throwUserError = (id) => {
	throw new Error(`No user with id ${id} found`);
}
