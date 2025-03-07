import axiosInstance from ".";
export async function getAlltheatre() {
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/theatres');
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }

}

export async function createTheatre(payload) {
    try {
        const response = await axiosInstance.post('http://localhost:8080/api/theatres', payload);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }

}


export async function updateTheatreById(theatreId, payload) {
    try {
        const response = await axiosInstance.put(`http://localhost:8080/api/theatres/${theatreId}`, payload);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }

}

export async function deleteTheatreById(theatreId) {
    try {
        const response = await axiosInstance.delete(`http://localhost:8080/api/theatres/${theatreId}`);
        return response;
    } catch (error) {

        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }

}
