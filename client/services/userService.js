import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080/api'
})

async function createUser(user) {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await http.post('/users', user);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export { createUser }