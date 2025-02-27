const MovieModel = require("../models/movie.model");
const ShowModel = require("../models/show.model");
const TheatreModel = require("../models/theatre.model");

const getAllShows = async (req, res) => {

    try {
        const allShows = await ShowModel.find({}).populate('theatre').populate('movie');
        return res.status(200).send({
            success: true,
            message: "All shows fetched",
            data: allShows
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }
}

const createNewShow = async (req, res) => {
    const { theatre, movie } = req.body;
    try {
        const theatreDBObj = await TheatreModel.findById(theatre);
        const movieDBObj = await MovieModel.findById(movie);

        if (theatreDBObj === null) {
            return res.status(400).send({
                success: false,
                message: "TheatreId is invalid"
            });
        }

        if (movieDBObj === null) {
            return res.status(400).send({
                success: false,
                message: "MovieId is invalid"
            });
        }

        const newShow = new ShowModel(req.body);
        await newShow.save();

        return res.status(201).send({
            success: true,
            message: "New show added successfully."
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
}

module.exports = { getAllShows, createNewShow };