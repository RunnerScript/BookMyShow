const MovieModel = require("../models/movie.model");

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await MovieModel.find({});

        return res.status(200).send({ success: true, message: "Movie List fetched", data: allMovies });
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }

}

//only admin user authorize to create new Movie
const createNewMovie = async (req, res) => {
    try {
        const movie = new MovieModel(req.body);
        const dbResponse = await movie.save();

        if (dbResponse != null) {
            return res.status(201).send({ success: true, message: "Movie is created", movie: movie });
        }
    } catch (error) {
        return res.status(500).send({ sucess: false, message: "Internal Server Error" });
    }
}

const updateMovieById = async (req, res) => {
    const { id: movieId } = req.params;

    if (!movieId) {
        return res.status(400).send({
            success: false,
            message: "The movie Id is not passed."
        });
    }

    try {
        const movie = await MovieModel.findById(movieId);

        if (!movie) {
            return res.status(400).send({
                success: false,
                message: `The Movie id:${movieId} is invalid`
            });
        }

        const updateResponse = await MovieModel.findByIdAndUpdate(movieId, req.body, { new: true })

        if (updateResponse !== null) {
            return res.status(200).send({
                success: true,
                message: "Movie Successfully Updated"
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: `The Movie id:${movieId} is invalid`
        });
    }

}


const deleteMovieById = async (req, res) => {
    const { id: movieId } = req.params;
    console.log(movieId);
    if (!movieId) {
        return res.status(400).send({
            success: false,
            message: "The movie id is not found"
        });
    }
    try {
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            return res.status(400).send({
                success: false,
                message: `The Movie id:${movieId} is invalid`
            });
        }
        const deleteResponse = await MovieModel.findByIdAndDelete(movieId);
        if (deleteResponse !== null && deleteResponse.deleteCount !== 0) {
            return res.status(200).send({
                success: true,
                message: `The Movie id:${movieId} deleted Successfully.`
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: `The Movie id:${movieId} is invalid`
        });
    }
}

module.exports = { getAllMovies, createNewMovie, updateMovieById, deleteMovieById }