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

async function getEventById(id) {
    try {
        const res = await http.get(`/events/id`, {
            params: {
                id
            }
        })
        
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createEvent(event) {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await http.post('/events', event);
        return res.data;
    } catch (error) {
        throw error;
    }
}



export { getAllEvents, createEvent, getEventById }