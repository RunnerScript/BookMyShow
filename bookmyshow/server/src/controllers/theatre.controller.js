const TheatreModel = require("../models/theatre.model");

const createTheatre = async (req, res) => {
    const theatreDetails = req.body;

    theatreDetails.owner = req.userDetails._id;

    try {
        const newTheatre = new TheatreModel(theatreDetails);

        await newTheatre.save();

        return res.status(201).send({
            success: true,
            message: "new Theatre added successfully."
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }
}

const getAllTheatre = async (req, res) => {
    try {
        const allTheatres = await TheatreModel.find({}).populate("owner");
        return res.status(200).send({
            success: true,
            message: "Get all the theatres",
            data: allTheatres
        });

    } catch (error) {

        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }

}
module.exports = { createTheatre, getAllTheatre };