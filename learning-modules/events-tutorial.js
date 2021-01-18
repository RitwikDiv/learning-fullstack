const EventEmitter = require('events');
const emitter = new EventEmitter();

// register a listener
emitter.on('messageLogged', (arg) => {
    console.log(`Signal has been recieved!`);
    console.log(arg);
});

// signals that an event has happened
emitter.emit('messageLogged', {
    id: 1, 
    "url": "http://"
});


// Raise: logging with a data: message
emitter.on("logger", (message) => {
    console.log(message);
});

emitter.emit("logger", "Hello I am just testing my emitter");


class Logger extends EventEmitter {
    log(message){
        console.log("Message is logged");
        this.emit("messageLogged", {'data': message});
    }
}

const logger = new Logger();

logger.on("messageLogged", (args) => {
    console.log(args.data);
});

logger.log("testing you");