import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";

export const Api = axios.create({

    baseURL: "http://localhost:3000"

});

Api.interceptors.response.use(

    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error), 

);