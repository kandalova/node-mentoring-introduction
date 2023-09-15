# node-mentoring-introduction
Task 3
https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/event-emitter-vs-buffers-vs-streams/Homework

## Subtask 1 
Write your own EventEmitter class. 
It must contain 
- <code>on / addEventListener</code> method, 
- <code>off / removeEventListener</code> method,
- <code>once</code> method,
- <code>emit</code> method,
- <code>rawListeners</code> method,
- <code>listenerCount</code> method.
This basic features are sufficient to implement a full system using the eventing model.

Test result: 

<img width="683" alt="2023-09-14_22h43_54" src="https://github.com/kandalova/node-mentoring-introduction/assets/26093763/709017e9-e37b-4e71-9c24-22843d8c2c45">

## Subtask 2
Write a class <code>WithTime</code> which should extend your own class EventEmitter. 

<code>WithTime</code> must execute some Async function with arguments and compute the time taken by this function.

Execution must emit event start and end of execute and console.log of result data. This data must be gotten from Async function.

Test result:

![2023-09-15_20h27_13](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/953a3aae-04fb-4f63-a231-b045a5febb96)
