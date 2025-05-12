import React, { useState, useEffect } from "react";
import {  FaUserAlt } from "react-icons/fa";
import StudentTable from "../components/student/StudentTable";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import {
  getAllStudents,
  deleteStudent,
  updateStudent,
  postStudent,
} from "../services/StudentService";
import { Student } from "../types/student";
import StudentForm from "../components/student/StudentForm";
import { useNavigate } from "react-router-dom";

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { tokens } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokens) {
      navigate("/login");
    }
    fetchStudents();
  }, [tokens, navigate]);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response);
      console.log(response);
    } catch (error) {
      toast.error("Error fetching students");
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    console.log("selected" + student.name);
  };

  const handleDelete = async (student_id: number) => {
    try {
      await deleteStudent(student_id);
      toast.success("Student deleted successfully!");
      fetchStudents();
    } catch (err) {
      toast.error("Failed to delete student.");
    }
  };
  const handleSave = async (student: Student) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.student_id ?? 0, student);
        toast.success("Student updated successfully");
      } else {
        await postStudent(student);
        toast.success("Student added successfully");
      }
      setSelectedStudent(null);
      fetchStudents();
    } catch (error) {
      toast.error("Error saving student");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-1 my-2">
        <span className="flex items-center text-2xl ml-2">
          <FaUserAlt />
        </span>
        <h1 className="text-4xl">Student</h1>
      </div>
      <StudentForm selectedStudent={selectedStudent} onSave={handleSave} />

      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
export default Students;
