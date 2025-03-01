import axiosInstance from ".";

export async function getAllMovies() {
    console.log("Movie API call started");
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/movies');
        // console.log("API Response", response);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export async function getMovieById(movieId) {
    try {
        const response = await axiosInstance.get(`http://localhost:8080/api/movies/${movieId}`);
        // console.log("API Response", response);
        return response;
    } catch (error) {
        return error.response;
    }
}