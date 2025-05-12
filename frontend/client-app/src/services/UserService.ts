import apiClient from "./authservice";
import { User } from "../types/login";


// Add an interceptor to include the Bearer token in all requests
// axios.interceptors.request.use((config) => {
//   const tokens = localStorage.getItem("tokens");
//   if (tokens) {
//     const { access_token } = JSON.parse(tokens);
//     config.headers.Authorization = `Bearer ${access_token}`;
//   }
//   return config;
// });

//const API_BASE_URL = "http://127.0.0.1:8000/api/user/";

export const getUserByUsername = async (username: string) : Promise<User> => {
    const response = await apiClient.get(`/user/${username}/`);
    return response.data;
}