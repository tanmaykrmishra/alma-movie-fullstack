// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the useUser hook
import { FaSignOutAlt } from "react-icons/fa";
function Header() {
  const { user, logout } = useUser(); // Use the context

  return (
    <header className="bg-gray-900 p-4 text-white flex items-center justify-between">
      <div className="text-2xl font-bold">
        <Link to="/">MyMovies</Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/tvshows">TV Shows</Link>
          </li>
          <li>
            <Link to="/bookmarks">Bookmarks</Link>
          </li>
          <li>
            {user ? (
              <button
                onClick={logout}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <span className="mr-2">{user.name}</span>
                <FaSignOutAlt size={20} />
              </button>
            ) : (
              <Link to="/signin" className="text-blue-500">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
