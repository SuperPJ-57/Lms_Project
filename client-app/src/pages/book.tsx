import React, { useEffect } from 'react';
import { FaBook } from 'react-icons/fa';
import BookTable from '../components/book/BookTable';
import { useAuth } from '../context/AuthContext';
import BookForm from '../components/book/BookForm';
import { useNavigate } from 'react-router-dom';
import { useBook } from '../hooks/useBook';

const Books : React.FC= () =>  {
    const {
        books,
        fetchBooks,
        handleEdit,
        handleDelete,
        handleSave,
        selectedBook,
    } = useBook();
    const {tokens} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!tokens){
            navigate("/login");
        }
        fetchBooks();
    },[tokens,navigate]);

    

    return (
        <div className = "container mx-auto p-6">
            <div className='flex gap-1'>
                <span className='flex items-center text-2xl'><FaBook /></span>
                <h1 className="text-4xl">Book</h1>
            </div>
            <BookForm selectedBook={selectedBook} onSave={handleSave}/>
           
           <BookTable books = {books} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>
    );
}
export default Books;