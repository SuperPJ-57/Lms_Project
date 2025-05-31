import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";

interface PaginationProps {
  children: React.ReactNode;
  pageSize: number;
  totalItems: number;
  currentPage: number;
  pageSizeChange: (pageSize: number) => void;
  queryChange: (query: string) => Promise<void>;
  showCompleted: (completed: boolean) => void;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  children,
  pageSize,
  totalItems,
  currentPage,
  pageSizeChange,
  queryChange,
  showCompleted,
  onPageChange,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="container rounded border border-gray-300 p-3 my-3 overflow-hidden flex flex-col">
      {/* first row */}
      <div className="flex justify-between">
        <div className="dropdown">
          <span>Show </span>
          <select
            className="p-1 border rounded"
            onChange={(e) => {
              const selectedValue = Number(e.target.value); // Ensure it's a number
              if (!isNaN(selectedValue)) {
                pageSizeChange(selectedValue);
                console.log("Page size:", selectedValue);
              }
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <span> entries</span>
        </div>
        <div>
          <span>Show completed </span>
          <input
            type="checkbox"
            className="ml-2"
            onChange={(e) => {
              showCompleted(e.target.checked);
              console.log("check status: " + e.target.checked);
            }}
          />
        </div>
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            className="border-2 rounded-md border-[#255D81] focus:shadow-lg p-2 pr-10 w-full outline-none"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              queryChange(e.target.value);
            }}
          />
          <button className="absolute inset-y-0 right-3 flex items-center text-[#255D81]">
            <Search size={20} />
          </button>
        </div>
      </div>
      {/* second row */}
      <div>{children}</div>

      {/* third row */}
      <div className="pagination align-right">
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-gray-700">
            Showing {pageSize * (currentPage - 1) + 1} to{" "}
            {((pageSize * currentPage)>=totalItems)?totalItems:pageSize*currentPage} of {totalItems} entries
          </span>

          <nav className="me-2">
            <ul className="flex list-none space-x-2">
              {/* Previous Button */}
              <button
                className={`px-3 py-1 border rounded-md text-[#255D81] ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#255D81] hover:text-white"
                }`}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {[...Array(Math.ceil(totalItems / pageSize))].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <li key={pageNumber}>
                    <button
                      className={`px-3 py-1 border rounded-md ${
                        currentPage === pageNumber
                          ? "bg-[#255D81] text-white"
                          : "text-[#255D81] hover:bg-[#255D81] hover:text-white"
                      }`}
                      onClick={() => onPageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                );
              })}

              {/* Next Button */}
              <button
                className={`px-3 py-1 border rounded-md text-[#255D81] ${
                  currentPage === Math.ceil(totalItems / pageSize)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#255D81] hover:text-white"
                }`}
                disabled={currentPage === Math.ceil(totalItems / pageSize)}
                onClick={() => onPageChange(currentPage + 1)}
              >
                Next
              </button>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
