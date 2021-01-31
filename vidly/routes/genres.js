// Loading express
const express = require('express');
const Joi = require('joi');
const mongoose = require("mongoose");

// Initialize the router
const router = express.Router();

// Creating a schema and model
const genreSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minLength: 2,
        maxLength: 50
    },
    isPopular: {
        type: Boolean,
        required: true
    }
});

const Genre = mongoose.model("Genre", genreSchema);


// Create a joi validation schema function
function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        isPopular: Joi.boolean().required()
    });
    return schema.validate(genre);
}


// Get all genres
router.get('/', async (req,res) => {
    const genres = await Genre
    .find()
    .sort({name: 1});
    res.send(genres);
});

// Get one genre
router.get('/:id', async (req,res) =>{
    const id = req.params.id;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send(`Couldn't find genre with id: ${id}`);
    res.send(genre);
});

// Post a genre
router.post('/', async (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({
        name: req.body.name,
        isPopular: req.body.isPopular
    });
    genre = await genre.save();
    res.send(genre);
});

// Put a genre
router.put('/:id', async (req,res) => {
    // Validate first
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find by id and update
    const id = req.params.id;
    const genre = await Genre.findByIdAndUpdate(id, {
        name: req.body.name,
        isPopular: req.body.isPopular
    });
    
    // If genre didn't exist, return
    if (!genre) return res.status(404).send(`Couldn't find genre to update with id: ${id}`);
    res.send(genre);
});

// Delete a genre
router.delete('/:id', async (req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send(`Couldn't find genre to update with id: ${req.params.id}`);
    res.send(genre);
});


module.exports = router;