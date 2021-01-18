// console.log(module);
// console.log(exports);
// console.log(__filename); 
// console.log(__dirname);

var url = 'http://mylogger.io/log';

function log(message){
    // send the http request to the loggin service 
    console.log(message);
}

// module.exports.log = log;
module.exports = log; // To import a single function
// module.exports.logEndpoint = url;