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
        const res = await http.get(`/users/email/email?email=${email}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserByUserName(userName) {
    try{
        const res = await http.get(`/users/userName/userName?userName=${userName}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllUsers() {
    try {
        const res = await http.get('/users');
        return res.data;
    } catch (error) {
        throw error;
    }
}


export { createUser, getUserByEmail, getAllUsers, getUserByUserName }