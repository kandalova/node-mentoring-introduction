import { sendResp } from "../utils/resp_utils.js";
import { getHobbyFromUrl } from "../utils/utils.js";

export const getHobby = async (req, res) => {
	try {
		//mock functionality
		const [hobby] = getHobbyFromUrl(req.url);
		sendResp(res, hobby, 200);
	}
	catch (err) {
		throw err;
	}
};
