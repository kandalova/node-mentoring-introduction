export default class EventEmitter {
	listeners = {};  // key-value pair
 
	addListener(eventName, fn) {
		this._pushListener(eventName, fn);
	}
		
	on(eventName, fn) {
		this._pushListener(eventName, fn);
 	}
 
	removeListener(eventName, fn) {
		this._filterListeners(eventName, fn);
	}
		
	off(eventName, fn) {
		this._filterListeners(eventName, fn);
	}
 
	once(eventName, fn) {
		const onceWrapper = (...args)=>{			
			this.off(eventName, onceWrapper);
			fn(...args);
		}
		this._pushListener(eventName, onceWrapper);
	}
 
	emit(eventName, ...args) {
		if(this.listeners[eventName]){
			this.listeners[eventName].forEach(listener => {
				listener(...args);
			});
		}
	}
 
	listenerCount(eventName) {
		return this.listeners[eventName].length || 0;
	}
 
	rawListeners(eventName) {
		if(!this.listeners[eventName]){
			throw new Error("There is no such eventName!")
		}
		return [...this.listeners[eventName]];
	}

	_pushListener(eventName, fn){
		if(typeof fn !== "function") {
			throw new Error("Listener must be a function!")
		}

		if(!this.listeners[eventName]){
			this.listeners[eventName] = [];
		}
		this.listeners[eventName].push(fn);
	}

	_filterListeners(eventName, fn){
		if(!this.listeners[eventName]){
			throw new Error("There is no such eventName!")
		}
		this.listeners[eventName] = this.listeners[eventName].filter((currFn)=>currFn !== fn);
	}
 }