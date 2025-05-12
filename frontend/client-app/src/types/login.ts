export interface User {
    userId: string;
    user_name: string;
    password?: string;
    email: string;
  }
 
  export interface LoginDto {
    user_name: string;
    password: string;
  }
 
  export interface Tokens {
    access_token: string;
    refresh_token: string;
  }