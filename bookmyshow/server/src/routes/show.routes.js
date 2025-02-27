const express = require('express');
const { getAllShows, createNewShow, getTheatreAndShowsByMovieId } = require('../controllers/show.controller');
const { verifyToken, verifyAdminOrPartner } = require('../middlewares/auth.middleware');
const showRouter = express.Router();

showRouter.get('/', [verifyToken], getAllShows);
showRouter.post('/', [verifyToken, verifyAdminOrPartner], createNewShow);
showRouter.get('/movies/:movieId/', [verifyToken], getTheatreAndShowsByMovieId);

module.exports = showRouter;