const express = require('express');
const app = express();

// Methods
// app.get()
// app.post()
// app.put()
// app.delete()

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

app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.query);
});

// setting port as an env var
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});