import axiosInstance from ".";
import { fetchMovies } from "../redux/movieSlice";
import { useDispatch } from "react-redux";


export async function getAllMovies() {
    console.log("Movie API call started");
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/movies');
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}

export async function getMovieById(movieId) {
    try {
        const response = await axiosInstance.get(`http://localhost:8080/api/movies/${movieId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}


export async function updateMovieById(movieId, payload) {
    try {
        const response = await axiosInstance.put(`http://localhost:8080/api/movies/${movieId}`, payload);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}

export async function createMovie(payload) {

    try {
        const response = await axiosInstance.post('http://localhost:8080/api/movies', payload);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}



export async function deleteMovieById(movieId) {
    try {
        const response = await axiosInstance.delete(`http://localhost:8080/api/movies/${movieId}`);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }

}