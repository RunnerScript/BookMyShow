const express = require('express');
const { getAllShows, createNewShow, getTheatreAndShowsByMovieId, updateShow, deleteShow, getAllShowsByTheatreId, getShowById } = require('../controllers/show.controller');
const { verifyToken, verifyAdminOrPartner } = require('../middlewares/auth.middleware');
const showRouter = express.Router();

showRouter.get('/', [verifyToken], getAllShows);
showRouter.get('/movies/:movieId/:date', [verifyToken], getTheatreAndShowsByMovieId);
showRouter.get('/:id', [verifyToken], getShowById);
showRouter.post('/', [verifyToken, verifyAdminOrPartner], createNewShow);
showRouter.put('/:id', [verifyToken, verifyAdminOrPartner], updateShow);
showRouter.delete('/:id', [verifyToken, verifyAdminOrPartner], deleteShow);
showRouter.get('/theatre/:id', [verifyToken], getAllShowsByTheatreId);

module.exports = showRouter;