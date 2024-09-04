import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.kinopoisk.dev/v1.4"
})



export default instance;