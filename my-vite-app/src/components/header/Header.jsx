import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
    const storedUser = localStorage.getItem("userdata");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Only set user as logged in if they're not marked as logged out
      if (!userData.loggedOut) {
        setUser(userData);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    const userData = JSON.parse(localStorage.getItem("userdata"));
    if (userData) {
      // Keep the user data but mark as logged out
      userData.loggedOut = true;
      localStorage.setItem("userdata", JSON.stringify(userData));
    }
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-[#3f271e] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-white">MySite</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-white font-medium items-center">
            <Link to="/" className="hover:text-amber-500">Home</Link>
            <Link to="/about" className="hover:text-amber-500">About</Link>
            <Link to="/service" className="hover:text-amber-500">Services</Link>
            <Link to="/contact" className="hover:text-amber-500">Contact</Link>
            {user ? (
              <button onClick={handleLogout} className="ml-4 px-3 py-1 bg-red-500 rounded hover:bg-red-600">Logout</button>
            ) : (
              <>
                <Link to="/login" className="hover:text-amber-500">Login</Link>
                <Link to="/signup" className="hover:text-amber-500">Signup</Link>
                <Link to="/login?admin=true" className="block text-white hover:text-amber-500">Admin</Link>

              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-gray-700 focus:outline-none"
            >
              <FaBars className="text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link to="/" className="block text-white hover:text-amber-500">Home</Link>
            <Link to="/about" className="block text-white hover:text-amber-500">About</Link>
            <Link to="/service" className="block text-white hover:text-amber-500">Services</Link>
            <Link to="/contact" className="block text-white hover:text-amber-500">Contact</Link>

            {user ? (
              <button onClick={handleLogout} className="block w-full text-left px-0 py-2 bg-red-500 rounded hover:bg-red-600 mt-2">Logout</button>
            ) : (
              <>
                <Link to="/login" className="block text-white hover:text-amber-500">Login</Link>
                <Link to="/signup" className="block text-white hover:text-amber-500">Signup</Link>
                <Link to="/admin" className="block text-white hover:text-amber-500">Admin</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;