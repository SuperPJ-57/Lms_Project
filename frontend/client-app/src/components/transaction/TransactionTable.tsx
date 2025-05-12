

import { TransactionResponse } from "../../types/transaction";

interface TransactionTableProps {
    transactions: TransactionResponse[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({transactions}) => {

    return (
        
        <div className="container rounded-2xl bg-gray-200 p-3 mt-2.5 overflow-hidden">
            <table className="table-auto w-full rounded-2xl ">
                <thead className="bg-gray-600 text-white">
                    <tr className="text-left">
                        <th className="px-4 py-2 w-2.5">T_ID</th>
                        <th className="px-4 py-2 w-2.5">S_ID</th>
                        <th className="px-4 py-2">Student Name</th>
                        <th className="px-4 py-2 w-2.5">B_ID</th>
                        <th className="px-4 py-2">Book Name</th>
                        <th className="px-4 py-2 w-2.5">Type</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Due Date</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody> 
                    {transactions.map((transaction) => (
                        <tr className="border-b border-b-neutral-950" key={transaction.transaction_id}>
                            <td className=" px-4 py-2">{transaction.transaction_id}</td>
                            <td className=" px-4 py-2">{transaction.student_id}</td>
                            <td className=" px-4 py-2">{transaction.borrower_name}</td>
                            <td className=" px-4 py-2">{transaction.book_id}</td>
                            <td className=" px-4 py-2">{transaction.book_title}</td>
                            <td className=" px-4 py-2">{transaction.transaction_type}</td>
                            <td className=" px-4 py-2">{transaction.date}</td>
                            <td className=" px-4 py-2">{transaction.due_date}</td>
                            <td className=" px-4 py-2">{transaction.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );

}
export default TransactionTable;