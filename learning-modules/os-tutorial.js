const os = require('os');

var totalMem = os.totalmem();
console.log(`Total Memory available ${totalMem}`);

var freeMem = os.freemem();
console.log(`Free memory available ${freeMem}`);