import axiosInstance from ".";

export async function RegisterUser(data) {
    try {
        //console.log("Data before sending:", JSON.stringify(data));
        const response = await axiosInstance.post('http://localhost:8080/api/users/register', {
            name: data.name,
            email: data.email,
            password: data.password
        });
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }

}


export async function LoginUser(data) {

    try {
        const response = await axiosInstance.post('http://localhost:8080/api/users/login', {
            email: data.email,
            password: data.password
        });
        //console.log("rR", response);
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

export async function GetCurrentUser() {
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/users/currentuser');
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


export async function forgetPassword(payload) {
    try {
        const response = await axiosInstance.patch('http://localhost:8080/api/users/forgetpassword', payload);
        return response.data;
    } catch (error) {
        return error.response;
    }

}

export async function resetPassword(email, payload) {
    try {
        const response = await axiosInstance.post(`http://localhost:8080/api/users/resetpassword/${email}`, payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}