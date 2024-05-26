import React from 'react';
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { authUser } = useAuthContext();

  return (
    <header className="w-full bg-glass border-b sticky top-0 z-50 backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center">
          <img className="h-6 mr-2" src="/github.svg" alt="Github Logo" />
          <h1 className="text-lg font-bold">xithub</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            to="/"
            className="px-2 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-800 h-10 flex items-center"
          >
            Home
          </Link>

          {authUser && (
            <>
              <Link
                to="/likes"
                className="px-2 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-800 h-10 flex items-center"
              >
                Likes
              </Link>
              <Link
                to="/explore"
                className="px-2 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-800 h-10 flex items-center"
              >
                Explore
              </Link>
            </>
          )}

          {!authUser && (
            <>
              <Link
                to="/login"
                className="px-2 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-800 h-10 flex items-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-2 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-800 h-10 flex items-center"
              >
                Signup
              </Link>
            </>
          )}

          {authUser && <Logout />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
