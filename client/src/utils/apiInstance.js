// src/api/apiInstance.js
import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  //   timeout: 10000,
  withCredentials: true, //accept cookie in frontend 
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
// apiInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

/* =========================
   RESPONSE INTERCEPTOR
========================= */
// apiInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle global errors
//     if (error.response) {
//       const status = error.response.status;

//       if (status === 401) {
//         // Token expired / invalid
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       }

//       if (status === 403) {
//         console.error("Access forbidden");
//       }

//       if (status >= 500) {
//         console.error("Server error");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default apiInstance;
