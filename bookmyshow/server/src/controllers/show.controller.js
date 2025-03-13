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
            error: error.message
        });
    }
}

const getAllShowsByTheatreId = async (req, res) => {
    const { id: theatreId } = req.params;
    const { date } = req.query;
    try {
        const shows = await ShowModel.find({ theatre: theatreId }).populate('movie');
        console.log(shows);
        return res.send({
            success: true,
            messsage: "Shows fetched successfully.",
            data: shows
        });

    } catch (error) {
        return res.send({
            success: true,
            message: "Internal Server Error",
            error: error.message
        });
    }

}

const getTheatreAndShowsByMovieId = async (req, res) => {
    const { movieId: movie, date } = req.params;

    //get all unique theatres 
    try {

        let allShows = await ShowModel.find({
            movie, date
        }).populate('theatre');
        console.log(allShows);
        let allUniqueTheatres = {}

        allShows.forEach((show) => {
            if (!allUniqueTheatres.hasOwnProperty(show.theatre._id)) {
                allUniqueTheatres[show.theatre._id] = {
                    theatreId: show.theatre._id,
                    theatreDetails: show.theatre,
                    allShowsPerticularTheatre: [show]
                }
            } else {
                allUniqueTheatres[show.theatre._id].allShowsPerticularTheatre.push(show);
            }
        });

        let uniqueTheatres = [];
        for (key in allUniqueTheatres) {
            uniqueTheatres.push(allUniqueTheatres[key]);
        }

        return res.status(200).send({
            success: true,
            message: "All shows fetched for the given movie",
            data: uniqueTheatres
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message
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
            error: error.message
        });
    }
}


const getShowById = async (req, res) => {
    const { id: showId } = req.params;
    if (!showId) {
        return res.status(400).send({
            success: false,
            message: "show id not passed"
        });
    }
    try {
        const show = await ShowModel.findById(id).populate("movie").populate('theatre');
        if (!show) {
            return res.status(400).send({
                success: false,
                message: "Invalid show id",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Show fetched successfully",
            data: show
        });
    } catch (error) {

    }
}


const updateShow = async (req, res) => {
    const { id: showId } = req.params;
    if (!showId) {
        return res.status(400).send({
            success: false,
            message: "Show id not passed"
        });
    }
    try {
        const show = await ShowModel.findById(showId);
        if (!show) {
            return res.status(400).send({
                success: false,
                message: "Invalid Show ID"
            });
        }

        const updatedShow = await ShowModel.findByIdAndUpdate(showId, req.body, { new: true });
        if (updatedShow !== null) {
            return res.status(200).send({
                success: true,
                message: "Show updated successfully.",
                data: updatedShow
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}




const deleteShow = async (req, res) => {
    const { id: showId } = req.params;
    if (!id) {
        return res.status(400).send({
            success: false,
            message: "Show id not passed"
        });
    }
    try {
        const show = await ShowModel.findById(showId);
        if (!show) {
            return res.status(400).send({
                success: false,
                message: "Invalid Show ID"
            });
        }

        const deletedShow = await ShowModel.findByIdAndDelete(showId);
        if (deletedShow !== null) {
            return res.status(200).send({
                success: true,
                message: "Show deleted successfully.",
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports = { getAllShows, createNewShow, getTheatreAndShowsByMovieId, getShowById, deleteShow, updateShow, getAllShowsByTheatreId };