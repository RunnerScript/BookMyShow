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