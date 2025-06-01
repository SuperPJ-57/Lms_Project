import { useState, useEffect } from "react";
import { BookCopy } from "../../types/bookcopy";
import SuggestionBox from "../SuggestionBox";
import { getAllBooks } from "../../services/BookService";
interface BookCopyFormProps {
  selectedBookCopy?: BookCopy | null;
  onSave: (bookcopy: BookCopy  ) => Promise<void>;
}

const BookCopyForm: React.FC<BookCopyFormProps> = ({ selectedBookCopy, onSave }) => {
  const [barcode, setBarcode] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [bookId, setBookId] = useState<number>();
  const [status, setStatus] = useState<boolean>(true);
  const [suggestions, setSuggestions] = useState<Object[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBookCopy) {
      console.log("selected bookcopy");
      onSave({
        barcode: barcode ?? 0,        
        is_available: status,
        book_id: bookId?? 0,
      });
      
    } else {
      console.log("new bookcopy");
      onSave({
        barcode: barcode ?? 0,        
        is_available: status,
        book_id: bookId?? 0,
      });
    }
    setTitle("");
    setStatus(true);
    setBookId(undefined);
    setBarcode(undefined);
    setBookId(undefined);
  };
  useEffect(() => {
    if (selectedBookCopy) {
      setTitle(selectedBookCopy.title??'');
      setStatus(selectedBookCopy.is_available);
      setBarcode(selectedBookCopy.barcode);
      setBookId(selectedBookCopy.book_id);
      console.log("selected; " + selectedBookCopy.barcode);
    } else {
      console.log("not selected");
      setTitle("");
      setStatus(true);
      setBookId(undefined);
      setBarcode(undefined);
    }
  }, [selectedBookCopy]);


  const onSuggestionClick = (id:number , name: string) => {
    setBookId(id);
    setTitle(name);
    setSuggestions([]);
  }

  return (
    <div className="form container p-3  bg-gray-200 rounded-2xl">
      <form className="grid grid-cols-1 gap-3 mx-2 gap-x-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          

          <label>Barcode</label>
          <input
          className="bg-gray-400 rounded focus:border-blue-600 focus:border-2 focus:outline-none p-2"
            type="text"
            value={barcode ?? ""}
            required
            name="barcode"
            onChange={(e) => {
              setBarcode(parseInt(e.target.value));
            }}
          />
        </div>


        <div className="flex flex-col gap-2 relative">
          <label>Book Title</label>
          <input
            className="bg-gray-400 rounded focus:border-blue-600 focus:border-2 focus:outline-none p-2"
            type="text"
            name="title"
            value={title ?? ""}
            onChange={async (e) => {
                setTitle(e.target.value);
                //setAuthorId(undefined);
                const response = await getAllBooks(e.target.value);
                //console.log(response);
                setSuggestions(response);
                suggestions.forEach((suggestion: any) => {
                    console.log(suggestion.name);
                }
                );
            }}
          ></input>
          < SuggestionBox suggestions={suggestions}
            idKey = "book_id"
            nameKey = "title"
        onClick={onSuggestionClick}/>
        </div>

        
        <div className="flex flex-col gap-2" hidden>
          <label>Book Id</label>
          <input
            className="bg-gray-400 rounded focus:border-blue-600 focus:border-2 focus:outline-none p-2"
            type="text"
            name="bookId"
            value={bookId ?? ""}
            onChange={(e) => {
              setBookId(Number(e.target.value));
            }}

            required
          ></input>
        </div>

        <div className="flex flex-col gap-2">
          <label>Status</label>
          <select
            className="bg-gray-400 rounded focus:border-blue-600 focus:border-2 focus:outline-none p-2"
            disabled
            name="Status"
            value={status.toString()}
            onChange={(e) => {
              setStatus(e.target.value === "true");
            }}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>

        </div>

       

        
        

        

        <div>
          <button
            type="submit"
            className="bg-[#255D81] text-white px-4 py-2 rounded-lg hover:bg-[#1A455D] w-30"
          >
            {selectedBookCopy ? "Update BookCopy" : "Add BookCopy"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default BookCopyForm;
