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
        console.log(error);
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const res = await http.get(`/users/email?email=${email}`);
        console.log(res);
        console.log("i won");
        return res.data;
    } catch (error) {
        console.log("i lost");
        throw error;
    }
}

export { createUser, getUserByEmail }