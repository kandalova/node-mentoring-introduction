const DEFAULT_HEADERS={
	"Content-Type": "application/json"		
}
const CACHE_HAEDERS={
	'Cache-control': `public, max-age=300`
}

export const sendResp = (res, data, status = 200, shouldCashed=false) => {
	if(shouldCashed){
		res.writeHead(status, {...DEFAULT_HEADERS, ...CACHE_HAEDERS});
	}
	else{
		res.writeHead(status, DEFAULT_HEADERS);
	}
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
