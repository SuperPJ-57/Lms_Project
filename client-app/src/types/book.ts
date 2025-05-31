export interface BookResponse{
    book_id?:number;
    title:string;
    author_id:number;
    author_name?:string;
    genre:string;
    isbn:string;
    quantity?:number;
}

export interface Book{
    title:string;
    genre:string;
    isbn:string;
    author:number;
}