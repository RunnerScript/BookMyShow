const getAllMovies = async (req, res) => {
    return res.status(200).send({ success: true, message: "Movie List fetched", movies: ["Movie 1", "Movie 2"] });
}

//only admin user authorize to create new Movie
const createNewMovie = async (req, res) => {
    return res.status(201).send({ message: "Movie is created" });
}
module.exports = { getAllMovies, createNewMovie }