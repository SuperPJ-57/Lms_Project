import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Return } from "../types/transaction";
import { FaArrowCircleUp } from "react-icons/fa";
import { getUserByUsername } from "../services/UserService";
import { toast } from "react-toastify";
import { BookCopy } from "../types/bookcopy";
import { getBookCopyByBarcode } from "../services/BookCopyService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { postTransaction } from "../services/TransactionService";
import SuggestionBox from "../components/SuggestionBox";
import { getAllStudents } from "../services/StudentService";

const IssueForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const [suggestions, setSuggestions] = useState<Object[]>([]);
  const [username, setUsername] = useState<string | null>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [ttype] = useState<string>("Borrow");
  const { tokens } = useAuth();
  const navigate = useNavigate();

  const studentNameWatch = watch("studentName");

  useEffect(() => {
    if (!tokens) {
      navigate("/login");
    } else {
      setFields();
    }
  }, [tokens, navigate]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (studentNameWatch?.length > 1) {
        const response = await getAllStudents(studentNameWatch);
        setSuggestions(response);
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [studentNameWatch]);

  const setFields = async () => {
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername);
    if (!storedUsername) {
      toast.error("User not logged in");
      return;
    }

    const user = await getUserByUsername(storedUsername);
    setValue("user", user.userId);
  };

  const onSubmit = async (data: any) => {
    const transaction: Return = {
      student: data.student,
      user: data.user,
      book: data.book,
      bookcopy: data.barcode,
      transaction_type: ttype,
      date: data.date,
    };

    try {
      await postTransaction(transaction);
      toast.success("Book issued successfully");
      reset();
      setBookTitle("");
    } catch (error) {
      toast.error("Error saving Transaction");
    }
  };

  const handleBarcodeBlur = async () => {
    const barcode = getValues("barcode");
    if (barcode) {
      try {
        const bookcopy: BookCopy = await getBookCopyByBarcode(Number(barcode));
        setValue("book", bookcopy.book_id);
        setBookTitle(bookcopy.title ?? "");
      } catch (error) {
        setError("barcode", { type: "manual", message: "Invalid barcode" });
        setBookTitle("");
        setValue("book", "");
      }
    }
  };

  const styling =
    "bg-white rounded border border-[#255D81] focus:border-[#255D81] focus:border-2 focus:outline-none p-2";

  return (
    <div className="container p-6 bg-gray-200 rounded-2xl mx-auto">
      <div className="flex gap-1">
        <span className="flex items-center text-2xl">
          <FaArrowCircleUp />
        </span>
        <h1 className="text-4xl">Issue</h1>
      </div>

      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
        <form className="grid grid-cols-2 gap-3.5" onSubmit={handleSubmit(onSubmit)}>
          {/* Barcode */}
          <div className="flex flex-col gap-2">
            <label>Barcode</label>
            <input
              className={styling}
              type="text"
              {...register("barcode", { required: "Barcode is required" })}
              onBlur={handleBarcodeBlur}
            />
            {errors.barcode && (
              <span className="text-red-500 text-sm">{errors.barcode.message?.toString()}</span>
            )}
          </div>

          {/* Hidden student id */}
          <div className="flex flex-col gap-2" hidden>
            <label>Student Id</label>
            <input className={styling} type="text" {...register("student", { required: true })} />
            {errors.student && (
              <span className="text-red-500 text-sm">Student ID is required</span>
            )}
          </div>

          {/* Student name + suggestions */}
          <div className="flex flex-col gap-2 relative">
            <label>Student Name</label>
            <input
              className={styling}
              type="text"
              {...register("studentName", { required: "Student name is required" })}
            />
            {errors.studentName && (
              <span className="text-red-500 text-sm">{errors.studentName.message?.toString()}</span>
            )}
            <SuggestionBox
              suggestions={suggestions}
              idKey="student_id"
              nameKey="name"
              onClick={(id: number, name: string) => {
                setValue("student", id);
                setValue("studentName", name);
                setSuggestions([]);
              }}
            />
          </div>

          {/* Hidden user and book */}
          <div className="flex flex-col gap-2" hidden>
            <label>User Id</label>
            <input className={styling} type="text" {...register("user")} readOnly />
          </div>

          <div className="flex flex-col gap-2" hidden>
            <label>Book Id</label>
            <input className={styling} type="text" {...register("book")} readOnly />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label>Username</label>
            <input
              className={`${styling} bg-gray-200 cursor-not-allowed`}
              type="text"
              value={username ?? ""}
              readOnly
            />
          </div>

          {/* Book title */}
          <div className="flex flex-col gap-2">
            <label>Book Title</label>
            <input
              className={styling}
              type="text"
              value={bookTitle ?? ""}
              onChange={(e) => setBookTitle(e.target.value)}
              readOnly
            />
          </div>

          {/* Transaction type */}
          <div className="flex flex-col gap-2">
            <label>Transaction Type</label>
            <input
              className={`${styling} bg-gray-500 cursor-not-allowed`}
              type="text"
              value={ttype}
              disabled
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label>Issue Date</label>
            <input
              className={styling}
              type="date"
              {...register("date", { required: "Issue date is required" })}
            />
            {errors.date && (
              <span className="text-red-500 text-sm">{errors.date.message?.toString()}</span>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="bg-[#255D81] text-white px-4 py-2 rounded-lg hover:bg-[#1A455D]"
            >
              Issue Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
