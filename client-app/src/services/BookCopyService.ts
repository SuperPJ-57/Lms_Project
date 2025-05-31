import apiClient from "./authservice";
import { BookCopy, } from "../types/bookcopy";


// Add an interceptor to include the Bearer token in all requests
// apiClient.interceptors.request.use((config) => {
//   const tokens = localStorage.getItem("tokens");
//   if (tokens) {
//     const { access_token } = JSON.parse(tokens);
//     config.headers.Authorization = `Bearer ${access_token}`;
//   }
//   return config;
// });

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/bookcopy/";

export const getAllBookCopies = async (): Promise<BookCopy[]> => {
  
  const url = `/bookcopy/`;
  console.log(url)
  const response = await apiClient.get(url);

  return response.data;
};

export const getBookCopyByBarcode = async (barcode: number): Promise<BookCopy> => {
  const url = `/bookcopy/${barcode}/`;
  const response = await apiClient.get(url);
  return response.data;
};


export const postBookCopy = async (bookcopy: BookCopy): Promise<BookCopy> => {
  const response = await apiClient.post(
    `/bookcopy/`,
    bookcopy
  );
  return response.data;
};

export const updateBookCopy = async (
  barcode: number,
  bookcopy: BookCopy
): Promise<BookCopy> => {
  const response = await apiClient.put(
    `/bookcopy/${barcode}/`,
    bookcopy
  );
  return response.data;
};

export const deleteBookCopy = async (barcode: number): Promise<BookCopy> => {
  const response = await apiClient.delete(
    `/bookcopy/${barcode}/`
  );
  return response.data;
};
