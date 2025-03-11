import { API_BASE_URL } from "../settings";
import axiosInstance from ".";

//Get api for fetching all the records
export async function getAll(slug) {
    console.log(`${slug} API CALL STARTED`);
    try {
        const apiUrl = `${API_BASE_URL}/${slug}`;
        const response = await axiosInstance.get(apiUrl);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}



export async function getById(slug, id) {
    try {
        const apiUrl = `${API_BASE_URL}/${slug}/${movieId}`;
        const response = await axiosInstance.get(apiUrl);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}


export async function updateById(slug, id, payload) {
    try {
        const apiUrl = `${API_BASE_URL}/${slug}/${id}`;
        const response = await axiosInstance.put(apiUrl, payload);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}


export async function create(slug, payload) {
    const apiUrl = `${API_BASE_URL}/${slug}`;
    try {
        const response = await axiosInstance.post(apiUrl, payload);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}


export async function deleteById(slug, id) {
    try {
        const apiUrl = `${API_BASE_URL}/${slug}/${id}`;
        const response = await axiosInstance.delete(apiUrl);
        return response;
    } catch (error) {

        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }

}
