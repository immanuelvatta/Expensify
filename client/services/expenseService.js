import axios from "axios";


const http = axios.create({
    baseURL: 'http://localhost:8080/api'
})

async function getAllEvents() {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await http.get('/events');
        return res.data;
    } catch (error) {
        throw error;
    }
}
