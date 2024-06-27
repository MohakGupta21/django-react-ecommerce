import axios from "axios";

const axios_api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timout:5000,

    headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
    }
})

export default axios_api