const express = require('express');
const router = express.Router();
const Movies = require('../models/movies');

// GET all
router.get('/', async (req, res) => {
    try {
        const movies = await Movies.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// GET one 
router.get('/:id', getMovie, (req, res) => {
    res.send(res.movie);

});

// Creating one
router.post('/', async (req, res) => {
    const movie = new Movies({
        title: req.body.title,
        director: req.body.director,
        releaseDate: req.body.releaseDate
    });
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
        
    } catch (err){
        res.status(400).json({message: err.message});
    }

});


// Updating one
router.patch('/:id', getMovie, async (req, res) => {
    if (req.body.title != null) {
        res.movie.title = req.body.title;
    }
    if (req.body.director != null) {
        res.movie.director = req.body.director;
    }
    if (req.body.releaseDate != null) {
        res.movie.releaseDate = req.body.releaseDate;
    }

    try {
        const updatedMovie = await res.movie.save();
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message })

    }

});

// Deleting one
router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.remove();
        res.json({ message: "Deleted Movie"});
    } catch (err) {
        res.status(500).json({ message: err.message})

    }
});

async function getMovie(req, res, next) {
    let movie = null;
    try {
        movie = await Movies.findById(req.params.id);
        if (movie == null) {
            return res.status(404).json('Cannot find Movie :(');
        }
    } catch (err) {
        return res.status(500).json({message: "500 sorry"});
    }
    res.movie = movie;
    next();
}

module.exports = router;