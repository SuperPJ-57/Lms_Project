import apiClient from "./authservice";
import { Book, BookResponse } from "../types/book";

// Add an interceptor to include the Bearer token in all requests
// apiClient.interceptors.request.use((config) => {
//   const tokens = localStorage.getItem("tokens");
//   if (tokens) {
//     const { access_token } = JSON.parse(tokens);
//     config.headers.Authorization = `Bearer ${access_token}`;
//   }
//   return config;
// });
// const /book/ = import.meta.env.VITE_/book/ + "/book/";


export const getAllBooks = async (query? : string): Promise<BookResponse[]> => {
  const url = query?
  `/book/?query=${query}`:
  `/book/`;
  const response = await apiClient.get(url);
  return response.data;
};
export const postBook = async (book: Book | null): Promise<Book> => {
  console.log(book);
  const response = await apiClient.post(
    `/book/`,
    book
  );
  return response.data;
};
export const updateBook = async (
  book_id: number,
  book: BookResponse
): Promise<Book> => {
  const response = await apiClient.put(
    `/book/${book_id}/`,
    book
  );
  return response.data;
};
export const deleteBook = async (book_id: number): Promise<Book> => {
  const response = await apiClient.delete(
    `/book/${book_id}/`
  );
  return response.data;
};
