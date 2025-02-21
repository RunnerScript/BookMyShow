import axiosInstance from ".";

export async function RegisterUser(data) {
    try {
        //console.log("Data before sending:", JSON.stringify(data));
        const response = await axiosInstance.post('http://localhost:8080/register', {
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
        const response = await axiosInstance.post('http://localhost:8080/login', {
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