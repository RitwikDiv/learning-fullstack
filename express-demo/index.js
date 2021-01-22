const Joi = require('joi');
const express = require('express');

const app = express();

// To make sure that the body takes json objects
app.use(express.json());

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
        return res.status(404).send(JSON.stringify("Course with a given id wasn't found"));
    }
    res.send(course);
});

// app.get('/api/posts/:year/:month', (req,res) => {
//     res.send(`Finding all posts that were created in ${req.params.month} of ${req.params.year}`);
// });

app.post('/api/courses', (req,res) => {

    const {error} = validateCourse(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/course/:id', (req, res)=> {
    // look up the course
    // if not exists return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send(JSON.stringify("Course with a given id wasn't found"));
    }
    
    // validate
    // if invalid, return 400
    const {error} = validateCourse(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    //update course
    //return updated course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){
        return res.status(404).send(JSON.stringify('The course you are trying to delete doesnt exist'));
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});


// setting port as an env var
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}