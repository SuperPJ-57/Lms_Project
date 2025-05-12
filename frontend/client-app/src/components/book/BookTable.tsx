import {  BookResponse} from "../../types/book";

interface BookTableProps {
    books: BookResponse[];
    onEdit : (book: BookResponse) => void;
    onDelete : (book: number) => Promise<void>;
}

const BookTable: React.FC<BookTableProps> = ({books,onEdit,onDelete}) => {

    return (
        
        <div className="container rounded-2xl bg-gray-200 p-3 mt-2.5 overflow-hidden">
            <table className="table-auto w-full rounded-2xl border-collapse">
                <thead className="bg-gray-600 text-white">
                    <tr>
                        <th className="px-4 py-2 w-2.5">Book ID</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Author Name</th>
                        <th className="px-4 py-2">Genre</th>
                        <th className="px-4 py-2">ISBN</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2 w-70">Action</th>
                    </tr>
                </thead>
                <tbody> 
                    {books.map((book) => (
                        <tr key={book.book_id}>
                            <td className="border px-4 py-2">{book.book_id}</td>
                            <td className="border px-4 py-2">{book.title}</td>
                            <td className="border px-4 py-2">{book.author_name}</td>
                            <td className="border px-4 py-2">{book.genre}</td>
                            <td className="border px-4 py-2">{book.isbn}</td>
                            <td className="border px-4 py-2">{book.quantity}</td>
                            <td className="border px-4 py-2 flex gap-2">

                                <button 
                                onClick={()=> onEdit(book) } 
                                className="bg-[#255D81] text-white px-4 py-2 w-30 rounded-lg hover:bg-[#1A455D]">
                                    Edit
                                </button>

                                <button 
                                onClick={()=> onDelete(book.book_id??0) } 
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
export default BookTable;