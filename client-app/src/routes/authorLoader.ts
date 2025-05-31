
import { getAllAuthors } from "../services/AuthorService";

export const authorLoader = async () => {
  const authors = await getAllAuthors(); 
  return authors;
};
