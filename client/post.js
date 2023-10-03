import { request } from 'http';
import { getRandomString } from '../src/utils/utils.js';

const options = {
  hostname: 'http://localhost:3000/',
  port: 3000,
  path: '/users',
  method: 'POST',
};
const randomIntString = getRandomString(10,100);

const newUser = {
  name: "New User" + randomIntString,
  email: randomIntString + '@google.com',
  hobbies: ['series', 'sport', randomIntString],
}

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

req.on('error', (error) => {
  console.error(`Request Error: ${error.message}`);
});

req.write(JSON.stringify(newUser));
req.end();

console.log('Starting POST request');
