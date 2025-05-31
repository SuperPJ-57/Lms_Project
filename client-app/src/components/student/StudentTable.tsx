import { Student } from "../../types/student";

interface StudentTableProps {
    students: Student[];
    onEdit : (student: Student) => void;
    onDelete : (student_id: number) => Promise<void>;
}

const StudentTable: React.FC<StudentTableProps> = ({students,onEdit,onDelete}) => {

    return (
        
        <div className="container rounded-2xl bg-gray-200 p-3 mt-2.5 overflow-hidden">
            <table className="table-auto w-full rounded-2xl border-collapse">
                <thead className="bg-gray-600 text-white">
                    <tr>
                        <th className="px-4 py-2 w-2.5">Student ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Faculty</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Contact No.</th>
                        <th className="px-4 py-2 w-70">Action</th>
                    </tr>
                </thead>
                <tbody> 
                    {students.map((student) => (
                        <tr key={student.student_id}>
                            <td className="border px-4 py-2">{student.student_id}</td>
                            <td className="border px-4 py-2">{student.name}</td>
                            <td className="border px-4 py-2">{student.department}</td>
                            <td className="border px-4 py-2">{student.email}</td>
                            <td className="border px-4 py-2">{student.contact_number}</td>
                            <td className="border px-4 py-2 flex gap-2">

                                <button 
                                onClick={()=> onEdit(student) } 
                                className="bg-[#255D81] text-white px-4 py-2 w-30 rounded-lg hover:bg-[#1A455D]">
                                    Edit
                                </button>

                                <button 
                                onClick={()=> onDelete(student.student_id??0) } 
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
export default StudentTable;