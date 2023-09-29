export const sendResp = (res, data, status=200)=>{
	res.writeHead(status, { "Content-Type": "application/json" });
	res.end(JSON.stringify(data));
}

const sendErrorResp = (res, error)=>{
	sendResp(res, error, 404);
}
