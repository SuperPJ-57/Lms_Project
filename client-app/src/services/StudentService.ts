import apiClient from "./authservice";
import { Student } from "../types/student";

// Add an interceptor to include the Bearer token in all requests
// axios.interceptors.request.use((config) => {
//   const tokens = localStorage.getItem("tokens");
//   if (tokens) {
//     const { access_token } = JSON.parse(tokens);
//     config.headers.Authorization = `Bearer ${access_token}`;
//   }
//   return config;
// });

export const getAllStudents = async (query? : string): Promise<Student[]> => {
  const url = query?
  `/student/?query=${query}`:
  `/student/`;
  const response = await apiClient.get(url);
  return response.data;
};
export const postStudent = async (student: Student): Promise<Student> => {
  const response = await apiClient.post(
    `/student/`,
    student
  );
  return response.data;
};
export const updateStudent = async (
  student_id: number,
  student: Student
): Promise<Student> => {
  const response = await apiClient.put(
    `/student/${student_id}/`,
    student
  );
  return response.data;
};
export const deleteStudent = async (student_id: number): Promise<Student> => {
  const response = await apiClient.delete(
    `/student/${student_id}/`
  );
  return response.data;
};
