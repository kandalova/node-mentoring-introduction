import { getReqBody, sendResp } from "../utils/resp_utils.js";
import { getHobby, getId, getIdForHobbies } from "../utils/utils.js";
import { popUserPropertyValue, pushUserPropertyValue, readUser, readUsers, removeUser, rewriteUser, writeUser } from "./users-controller.js";

const removeUserHobbies = (users) => {
	return users.map(({ hobbies, ...rest }) => {
		return rest;
	})
};

export const getUsers = async (res) => {
	try {
		let users = await readUsers();
		users = removeUserHobbies(users);
		sendResp(res, users);
	}
	catch (err) {
		throw err;
	}
};

export const getUserById = async (req, res) => {
	try {
		const [id] = getId(req.url);
		const { hobbies, ...user } = await readUser(id);
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
			sendResp(res, newUser, 201);
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

export const getUserHobbies = async (req, res) => {
	try {
		const [_, id] = getIdForHobbies(req.url);
		const { hobbies } = await readUser(id);
		sendResp(res, hobbies);
	}
	catch (err) {
		throw err;
	}
};


export const createUserHobby = async (req, res) => {
	try {
		await getReqBody(req).then(async (body) => {
			const [_, id] = getIdForHobbies(req.url);
			if(!body.hobby){
				throw new Error("Can't create without 'hobby' value")
			}
			await pushUserPropertyValue(id, "hobbies", body.hobby);
			sendResp(res, "Created", 201);
		})
	}
	catch (err) {
		throw err;
	}
};

export const deleteUserHobby = async (req, res) => {
	try {
		const [_, id] = getIdForHobbies(req.url);
		const [hobby] = getHobby(req.url);
		await popUserPropertyValue(id, "hobbies", hobby);
		sendResp(res, "Deleted", 204);
	}
	catch (err) {
		throw err;
	}
};
