import { createServer } from "http";
import { createNewUser, deleteUser, getUserById, getUsers, updateUser } from "./src/controller/controller.js";
import { isUserById, stripTrailingSlash } from "./src/utils/utils.js";
import { sendResp } from "./src/utils/resp_utils.js";

const server = createServer(async (req, res) => {
	try {
		const url = stripTrailingSlash(req.url);
		console.log(url);
		console.log(req.method);

		if (req.method === 'GET' && url === '/users') {
			await getUsers(res);
		}
		else if (req.method === 'GET' && isUserById(url)) {
			await getUserById(req, res);
		}
		else if (req.method === 'POST' && url === '/users') {
			await createNewUser(req, res);
		}
		else if (req.method === 'DELETE' && isUserById(url)) {
			await deleteUser(req, res);
		}
		else if (req.method === 'PATCH' && isUserById(url)) {
			await updateUser(req, res);
		}
		else {
			throw new Error('No such resource');
		}
	}
	catch ({ message }) {
		console.log('Error', message);
		sendResp(res, message, 404);
	}
})

server.listen(3000, () => {
	console.log('Server is running on port 3000');
})
