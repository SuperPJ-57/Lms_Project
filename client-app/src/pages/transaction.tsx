import React from "react";
import { useNavigate } from "react-router-dom";
import {  TransactionResponse } from "../types/transaction";
import {
  getAllTransactions,
} from "../services/TransactionService";
import { FaExchangeAlt } from "react-icons/fa";
import  TransactionTable  from "../components/transaction/TransactionTable";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [query,setQuery] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const { tokens } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokens) {
      navigate("/login");
    }
    fetchTransactions();
  }, [tokens,query,page,pageSize,completed,navigate]);

  const fetchTransactions = async () => {
    try {
      const response = await getAllTransactions(page,pageSize,query,completed,);
      setTransactions(response.results);
      setTotalItems(response.count);
      //console.log(response);
    } catch (error) {
      toast.error("Error fetching transactions");
    }
  };
  const pageSizeChangeHandle =  (pageSize: number) => {
    setPage(1); // Reset to first page when page size changes
    setPageSize(pageSize);
  }
  const queryChangeHandle = async (query: string) => {
    setQuery(query);
    console.log(query);
  }
  const showCompletedHandle = async (showCompleted: boolean) => {
    setCompleted(showCompleted);
  };
  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-1 my-2">
        <span className="flex items-center text-2xl ml-2">
          <FaExchangeAlt />
        </span>
        <h1 className="text-4xl">Transactions</h1>
      </div>
      <Pagination children={<TransactionTable transactions={transactions} />} 
        pageSize={pageSize}
        totalItems={totalItems}
        currentPage = {page}
        onPageChange={(page) => {
          setPage(page);
          console.log("current page: " + page);
        }}
        pageSizeChange = {pageSizeChangeHandle}
        queryChange={queryChangeHandle}
        showCompleted={showCompletedHandle}
        
      />
      
    </div>
  );
};

export default Transactions;
