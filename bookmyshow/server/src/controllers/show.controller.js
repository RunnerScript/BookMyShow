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


const getTheatreAndShowsByMovieId = async (req, res) => {
    const { movieId } = req.params;
    const { date } = req.query;

    //list of unique theatres and shows for this movie

    let allShows = await ShowModel.find({ movie: movieId, date: date }).populate('theatre');

    //get all unique theatres 
    try {

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

module.exports = { getAllShows, createNewShow, getTheatreAndShowsByMovieId };