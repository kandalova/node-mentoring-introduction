import { readFile, writeFile } from 'node:fs/promises';

export async function readData(dataPath) {
	console.log('read', dataPath);
	try {
		const data = await readFile(dataPath, 'utf8');
		return JSON.parse(data);
	}
	catch (err) {
		throw err
	}
}

export async function writeData(dataPath, data) {
	console.log('write', dataPath);
	console.log('write', data);
	try {
		await writeFile(dataPath, JSON.stringify(data), 'utf8');
	}
	catch (err) {
		throw err
	}
}
