import axiosInstance from ".";

export async function getAllMovies() {
    console.log("Movie API call started");
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/movies');
        console.log("API Response", response);
        return response;
    } catch (error) {
        return error.response;
    }
}