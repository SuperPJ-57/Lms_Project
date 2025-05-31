import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SuggestionBox from "../SuggestionBox";
import { Book, BookResponse } from "../../types/book";
import { getAllAuthors } from "../../services/AuthorService";

interface BookFormProps {
  selectedBook?: BookResponse | null;
  onSave: (book: Book | BookResponse) => Promise<void>;
}

interface BookFormData {
  book_id?: number;
  title: string;
  isbn: string;
  genre: string;
  author_id: number;
  authorName: string;
}

const BookForm: React.FC<BookFormProps> = ({ selectedBook, onSave }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookFormData>();

  const [suggestions, setSuggestions] = useState<Object[]>([]);

  const watchAuthorName = watch("authorName", "");

  // Update suggestions on authorName change
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (watchAuthorName.trim() !== "") {
        try {
          const response = await getAllAuthors(watchAuthorName);
          setSuggestions(response);
        } catch (error) {
          setError("authorName", {
            type: "manual",
            message: "Failed to fetch suggestions.",
          });
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [watchAuthorName, setError]);

  const onSuggestionClick = (id: number, name: string) => {
    setValue("author_id", id);
    setValue("authorName", name);
    setSuggestions([]);
  };

  const onSubmit = async (data: BookFormData) => {
    if (!data.author_id) {
      setError("authorName", {
        type: "manual",
        message: "Please select a valid author from suggestions.",
      });
      return;
    }

    const bookData: Book | BookResponse = selectedBook
      ? {
          book_id: data.book_id ?? 0,
          title: data.title,
          isbn: data.isbn,
          genre: data.genre,
          author: data.author_id,
        }
      : {
          title: data.title,
          isbn: data.isbn,
          genre: data.genre,
          author: data.author_id,
        };

    await onSave(bookData);
    reset(); // Clear the form
  };

  // Populate form fields on edit
  useEffect(() => {
    if (selectedBook) {
      setValue("book_id", selectedBook.book_id);
      setValue("title", selectedBook.title);
      setValue("isbn", selectedBook.isbn);
      setValue("genre", selectedBook.genre);
      setValue("author_id", selectedBook.author_id);
      setValue("authorName", selectedBook.author_name ?? "");
    } else {
      reset();
    }
  }, [selectedBook, setValue, reset]);

  return (
    <div className="form container p-3 bg-gray-200 rounded-2xl">
      <form
        className="grid grid-cols-2 gap-3 mx-2 gap-x-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Book Title */}
        <div className="flex flex-col gap-2">
          <label>Book Title</label>
          <input
            className="bg-gray-400 rounded p-2 focus:border-blue-600 focus:border-2 focus:outline-none"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </div>

        {/* ISBN */}
        <div className="flex flex-col gap-2">
          <label>ISBN</label>
          <input
            className="bg-gray-400 rounded p-2 focus:border-blue-600 focus:border-2 focus:outline-none"
            {...register("isbn", {
              required: "ISBN is required",
              minLength: { value: 10, message: "ISBN must be at least 10 characters" },
            })}
          />
          {errors.isbn && <p className="text-red-600">{errors.isbn.message}</p>}
        </div>

        {/* Genre */}
        <div className="flex flex-col gap-2">
          <label>Genre</label>
          <input
            className="bg-gray-400 rounded p-2 focus:border-blue-600 focus:border-2 focus:outline-none"
            {...register("genre", { required: "Genre is required" })}
          />
          {errors.genre && <p className="text-red-600">{errors.genre.message}</p>}
        </div>

        {/* Author Name w/ Suggestion */}
        <div className="flex flex-col gap-2 relative">
          <label>Author Name</label>
          <input
            className="bg-gray-400 rounded p-2 focus:border-blue-600 focus:border-2 focus:outline-none"
            {...register("authorName", { required: "Author name is required" })}
          />
          {errors.authorName && (
            <p className="text-red-600">{errors.authorName.message}</p>
          )}
          <SuggestionBox
            suggestions={suggestions}
            idKey="author_id"
            nameKey="name"
            onClick={onSuggestionClick}
          />
        </div>

        {/* Hidden Fields */}
        <input type="hidden" {...register("book_id")} />
        <input type="hidden" {...register("author_id", { required: true })} />

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-[#255D81] text-white px-4 py-2 rounded-lg hover:bg-[#1A455D] w-30"
          >
            {selectedBook ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
