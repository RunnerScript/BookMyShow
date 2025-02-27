const express = require('express');
const { createTheatre, getAllTheatre } = require('../controllers/theatre.controller');
const { verifyToken, verifyAdminOrPartner } = require('../middlewares/auth.middleware');
const threatreRouter = express.Router();

threatreRouter.post('/', [verifyToken, verifyAdminOrPartner], createTheatre);
threatreRouter.get('/', [verifyToken], getAllTheatre);

module.exports = threatreRouter;