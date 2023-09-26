import axios from "axios";


const http = axios.create({
  baseURL: 'http://localhost:8080/api'
})


async function createBalance(balance) {

  try {
    const balRes = await http.post(`/balance`, balance);
    return balRes.data;
  } catch (balError) {
    console.log("Error adding  balance", balError)
    throw balError;
  }
}

export { createBalance }