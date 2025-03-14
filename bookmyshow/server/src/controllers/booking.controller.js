const BookingModel = require("../models/booking.model");
const ShowModel = require("../models/show.model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const makePayment = async (req, res) => {
    try {
        const { token, amount } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "INR",
            customer: customer.id,
            payment_method_types: ["card"],
            receipt_email: token.email,
            description: "Token has been assigned to Movie",
            confirm: true
        });

        const transactionId = paymentIntent.id;
        return res.send({
            success: true,
            message: "Payment Successful",
            data: transactionId
        });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message, error })
    }
}


const bookShow = async (req, res) => {
    try {
        const newBooking = new BookingModel(req.body);
        await newBooking.save();
        const show = await ShowModel.findById(req.body.show).populate('movie');
        const updatedSeats = [...show.bookedSeats, ...req.body.seats];
        const updateSeats = await ShowModel.findByIdAndUpdate(req.body.show, {
            bookedSeats: updatedSeats
        });
        return res.send({ success: true, message: "Booking Successful." });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message, error })
    }
}

const getAllBookings = async (req, res) => {
    const { userId } = req.params;
    try {
        const bookings = await BookingModel.find({ user: userId })
            .populate('user')
            .populate('show')
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movie"
                }
            })
            .populate({
                path: 'show',
                populate: {
                    path: 'theatre',
                    model: "theatre"
                }
            });
        return res.send({
            success: true,
            message: "Bookings of user",
            data: bookings
        });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message, error });
    }
}

module.exports = { makePayment, bookShow, getAllBookings };
