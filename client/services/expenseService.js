import axios from "axios";
import { cloneDeep } from "lodash";


const http = axios.create({
    baseURL: 'http://localhost:8080/api'
})

async function getAllExpensesForEvent(id) {
    console.log(id);
    try {
        const res = await http.get(`/trip/expenses`, {
            params: {
                id
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

async function createExpense(expense){
    try {
        const res = await http.post(`/expenses`, expense);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { getAllExpensesForEvent, createExpense } 