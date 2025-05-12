import { FaUser } from 'react-icons/fa';
import AuthorTable from '../components/author/AuthorTable';
import { useAuth } from '../context/AuthContext';
import AuthorForm from '../components/author/AuthorForm';
import { useNavigate } from 'react-router-dom';
import { useAuthor } from '../hooks/useAuthor';
import { useEffect } from 'react';

const Authors : React.FC= () =>  {
    const {fetchAuthors,authors,handleEdit,handleDelete,handleSave,selectedAuthor} = useAuthor();
    const {tokens} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!tokens){
            navigate("/login");
        }
        fetchAuthors();
    },[tokens,navigate]);

    

    return (
        <div className = "container mx-auto p-6">
            <div className='flex gap-1'>
                <span className='flex items-center text-2xl'><FaUser /></span>
                <h1 className="text-4xl">Author</h1>
            </div>
            <AuthorForm selectedAuthor={selectedAuthor} onSave={handleSave}/>
           
           <AuthorTable authors = {authors} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>
    );
}
export default Authors;