import axiosInstance from ".";

export async function makePaymentApi(token, amount) {
    try {
        const response = await axiosInstance.post('http://localhost:8080/api/bookings/make-payment', { token, amount });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}

export async function bookingShow(payload) {

    try {
        const response = await axiosInstance.post('http://localhost:8080/api/bookings/book-show', payload);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}


export async function getUserBookings(userId) {
    try {
        const response = await axiosInstance.get(`http://localhost:8080/api/bookings/${userId}`);
        return response.data;

    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return { data: { success: false, message: "Something went wrong, please try again!" } };
        }
    }
}