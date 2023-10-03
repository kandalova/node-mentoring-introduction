import { request } from 'http';
import { getRandomString } from '../src/utils/utils.js';

const options = {
  hostname: 'http://localhost:3000/',
  port: 3000,
  path: '/users/3',
  method: 'PATCH',
};
const randomIntString = getRandomString(10,100);

const newValues = {
  name: "Changed Name"+randomIntString,
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

req.write(JSON.stringify(newValues));
req.end();

console.log('Starting PATCH request');
