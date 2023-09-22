import { open, writeFile, appendFile } from 'node:fs/promises';
import csv from "csvtojson"

async function csvToJson(path){
	try {
		const newFilePath='./csvdirectory/nodejs-hw1-ex1.txt';
		const file = await open(path);
		let headers;
		writeFile(newFilePath, '');
	
		for await (const line of file.readLines()) {
			console.log(line);
			csv()
				.fromString(line)
				.on('header', (headerLine) => {
					//header=> [header1, header2, header3]
					if (!headers) {
						headers = headerLine
					}
					else {
						const formatLine = getFormatLine(headers, headerLine);
						appendFile(newFilePath, `${formatLine}\n`);
					}
				})
				.on('error', (err) => {
					console.log(err)
				})
		}
	}
	catch(err){
		console.log(err);
	}
}

function getFormatLine(headers, fields){
	const resultObj = {};
	fields.forEach((field, idx) => {
		const key = headers[idx] || `field${idx+1}`;
		resultObj[key] = field;
	});
	return JSON.stringify(resultObj);
}

csvToJson('./csvdirectory/nodejs-hw1-ex1.csv');
