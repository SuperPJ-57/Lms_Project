import React, { useState , useEffect } from 'react';
import { FaBook } from 'react-icons/fa';
import BookCopyTable from '../components/bookcopy/BookCopyTable';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { getAllBookCopies,deleteBookCopy,updateBookCopy,postBookCopy } from '../services/BookCopyService';
import { BookCopy } from '../types/bookcopy';
import BookCopyForm from '../components/bookcopy/BookCopyForm';
import { useNavigate } from 'react-router-dom';

const BookCopies : React.FC= () =>  {
    const [bookcopies,setBookCopy] = useState<BookCopy[]>([]); 
    const [selectedBookCopy,setSelectedBookCopy] = useState<BookCopy | null>(null);
    const {tokens} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!tokens){
            navigate("/login");
        }
        fetchBookCopy();
    },[tokens,navigate]);

    const fetchBookCopy = async () =>{
        try{
            const response = await getAllBookCopies();
            setBookCopy(response);
            console.log(response);
        }
        catch(error){
            toast.error('Error fetching bookcopies');
        }
    }

    const handleEdit = (bookcopy: BookCopy) =>{
        setSelectedBookCopy(bookcopy);
    }

    const handleDelete = async (barcode : number) =>{
        try {
            await deleteBookCopy(barcode);
            toast.success("BookCopy deleted successfully!"); 
            fetchBookCopy(); 
          } catch (err) {
            toast.error("Failed to delete book.");
          }
    }
    const handleSave = async (bookcopy: BookCopy ) =>{
        try{
            if(selectedBookCopy ){
                await updateBookCopy(selectedBookCopy.barcode,bookcopy);
                toast.success('Book Copy updated successfully');
            }
            else{
                await postBookCopy(bookcopy);
                toast.success('Book Copy added successfully');
            }
            setSelectedBookCopy(null);
            fetchBookCopy();
        }
        catch(error){
            toast.error('Error saving book');
        }

    }

    return (
        <div className = "container mx-auto p-6">
            <div className='flex gap-1'>
                <span className='flex items-center text-2xl'><FaBook /></span>
                <h1 className="text-4xl">Book Copy</h1>
            </div>
            <BookCopyForm selectedBookCopy={selectedBookCopy} onSave={handleSave}/>
           
           <BookCopyTable bookcopy = {bookcopies} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>
    );
}
export default BookCopies;