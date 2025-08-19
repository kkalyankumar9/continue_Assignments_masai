import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import { clearAuthState } from "../redux/auth/authSlice";
import axios from "axios";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Check if user is logged in
  const user = useSelector((state) => state.auth.user);

  const handleLogout =async () => {
    // dispatch(logoutUser());
    try {
      const { data } = await axios.get(
        "https://my-books-project.onrender.com/api/auth/logout",
        { withCredentials: true }
      );
      console.log(data.msg); // "Logged out successfully"

      // Clear Redux auth state
     dispatch(clearAuthState());

    } catch (err) {
      console.error("Logout failed:", err.response?.data?.msg || err.message);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
    // 👇 if logged in show logout, else login
    user
      ? { name: "Logout", href: "#", onClick: handleLogout }
      : { name: "Login", href: "/login" },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
            MyLogo
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) =>
              link.onClick ? (
                <button
                  key={link.name}
                  onClick={link.onClick}
                  className="text-gray-700 hover:text-blue-600 transition duration-200"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition duration-200"
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) =>
              link.onClick ? (
                <button
                  key={link.name}
                  onClick={() => {
                    link.onClick();
                    setIsOpen(false);
                  }}
                  className="block text-left w-full text-gray-700 hover:text-blue-600 transition duration-200"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-700 hover:text-blue-600 transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
