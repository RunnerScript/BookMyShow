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

const updateTheatreById = async (req, res) => {
    const { id: theatreId } = req.params;

    if (!theatreId) {
        return res.status(400).send({
            success: false,
            message: "Theatre Id is not passed."
        });
    }
    try {
        const theatre = await TheatreModel.findById(theatreId);
        if (!theatre) {
            return res.status(400).send({
                success: false,
                message: "Theatre Id is Invalid."
            });
        }

        const updateTheatre = await TheatreModel.findByIdAndUpdate(theatreId, req.body);
        if (updateMovie !== null) {
            return res.status(200).send({
                success: true,
                message: "Updated Successfully",
                data: updateTheatre
            });
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
}


const deleteTheatreById = async (req, res) => {
    const { id: theatreId } = req.params;

    if (!theatreId) {
        return res.status(400).send({
            success: false,
            message: "Theatre id not passed"
        });
    }

    try {
        const theatre = await TheatreModel.findById(theatreId);

        if (!theatre) {
            return res.status(400).send({
                success: false,
                message: "Invalid Theatre Id"
            });
        }

        const deletedTheatre = await TheatreModel.findByIdAndDelete(theatreId);
        if (deletedTheatre !== null) {
            return res.status(200).send({
                success: true,
                message: "Movie Successfully Deleted"
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
}
module.exports = { createTheatre, getAllTheatre, updateTheatreById, deleteTheatreById };