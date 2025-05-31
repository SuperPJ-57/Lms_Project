import { useState,useEffect } from "react";
import { Student } from "../../types/student";

interface StudentFormProps {
    selectedStudent? : Student | null;
    onSave : (student:Student) => Promise<void>;
}



const StudentForm : React.FC<StudentFormProps> = ({selectedStudent,onSave}) => {

    const [department,setDepartment] = useState<string>('');
    const [studentName,setStudentName] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [contactNumber,setContactNumber] = useState<string>('');
    const [studentID,setStudentID] = useState<number>();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(selectedStudent)
        {
            console.log("selected student");
            onSave({student_id:studentID??0,name:studentName,department:department,email:email,contact_number:contactNumber});

        }
        else{
            console.log("new student");
            onSave({name:studentName,email:email,contact_number:contactNumber,department:department});
        }
        setStudentName('');
        setEmail('');
        setStudentID(undefined);
        setContactNumber('');
        setDepartment('');
    }
    useEffect(()=>{
        if(selectedStudent){
            setStudentName(selectedStudent.name);
            setEmail(selectedStudent.email);
            setStudentID(selectedStudent.student_id);
            setDepartment(selectedStudent.department);
            setContactNumber(selectedStudent.contact_number);
            console.log("selected; "+selectedStudent.student_id);
        }
        else{
            console.log("not selected");
            setStudentName('');
            setEmail('');
            setContactNumber('');
            setDepartment('');
            
            setStudentID(undefined);
        }
    },[selectedStudent]);
    return (
        <div className="form container p-3  bg-gray-200 rounded-2xl">
                <form className='grid grid-cols-2 gap-2' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2' hidden>
                        <label>Student ID</label>
                        <input className='bg-gray-400 rounded cursor-not-allowed focus:border-blue-600 focus:border-2 focus:outline-none p-2' type="text" name="StudentID" 
                        value={studentID??''}
                        onChange={
                            (e)=>{
                                setStudentID(parseInt(e.target.value));
                            }
                        }
                         disabled></input>
                    </div>
                    <div className='flex flex-col gap-2'> 
                        <label>Student Name</label>
                        <input className='bg-gray-400 rounded focus:border-blue-600 focus:border-2 focus:outline-none focus:bg-white p-2' type="text" name="Name"
                        value={studentName??''}
                        onChange={
                            (e)=>{
                                setStudentName(e.target.value);
                            }
                        }
                        required></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Email</label>
                        <input className='bg-gray-400 rounded focus:border-blue-600 focus:border-2 focus:outline-none focus:bg-white p-2' type="text" name="Email" 
                        value={email??''}
                        onChange={
                            (e)=>{
                                setEmail(e.target.value);
                            }
                        }
                        ></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>Department</label>
                        <input className='bg-gray-400 rounded focus:border-blue-600 focus:border-2 focus:outline-none focus:bg-white p-2' type="text" name="Department" 
                        value={department??''}
                        onChange={
                            (e)=>{
                                setDepartment(e.target.value);
                            }
                        }
                        ></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>Contact No.</label>
                        <input className='bg-gray-400 rounded focus:border-blue-600 focus:border-2 focus:outline-none focus:bg-white p-2' type="text" name="ContactNumber" 
                        value={contactNumber??''}
                        onChange={
                            (e)=>{
                                setContactNumber(e.target.value);
                            }
                        }
                        ></input>
                    </div>    

                    <div>

                        <button type="submit" className="bg-[#255D81] text-white px-4 py-2 rounded-lg hover:bg-[#1A455D]"
                        
                        >
                            {selectedStudent?'Update':'Add'}
                        </button>
                    </div>
                </form>
            </div>
    );
}
export default StudentForm;