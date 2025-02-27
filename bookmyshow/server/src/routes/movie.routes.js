const express = require("express");
const movieRouter = express.Router();
const { getAllMovies, createNewMovie, updateMovieById, deleteMovieById } = require('../controllers/movie.controller');
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middleware");

movieRouter.get('/', [verifyToken], getAllMovies);
movieRouter.post('/', [verifyToken, verifyAdmin], createNewMovie);
movieRouter.put('/:id', [verifyToken, verifyAdmin], updateMovieById);
movieRouter.delete('/:id', [verifyToken, verifyAdmin], deleteMovieById);

module.exports = movieRouter; 