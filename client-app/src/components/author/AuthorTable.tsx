import { Author } from "../../types/author";

interface AuthorTableProps {
    authors: Author[];
    onEdit : (author: Author) => void;
    onDelete : (author_id: number) => Promise<void>;
}

const AuthorTable: React.FC<AuthorTableProps> = ({authors,onEdit,onDelete}) => {

    return (
        
        <div className="container rounded-2xl bg-gray-200 p-3 mt-2.5 overflow-hidden">
            <table className="table-auto w-full rounded-2xl border-collapse">
                <thead className="bg-gray-600 text-white">
                    <tr>
                        <th className="px-4 py-2 w-2.5">Author ID</th>
                        <th className="px-4 py-2">Author Name</th>
                        <th className="px-4 py-2">Bio</th>
                        <th className="px-4 py-2 w-70">Action</th>
                    </tr>
                </thead>
                <tbody> 
                    {authors.map((author) => (
                        <tr key={author.author_id}>
                            <td className="border px-4 py-2">{author.author_id}</td>
                            <td className="border px-4 py-2">{author.name}</td>
                            <td className="border px-4 py-2">{author.bio}</td>
                            <td className="border px-4 py-2 flex gap-2">

                                <button 
                                onClick={()=> onEdit(author) } 
                                className="bg-[#255D81] text-white px-4 py-2 w-30 rounded-lg hover:bg-[#1A455D]">
                                    Edit
                                </button>

                                <button 
                                onClick={()=> onDelete(author.author_id) } 
                                className="bg-[red] text-white px-4 py-2 w-30 rounded-lg hover:bg-white hover:text-red-600 border border-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );

}
export default AuthorTable;