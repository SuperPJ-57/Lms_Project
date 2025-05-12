import apiClient from './authservice';
import { Author } from "../types/author";

  

export const getAllAuthors = async (query? : string): Promise<Author[]> => {
  const url = query?
  `/author/?query=${query}`:
  `/author/`;
  const response = await apiClient.get(url);
  return response.data;
};
export const postAuthor = async (author: Author): Promise<Author> => {
  const response = await apiClient.post(
    `/author/`,
    author
  );
  return response.data;
};
export const updateAuthor = async (
  author_id: number,
  author: Author
): Promise<Author> => {
  const response = await apiClient.put(
    `/author/${author_id}/`,
    author
  );
  return response.data;
};
export const deleteAuthor = async (author_id: number): Promise<Author> => {
  const response = await apiClient.delete(
    `/author/${author_id}/`
  );
  return response.data;
};
