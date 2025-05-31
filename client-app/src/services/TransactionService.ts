import apiClient from "./authservice";
import { Transaction, TransactionResponse, Issue, Return } from "../types/transaction";

interface Pagination{
  count:number;
  next:string;
  previous:string;
  results: TransactionResponse[];
}
// Add an interceptor to include the Bearer token in all requests
// apiClient.interceptors.request.use((config) => {
//   const tokens = localStorage.getItem("tokens");
//   if (tokens) {
//     const { access_token } = JSON.parse(tokens);
//     config.headers.Authorization = `Bearer ${access_token}`;
//   }
//   return config;
// });

//const API_BASE_URL = "http://127.0.0.1:8000/api/transaction/";

export const getAllTransactions = async (page:number,pageSize:number,query?: string, completed?: boolean): Promise<Pagination> => {
  const params = new URLSearchParams();

  if (query) params.append("query", query);
  if (completed) params.append("completed", String(completed));
  params.append("page_size", String(pageSize));
  params.append("page", String(page));
  
  // if (page) params.append("page", String(page));
  const url = `/transaction/?${params.toString()}`;
  console.log(url)
  const response = await apiClient.get(url);

  return response.data;
};
export const getTransactionByBarcode = async (barcode:number) : Promise<TransactionResponse> => {
  const url = `/transaction/${barcode}/`;
  const response = await apiClient.get(url);
  return response.data;
} 



export const postTransaction = async (transaction: Return | Issue): Promise<Transaction> => {
  const response = await apiClient.post(
    `/transaction/`,
    transaction
  );
  return response.data;
};

export const updateTransaction = async (
  transaction_id: number,
  transaction: Transaction
): Promise<Transaction> => {
  const response = await apiClient.put(
    `/transaction/${transaction_id}/`,
    transaction
  );
  return response.data;
};

export const deleteTransaction = async (transaction_id: number): Promise<Transaction> => {
  const response = await apiClient.delete(
    `/transaction/${transaction_id}/`
  );
  return response.data;
};
