function sayHello(name){
    console.log("Hello ", name);
}

sayHello('Ritwik');

// You can't call unknown objects or you will get errors (duh)
// console.log(window);

// Some global objects
// console.log();
// setTimeout() - To call a function after a certain timeout
// clearTimeout() - To remove the timeout after
// setInterval() - to call a function repeatedly after a certain interval
// clearInterval() - Stop a function from being called repeatedly

// You can also use the module object to view everything about the project
// console.log(module);

const logger = require('./logger');
logger('message');