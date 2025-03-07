const MovieModel = require("../models/movie.model");

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await MovieModel.find({});

        return res.status(200).send({ success: true, message: "Movie List fetched", data: allMovies });
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }

}

const getMovieById = async (req, res) => {
    try {
        const { id: movieId } = req.params;
        const movie = await MovieModel.findById(movieId);
        return res.status(200).send({
            success: true,
            message: "Fetched Single Movie",
            data: movie
        });
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
            return res.status(201).send({ success: true, message: "Movie is created", data: movie });
        }
    } catch (error) {
        return res.status(500).send({ sucess: false, message: "Internal Server Error", error });
    }
}

const updateMovieById = async (req, res) => {
    const { id: movieId } = req.params;

    if (!movieId) {
        return res.status(400).send({
            success: false,
            message: "The movie Id is not passed.",
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

        const updateMovie = await MovieModel.findByIdAndUpdate(movieId, req.body, { new: true })

        if (updateMovie !== null) {
            return res.status(200).send({
                success: true,
                message: "Movie Successfully Updated",
                data: updateMovie
            });
        }
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: `The Movie id:${movieId} is invalid`,
            error
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
            message: `The Movie id:${movieId} is invalid`,
            error
        });
    }
}

module.exports = { getAllMovies, createNewMovie, updateMovieById, deleteMovieById, getMovieById }