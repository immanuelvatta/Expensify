import axios from "axios";



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
        const expRes = await http.post(`/expenses`, expense);
        return expRes.data;
    } catch (expError) {
        console.log("Error adding expense", expError);
        throw expError;
    }
}


export { getAllExpensesForEvent, createExpense } 
