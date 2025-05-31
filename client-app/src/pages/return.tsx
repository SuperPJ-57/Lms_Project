import { useState, useEffect } from "react";
import { Return } from "../types/transaction";
import {  FaUndo } from "react-icons/fa";
import { TransactionResponse } from "../types/transaction";
import {
  getTransactionByBarcode,
  postTransaction,
} from "../services/TransactionService";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ReturnForm: React.FC = () => {
  const [studentId, setStudentId] = useState<number>();
  const [bookId, setBookId] = useState<number>();
  const [bookTitle, setBookTitle] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const username = sessionStorage.getItem("username");
  const [barcode, setBarcode] = useState<number>();
  const [ttype] = useState<string>("Return");
  const [date, setDate] = useState<string>("");

  const { tokens } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokens) {
      navigate("/login");
    }
  }, [tokens, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transaction: Return = {
      student: studentId!,
      user: userId,
      book: bookId!,
      bookcopy: barcode!,
      transaction_type: ttype,
      date: date,
    };
    try {
      await postTransaction(transaction);
      toast.success("Book returned successfully");
      setBarcode(undefined);
      setStudentId(undefined);
      setStudentName("");
      setBookId(undefined);
      setBookTitle("");
      setUserId("");
      setDate("");
    } catch (error) {
      toast.error("Error saving Transaction");
    }
  };

  const styling =
    "bg-white rounded border border-[#255D81] focus:border-[#255D81] focus:border-2 focus:outline-none p-2";
  return (
    <div className="container p-6 bg-gray-200 rounded-2xl mx-auto ">
      <div className="flex gap-1">
        <span className="flex items-center text-2xl">
          <FaUndo />
        </span>
        <h1 className="text-4xl">Return</h1>
      </div>

      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
        <form className="grid grid-cols-2 gap-3.5 " onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label>Barcode</label>
            <input
              className={styling}
              type="text"
              name="ReturnID"
              value={barcode ?? ""}
              onChange={(e) => {
                setBarcode(Number(e.target.value));
              }}
              onBlur={async () => {
                if (barcode) {
                  const transaction: TransactionResponse =
                    await getTransactionByBarcode(barcode);
                  setStudentId(transaction.student_id);
                  setStudentName(transaction.borrower_name);
                  setBookId(transaction.book_id);
                  setBookTitle(transaction.book_title);
                  setUserId(transaction.user);
                }
              }}
              required
            ></input>
          </div>
          <div className="flex flex-col gap-2" hidden>
            <label>Student Id</label>
            <input
              className={styling}
              type="text"
              name="Name"
              value={studentId ?? ""}
              onChange={(e) => {
                setStudentId(Number(e.target.value));
              }}
              required
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <label>Student Name</label>
            <input
              className={styling}
              type="text"
              value={studentName ?? ""}
              onChange={(e) => {
                setStudentName(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col gap-2" hidden>
            <label>User Id</label>
            <input
              className={styling}
              type="text"
              value={studentName ?? ""}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col gap-2" hidden>
            <label>Book Id</label>
            <input
              className={styling}
              type="text"
              value={studentName ?? ""}
              onChange={(e) => {
                setBookId(Number(e.target.value));
              }}
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <label>Username</label>
            <input
              className={`${styling} bg-gray-200 cursor-not-allowed`}
              type="text"
              value={username ?? ""}
              readOnly
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <label>Book Title</label>
            <input
              className={styling}
              type="text"
              value={bookTitle ?? ""}
              onChange={(e) => {
                setBookTitle(e.target.value);
              }}
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <label>Transaction Type</label>
            <input
              className={`${styling} bg-gray-500 cursor-not-allowed`}
              type="text"
              value={ttype}
              disabled
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <label>Return Date</label>
            <input
              className={styling}
              type="date"
              value={date ?? ""}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#255D81] text-white px-4 py-2 rounded-lg hover:bg-[#1A455D]"
            >
              Return Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ReturnForm;
