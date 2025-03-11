import axiosInstance from ".";

export async function getAllShowsByMovie(movieId, date) {
    try {
        const response = await axiosInstance.get(`http://localhost:8080/api/shows/movies/${movieId}/${date}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export async function getAllShowsByTheatreId(theatreId) {
    try {
        const response = await axiosInstance.get(`http://localhost:8080/api/shows/theatre/${theatreId}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export async function updateShow(showId, payload) {
    try {
        const response = await axiosInstance.put(`http://localhost:8080/api/shows/${showId}`, payload);
        return response;
    } catch (error) {
        // Ensure `error.response` exists before returning it
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}


export async function deleteShow(showId, payload) {
    try {
        const response = await axiosInstance.delete(`http://localhost:8080/api/shows/${showId}`, payload);
        return response;
    } catch (error) {
        // Ensure `error.response` exists before returning it
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}


export async function createShow(payload) {
    try {
        const response = await axiosInstance.post(`http://localhost:8080/api/shows`, payload);
        return response;
    } catch (error) {
        // Ensure `error.response` exists before returning it
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}