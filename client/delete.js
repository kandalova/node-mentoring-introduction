import { request } from 'http';
import { createInterface } from "node:readline"


const readline = createInterface({
	input: process.stdin,
	output: process.stdout
});

readline.question('Enter id (number)', id => {
	readline.close();

	const options = {
		hostname: 'http://localhost:3000',
		port: 3000,
		path: `/users/${id}`,
		method: 'DELETE',
	};

	const req = request(options, (res) => {
		console.log(`Status Code: ${res.statusCode}`);
		console.log('Response Headers:', res.headers);

		res.on('data', (chunk) => {
			console.log(`Received Data: ${chunk}`);
		});

		res.on('end', () => {
			console.log('Request Complete');
		});
	});

	console.log('Starting DELETE request');
	req.on('error', (error) => {
		console.error(`Request Error: ${error.message}`);
	});
	req.end();

});
