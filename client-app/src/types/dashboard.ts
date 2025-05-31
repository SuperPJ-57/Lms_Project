export interface DashboardData{
    total_borrowed_books : number;
    total_returned_books : number;
    total_user_base : number;
    total_books : number;
    available_books : number;
    user_name : string;
    user_id : string;
    email : string;
    total_faculty : number;

}

export interface OverdueBorrower{
    borrower_id : number;
    borrower_name : string;
    borrow_id : number;
    borrower_email : string;
    due_date : string;
    book_title : string;
}