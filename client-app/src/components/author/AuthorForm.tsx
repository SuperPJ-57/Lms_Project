import { useState,useEffect } from "react";
import { Author } from "../../types/author";

interface AuthorFormProps {
    selectedAuthor? : Author | null;
    onSave : (author:Author) => Promise<void>;
}



const AuthorForm : React.FC<AuthorFormProps> = ({selectedAuthor,onSave}) => {

    
    const [authorName,setAuthorName] = useState<string>('');
    const [bio,setBio] = useState<string>('');
    const [authorID,setAuthorID] = useState<number>();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(selectedAuthor)
        {
            console.log("selected author");
            onSave({author_id:authorID??0,name:authorName,bio:bio});

        }
        else{
            console.log("new author");
            onSave({author_id:0,name:authorName,bio:bio});
        }
        setAuthorName('');
        setBio('');
        setAuthorID(undefined);
    }
    useEffect(()=>{
        if(selectedAuthor){
            setAuthorName(selectedAuthor.name);
            setBio(selectedAuthor.bio);
            setAuthorID(selectedAuthor.author_id);
            console.log("selected; "+selectedAuthor.author_id);
        }
        else{
            console.log("not selected");
            setAuthorName('');
            setBio('');
            setAuthorID(undefined);
        }
    },[selectedAuthor]);
    return (
        <div className="form container p-3  bg-gray-200 rounded-2xl">
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label>Author ID</label>
                        <input className='bg-gray-400 rounded cursor-not-allowed focus:border-blue-600 focus:border-2 focus:outline-none p-2' type="text" name="AuthorID" 
                        value={authorID??''}
                        onChange={
                            (e)=>{
                                setAuthorID(parseInt(e.target.value));
                            }
                        }
                         disabled></input>
                    </div>
                    <div className='flex flex-col gap-2'> 
                        <label>Author Name</label>
                        <input className='bg-gray-400 rounded focus:border-blue-600 focus:border-2 focus:outline-none p-2' type="text" name="Name"
                        value={authorName??''}
                        onChange={
                            (e)=>{
                                setAuthorName(e.target.value);
                            }
                        }
                        required></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Bio</label>
                        <input className='bg-gray-400 rounded focus:border-blue-600 focus:border-2 focus:outline-none p-2' type="text" name="Bio" 
                        value={bio??''}
                        onChange={
                            (e)=>{
                                setBio(e.target.value);
                            }
                        }
                        ></input>
                    </div>
                    <div>

                        <button type="submit" className="bg-[#255D81] text-white px-4 py-2 rounded-lg hover:bg-[#1A455D]"
                        
                        >
                            {selectedAuthor?'Update':'Add'}
                        </button>
                    </div>
                </form>
            </div>
    );
}
export default AuthorForm;