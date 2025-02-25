const getAllMovies = async (req, res) => {
    return res.status(200).send({ success: true, message: "Movie List fetched", movies: ["Movie 1", "Movie 2"] });
}

module.exports = { getAllMovies }