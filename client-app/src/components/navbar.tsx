import React from "react";
import { FaUser, FaBook, FaUsers, FaExchangeAlt, FaClipboardList, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

const Navbar: React.FC = () => {
  const linkStyle = "flex items-center gap-2 p-2 hover:bg-[#255d81] rounded";

  return (
    <div className="fixed bg-[#255D81] text-white h-screen w-64 flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">HSMSS LIBRARY</h2>
      <nav className="flex flex-col gap-4">
        <a href="/dashboard" className={linkStyle}><FaTachometerAlt /> Dashboard</a>
        <a href="/author" className={linkStyle}><FaUser /> Author</a>
        <a href="/book" className={linkStyle}><FaBook /> Books</a>
        <a href="/bookcopy" className={linkStyle}><FaBook /> Book Copies</a>
        <a href="/student" className={linkStyle}><FaUsers /> Students</a>
        <a href="/transaction" className={linkStyle}><FaExchangeAlt /> Transaction</a>
        <a href="/issue" className={linkStyle}><FaClipboardList /> Issue</a>
        <a href="/return" className={linkStyle}><FaClipboardList /> Return</a>
      </nav>
      <div className="mt-auto">
        <a href="#" className="flex items-center gap-2 p-2 hover:bg-red-700 rounded"><FaSignOutAlt /> Log Out</a>
      </div>
    </div>
  );
};

export default Navbar;
