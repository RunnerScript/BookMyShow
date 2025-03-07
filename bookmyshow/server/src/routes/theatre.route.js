const express = require('express');
const { createTheatre, getAllTheatre, updateTheatreById, deleteTheatreById } = require('../controllers/theatre.controller');
const { verifyToken, verifyAdminOrPartner } = require('../middlewares/auth.middleware');
const threatreRouter = express.Router();

threatreRouter.post('/', [verifyToken, verifyAdminOrPartner], createTheatre);
threatreRouter.get('/', [verifyToken], getAllTheatre);
threatreRouter.put('/:id', [verifyToken, verifyAdminOrPartner], updateTheatreById);
threatreRouter.delete('/:id', [verifyToken, verifyAdminOrPartner], deleteTheatreById);


module.exports = threatreRouter;