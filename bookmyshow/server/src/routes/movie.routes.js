const express = require("express");
const movieRouter = express.Router();
const { getAllMovies, createNewMovie } = require('../controllers/movie.controller');
const { verifyToken } = require("../middlewares/auth.middleware");

movieRouter.get('/', [verifyToken], getAllMovies);
movieRouter.post('/', [verifyToken], createNewMovie);
module.exports = movieRouter; 