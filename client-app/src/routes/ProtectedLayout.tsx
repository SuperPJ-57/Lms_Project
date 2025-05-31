import { Outlet, Navigate, useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";

const ProtectedLayout = () => {
  const { tokens } = useAuth();
  const loaderData = useLoaderData();

  // Redirect to login if the loader indicates a redirect
  if (loaderData?.redirect) {
    return <Navigate to={loaderData.redirect} replace />;
  }

  // Redirect to login if no tokens are present
  if (!tokens) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <Navbar />
      <main className="ml-64 flex-grow h-screen overflow-y-auto bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;