export interface TransactionResponse{
    transaction_id: number;
    student_id: number;
    borrower_name: string;
    book_id: number;
    book_title: string;
    barcode: string;
    transaction_type:string;
    date: string;
    due_date: string;
    status: string;
    user:string;
}

export interface Transaction{
    student:number;
    user:number;
    book:number;
    bookcopy:number;
    transaction_type:string;
    status:string;
}

export interface Return{
    student:number;
    user:string,
    book:number;
    bookcopy:number;
    transaction_type:string;
    date:string;
}

export interface Issue{
    student:number;
    user:string,
    book:number;
    bookcopy:number;
    transaction_type:string;
    date:string;
}