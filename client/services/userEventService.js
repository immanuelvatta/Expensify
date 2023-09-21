import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080/api'
})

async function createUserEvent(userEvent) {
    try {
        console.log(userEvent);
        const res = await http.post('/userEvents', userEvent);
        if (res.status === 200) {
            return res.data; // Successful creation, return the response data.
        } else {
            // Handle other status codes or validation errors.
            console.error("Failed to create user event. Status:", res.status);
            throw new Error("Failed to create user event");
        }
    } catch (error) {
        console.error("Error creating user event:", error);
        throw error;
    }
}

export { createUserEvent }