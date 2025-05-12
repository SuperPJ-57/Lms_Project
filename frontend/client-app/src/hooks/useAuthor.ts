import {useState} from 'react';
import { toast } from 'react-toastify';
import { getAllAuthors, deleteAuthor, updateAuthor, postAuthor } from '../services/AuthorService';
import { Author } from '../types/author';


export function useAuthor(){
    const [authors,setAuthors] = useState<Author[]>([]); 
    const [selectedAuthor,setSelectedAuthor] = useState<Author | null>(null);

    const fetchAuthors = async () =>{
        try{
            const response = await getAllAuthors();
            setAuthors(response);
            console.log(response);
        }
        catch(error){
            toast.error('Error fetching authors');
        }
    }

    const handleEdit = (author: Author) =>{
        setSelectedAuthor(author);
        console.log("selected" +    author.name)
    }

    const handleDelete = async (author_id : number) =>{
        try {
            await deleteAuthor(author_id);
            toast.success("Author deleted successfully!"); 
            fetchAuthors(); 
          } catch (err) {
            toast.error("Failed to delete author.");
          }
    }
    const handleSave = async (author: Author) =>{
        try{
            if(selectedAuthor){
                await updateAuthor(selectedAuthor.author_id,author);
                toast.success('Author updated successfully');
            }
            else{
                await postAuthor(author);
                toast.success('Author added successfully');
            }
            setSelectedAuthor(null);
            fetchAuthors();
        }
        catch(error){
            toast.error('Error saving author');
        }

    }

    return {
        authors,
        fetchAuthors,
        handleEdit,
        handleDelete,
        handleSave,
        selectedAuthor,
        setSelectedAuthor
    };
}