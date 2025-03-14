const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const bookingRouter = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { makePayment, bookShow, getAllBookings } = require('../controllers/booking.controller');

bookingRouter.post('/make-payment', verifyToken, makePayment);
bookingRouter.post('/book-show', verifyToken, bookShow);
bookingRouter.get('/:userId', verifyToken, getAllBookings);


module.exports = bookingRouter;