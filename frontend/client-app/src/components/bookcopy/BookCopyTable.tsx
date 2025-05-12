import { BookCopy  } from "../../types/bookcopy";

interface BookCopyTableProps {
    bookcopy: BookCopy[];
    onEdit : (bookcopy: BookCopy) => void;
    onDelete : (bookcopy: number) => Promise<void>;
}

const BookCopyTable: React.FC<BookCopyTableProps> = ({bookcopy,onEdit,onDelete}) => {

    return (
        
        <div className="container rounded-2xl bg-gray-200 p-3 mt-2.5 overflow-scroll">
            <table className="table-auto w-full rounded-2xl border-collapse">
                <thead className="bg-gray-600 text-white">
                    <tr>
                        <th className="px-4 py-2 w-2.5">Book ID</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Barcode</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2 w-70">Action</th>
                    </tr>
                </thead>
                <tbody> 
                    {bookcopy.map((bookcopy) => (
                        <tr key={bookcopy.barcode}>
                            <td className="border px-4 py-2">{bookcopy.book_id}</td>
                            <td className="border px-4 py-2">{bookcopy.title}</td>
                            <td className="border px-4 py-2">{bookcopy.barcode}</td>
                            <td className="border px-4 py-2">{bookcopy.is_available}</td>
                            <td className="border px-4 py-2 flex gap-2">

                                <button 
                                onClick={()=> onEdit(bookcopy) } 
                                className="bg-[#255D81] text-white px-4 py-2 w-30 rounded-lg hover:bg-[#1A455D]">
                                    Edit
                                </button>

                                <button 
                                onClick={()=> onDelete(bookcopy.barcode??0) } 
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
export default BookCopyTable;