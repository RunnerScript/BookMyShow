const express = require("express");
const movieRouter = express.Router();
const { getAllMovies } = require('../controllers/movie.controller');
movieRouter.get('/', getAllMovies);
module.exports = movieRouter; 