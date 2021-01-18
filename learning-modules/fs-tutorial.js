const fs = require('fs');

// Reading files sync
const files = fs.readdirSync('./');
console.log(files);


// Reading files async with callback
const asyncFiles = fs.readdir('./', (err,result) => {
    if (err) console.log(`Error -> ${err}`);
    else console.log(`Result -> ${result}`);
});
