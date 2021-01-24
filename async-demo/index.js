
// This is synchronus
// First line is blocking the execution until its complete
// Second line ie executed only after the first
console.log(`Before 1`);
console.log(`After 1`);


// This is async
// Async doesn't mean miltithreaded or concurrent since node is single threaded
// After 2 secs code in the function is executed.
// It shedules a task to be performed in the future
setTimeout(() => {
    console.log(`Reading a user from db 1`);
}, 2000);

// The above code will execute Before, After & Reading a user from db

// ---------------------------------------------
 
// Let us combine the previous 2 calls
console.log(`Before 2`);
setTimeout(() => {
    console.log(`Reading a user from db 2`);
}, 2000);
console.log(`After 2`);


// Lets see what happens if we prematurely call and try to allocate 
// a result from async function

console.log(`Before`);

// The result from async function should be available at the time of calling
const user = getUser1(1);
console.log(user);

console.log(`After`);

function getUser1(id){
    setTimeout(() => {
        console.log(`Getting user with id ${id}`);
        return {id: id, github: 'ritwikdiv'};
    }, 2000);
}


