export const sendResp = (res, data, status = 200) => {
	res.writeHead(status, { "Content-Type": "application/json" });
	res.end(JSON.stringify(data));
}

export const getReqBody = (req) => {
	return new Promise((resolve, reject) => {
		try {
			let body = "";
			req.on("data", (chunk) => {
				body += chunk;
			});
			req.on("end", () => {
				resolve(JSON.parse(body));
			});
		} catch (error) {
			reject(error);
		}
	});
}

const sendErrorResp = (res, error) => {
	sendResp(res, error, 404);
}
