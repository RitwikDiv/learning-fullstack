// Importing necessary packages
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const dbDebugger = require("DEBUG")("app:db");

// Connect to mongodb
const uri = `mongodb+srv://${config.get("mongo").username}:${config.get("mongo").password}@sandbox.vlco9.mongodb.net/playground?retryWrites=true&w=majority`;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(uri)
    .then(result => dbDebugger("Connected to the DB!"))
    .catch(err => dbDebugger(`Unable to connect to DB: ${err.message}`));

// Create the express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Applying the routes
const customers = require("./routes/customers");
app.use('/api/customers', customers);

// Setting up a listener to a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at ${port}`);
})