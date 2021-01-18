const _ = require('underscore');

// How a require statement is fullfilled
// 1. Checks if this value is a core node module
// 2. Check if there is a file/folder with the given name
// 3. Checks if a module belongs to node_modules

var result = _.contains([1,2,3,4,5], 3);
console.log(`Result of contains: ${result}`);