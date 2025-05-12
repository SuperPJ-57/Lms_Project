import axios from 'axios';
import { LoginDto, User, Tokens } from '../types/login';
import { TokenService } from "./TokenService";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let queue: any[] = [];

apiClient.interceptors.request.use(config => {
  const token = TokenService.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if ((err.response?.status === 401 || err.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = TokenService.getRefreshToken();
      if (!refreshToken) return Promise.reject(err);

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      isRefreshing = true;
      try {
        const { data } = await apiClient.post("/token/refresh/", { refresh: refreshToken });
        TokenService.setTokens({
          access_token: data.access,
          refresh_token: refreshToken
        });

        queue.forEach(p => p.resolve(data.access));
        queue = [];
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return apiClient(originalRequest);
      } catch (e) {
        queue.forEach(p => p.reject(e));
        TokenService.clearTokens();
        window.location.href = "/login";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default apiClient;




export const login = async (credentials: LoginDto): Promise<Tokens> => {
  try {
    TokenService.clearTokens(); // Clear any old auth tokens before login
    const response = await apiClient.post("/login/", credentials);
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};



export const signup = async (user: User): Promise<void> => {
  await axios.post(`/api/register/`, user);
};``



// export const login = async (credentials: LoginDto): Promise<Tokens> => {
//   const response = await axios.post(`${BASE_URL}/login/`, credentials);
  
//   return response.data;
// };

// export const login = async (credentials: LoginDto): Promise<Tokens> => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(credentials), // Use actual credentials
//     });

//     if (!response.ok) {
//       throw new Error(`Login failed! Status: ${response.status}`);
//     }

//     const data: Tokens = await response.json(); // Parse JSON response
//     return data;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };


// export const login = {
//   async signIn(email: string, password: string) {
//     try {
//       const response = await apiClient.post('/account/login/email/', { email, password });
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data?.errors?.[0]?.message || 'An error occurred during sign-in';
//     }
//   },