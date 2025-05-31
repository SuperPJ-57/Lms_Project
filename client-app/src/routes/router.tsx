import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Authors from "../pages/author";
import Books from "../pages/book";
import Students from "../pages/student";
import Transactions from "../pages/transaction";
import ReturnForm from "../pages/return";
import IssueForm from "../pages/issue";
import BookCopies from "../pages/bookcopy";
import { dashboardLoader } from "./dashboardLoader";
import { authorLoader } from "./authorLoader";
import ProtectedLayout from "./ProtectedLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />, // Redirect to /login by default
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "author",
        element: <Authors />,
        loader: authorLoader,
      },
      { path: "book", element: <Books /> },
      { path: "bookcopy", element: <BookCopies /> },
      { path: "student", element: <Students /> },
      { path: "transaction", element: <Transactions /> },
      { path: "issue", element: <IssueForm /> },
      { path: "return", element: <ReturnForm /> },
    ],
  },
]);