// Importing the necessary packages
const express = require('express');

// load mongoose
const mongoose = require("mongoose");

const config = require('config'); // loading config files

// Connect Mongoose 
const uri = `mongodb+srv://${config.get("mongo").username}:${config.get("mongo").password}@sandbox.vlco9.mongodb.net/playground?retryWrites=true&w=majority`;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(uri)
    .then(() => console.log("Connected to the MongoDB"))
    .catch(err => console.log(`Couldn't establish a connection: ${err.message}`));

// Importing middleware for logging
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');

const helmet = require('helmet'); // Securing HTTP requests
const morgan = require('morgan'); // Logging HTTP requests

const startupDebugger = require('debug')('app:startup'); //  debugging variable
const dbDebugger = require('debug')('app:db');
// to view different types of logs -> export DEBUG="app:startup"/"app:debug"/"app:*"
// DEBUG=app:db nodemon index.js is a shortcut


// Creating the express app and allowing it to use json
const app = express();
const genres = require('./routes/genres.js');
const home = require('./routes/home.js');

// Setting view engine to take dynamic html files through pug
// app.set('views', './views');
app.set('view engine', 'pug');


// Applying the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true})); // key=value&key=value
app.use(express.static('public')); // Serving static files in the folder public. 
app.use(helmet());

app.use('/api/genres', genres);
app.use('/', home);

// Getting the env
// console.log(`NODE ENV: ${process.env.NODE_ENV}`);
// console.log(`app get env: ${app.get('env')}`);


// set env variables through the following: 
// export NODE_ENV=production for mac
//$env:NODE_ENV="production" for powershell
if (app.get('env') === 'development'){
    app.use(morgan('tiny')); // Logging all the requests. Not for production
    startupDebugger(`Morgan logging enabled`);
}


// assume we have some db stuff
dbDebugger('Connected to the database');

// app.use(logger);
// app.use(authenticate);


// Starting the app and listening to it at a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});