const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    director: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    language: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    }

}, { timestamps: true });

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = MovieModel;