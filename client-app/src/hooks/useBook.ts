import { useState } from "react";
import { Book, BookResponse } from "../types/book";
import { deleteBook, getAllBooks, postBook, updateBook } from "../services/BookService";
import { toast } from "react-toastify";

 

export function useBook(){
    const [books,setBooks] = useState<BookResponse[]>([]); 
    const [selectedBook,setSelectedBook] = useState<BookResponse | null>(null);
    const fetchBooks = async () =>{
        try{
            const response = await getAllBooks();
            setBooks(response);
            console.log(response);
        }
        catch(error){
            toast.error('Error fetching books');
        }
    }

    const handleEdit = (book: BookResponse) =>{
        setSelectedBook(book);
        console.log("selected" +    book.author_id)
    }

    const handleDelete = async (book_id : number) =>{
        try {
            await deleteBook(book_id);
            toast.success("Book deleted successfully!"); 
            fetchBooks(); 
          } catch (err) {
            toast.error("Failed to delete book.");
          }
    }
    const handleSave = async (book: Book | BookResponse) =>{
        try{
            if(selectedBook && selectedBook.book_id && ("book_id" in book)){
                await updateBook(selectedBook.book_id,book);
                toast.success('Book updated successfully');
            }
            else{
                await postBook(("author" in book )? book : null);
                toast.success('Book added successfully');
            }
            setSelectedBook(null);
            fetchBooks();
        }
        catch(error){
            toast.error('Error saving book');
        }

    }

    return {
        books,
        fetchBooks,
        handleEdit,
        handleDelete,
        handleSave,
        selectedBook,
        setSelectedBook
    };
}