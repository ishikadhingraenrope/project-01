import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (

<>
<nav className="bg-[#3f271e] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-white">MySite</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-white font-medium">
          <Link to="/" className="hover:text-amber-500">Home</Link>
          <Link to="/about" className="hover:text-amber-500">About</Link>
          <Link to="/service" className="hover:text-amber-500">Services</Link>
          <Link to="/contact" className="hover:text-amber-500">Contact</Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            <FaBars className="text-white"/>

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
        </div>
      )}
    </nav>


</>


 
  );
};
export default Header;