import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.kinopoisk.dev/v1.4"
})

instance.interceptors.request.use(
    config=>{
        config.headers["X-API-KEY"]="2XSXA0F-QYZ4WDC-HFJEHD5-1NB7K3N"
        return config
    },
    error=>{
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response=>{
        return response
    },
    error=>{
        return Promise.reject(error)
    }
)



export default instance;