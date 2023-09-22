import EventEmitter from "./EventEmitter.js";

class WithTime extends EventEmitter {

	constructor(){
		super();
	}

	async execute(asyncFunc, ...args) {
		try{
			const start = new Date().getTime();
			this.emit('begin');

			const endHandler = (time, data)=>{
				console.log(`Time: ${time}\nData:\n${data}`);
			}
			this.on('end', endHandler);

			const response = await asyncFunc(...args);
			const data = await response.json();
			const result = JSON.stringify(data, null, " ") 	
			const end = new Date().getTime();
			const time = (end - start)/1000;

			this.emit('end', time, result);

		}
		catch(err){
			console.log(err);
		}	

	}
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

await withTime.execute(fetch, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));
