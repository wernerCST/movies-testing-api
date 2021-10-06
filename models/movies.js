const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    director: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: false,
        default: Date.now
    }

});

module.exports = mongoose.model('Movies', movieSchema);