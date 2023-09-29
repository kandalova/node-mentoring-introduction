import { sendResp } from "../utils/resp_utils.js";
import { getId } from "../utils/utils.js";
import { readUser, readUsers, removeUser, rewriteUser, writeUser } from "./users-controller.js";

const DB_PATH = "src/db/users.json";

export const getUsers = async (res) => {
	try {
		const users = await readUsers();
		sendResp(res, users);
	}
	catch (err) {
		throw err;
	}
};

export const getUserById = async (req, res) => {
	try {
		const [id] = getId(req.url);
		const user = await readUser(id);
		sendResp(res, user);
	}
	catch (err) {
		throw err;
	}
};


export const createNewUser = async (req, res) => {
	try {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk;
		});
		req.on('end', async () => {
			const newUser = JSON.parse(body);
			await writeUser(newUser);
			sendResp(res, "Created", 201);
		});
	}
	catch (err) {
		throw err;
	}
};

export const deleteUser = async (req, res) => {
	try {
		const [id] = getId(req.url);
		await removeUser(id);
		sendResp(res, "Deleted", 204);
	}
	catch (err) {
		throw err;
	}
};


export const updateUser = async (req, res) => {
	try {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk;
		});
		req.on('end', async () => {
			const [id] = getId(req.url);
			const newValues = JSON.parse(body);
			await rewriteUser(id, newValues);
			sendResp(res, "Changed", 204);
		});
		
	}
	catch (err) {
		throw err;
	}
};
