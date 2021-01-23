// Getting express
const express = require('express');

// Initializing router
const router = express.Router();

// Api calls
router.get('/', (req,res) => {
    res.render('index', {title: "My Express App", message: "Hello world!"});
});

module.exports = router;