const Joi = require('joi');
const express = require('express');

const app = express();

// To make sure that the body takes json objects
app.use(express.json);

// Sample data collection
const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'},
];

// Callback is called route handler
app.get('/', (req, res) =>{
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send(JSON.stringify("Course with a given id wasn't found"));
    }
    res.send(course);
});

// app.get('/api/posts/:year/:month', (req,res) => {
//     res.send(`Finding all posts that were created in ${req.params.month} of ${req.params.year}`);
// });

app.post('/api/courses', (req,res) => {

    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);
    
    if (result.error){
        res.status(400).send(result.error.details[0].message);
    }

    // Performing regular input validation
    // if (!req.body.name || req.body.name.length < 3){
    //     res.status(400).send(JSON.stringify("Name is a required field and should be 3 characters."));
    //     return;
    // }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});



// setting port as an env var
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});