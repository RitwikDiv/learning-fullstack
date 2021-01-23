// Importing the necessary packages
const express = require('express');

// Importing middleware for logging
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');

const helmet = require('helmet'); // Securing HTTP requests
const morgan = require('morgan'); // Logging HTTP requests
const config = require('config'); // loading config files

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


// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail').host}`);
console.log(`Mail Password: ${config.get('mail.password')}`); 
// get password from custom-environment-variables.json


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