import axiosInstance from ".";

export async function getAllShowsByMovie(movieId, date) {
    try {
        const response = await axiosInstance.get(`http://localhost:8080/api/shows/movies/${movieId}?date=${date}`);
        return response;
    } catch (error) {
        return error.response;
    }
}