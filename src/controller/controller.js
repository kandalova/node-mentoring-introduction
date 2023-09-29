import { getReqBody, sendResp } from "../utils/resp_utils.js";
import { getId } from "../utils/utils.js";
import { readUser, readUsers, removeUser, rewriteUser, writeUser } from "./users-controller.js";

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
		await getReqBody(req).then(async (body) => {
			const newUser = await writeUser(body);
			sendResp(res, newUser , 201);
		})
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
		await getReqBody(req).then(async (body) => {
			const [id] = getId(req.url);
			await rewriteUser(id, body);
			sendResp(res, "Changed", 204);
		})
	}
	catch (err) {
		throw err;
	}
};
