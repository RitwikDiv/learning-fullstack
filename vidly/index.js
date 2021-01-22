// Importing the necessary packages
const express = require('express');
const Joi = require('joi');

// Creating the express app and allowing it to use json
const app = express();
app.use(express.json());

// Create a joi validation schema function
function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        isPopular: Joi.boolean().required()
    });
    return schema.validate(genre);
}

// Sample data
const genres = [
    {
        id: 1,
        name: 'horror',
        isPopular: true 
    },
    {
        id: 2,
        name: 'action',
        isPopular: true
    },
    {
        id: 3, 
        name: 'romance',
        isPopular: false
    }
];


// Get home page
app.get('/api/', (req,res) => {
    res.send("Welcome to vidly backend service. Use the appropriate api gateways. ");
});

// Get all genres
app.get('/api/genres', (req,res) => {
    res.send(genres);
});

// Get one genre
app.get('/api/genres/:id', (req,res) =>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`Couldn't find genre with id: ${req.params.id}`);
    res.send(genre);
});

// Post a genre
app.post('/api/genres', (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name,
        isPopular: req.body.isPopular
    };
    genres.push(genre);
    res.send(genre);
});

// Put a genre
app.put('/api/genres/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`Couldn't find genre to update with id: ${req.params.id}`);

    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    genre.isPopular = req.body.isPopular;
    res.send(genre);
});

// Delete a genre
app.delete('/api/genres/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`Couldn't find genre to update with id: ${req.params.id}`);

    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});

// Starting the app and listening to it at a port
const port = process.env.PORT || 3000;
app.listen


nsole.log(`Listening at port ${port}`);
});