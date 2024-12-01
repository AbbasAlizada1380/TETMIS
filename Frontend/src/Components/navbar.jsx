import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  return (
    <nav className="bg-gray-800 p-4  w-full h-auto fixed">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Your Logo</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded" onClick={handleLinkClick}>
            Home
          </Link>
          <Link to="/services" className="text-white hover:bg-gray-700 px-3 py-2 rounded" onClick={handleLinkClick}>
            Services
          </Link>
          <Link to="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded" onClick={handleLinkClick}>
            About Us
          </Link>
          <Link to="/contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded" onClick={handleLinkClick}>
            Contact
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <Link to="/" className="block text-white hover:bg-gray-600 px-4 py-2" onClick={handleLinkClick}>
            Home
          </Link>
          <Link to="/services" className="block text-white hover:bg-gray-600 px-4 py-2" onClick={handleLinkClick}>
            Services
          </Link>
          <Link to="/about" className="block text-white hover:bg-gray-600 px-4 py-2" onClick={handleLinkClick}>
            About Us
          </Link>
          <Link to="/contact" className="block text-white hover:bg-gray-600 px-4 py-2" onClick={handleLinkClick}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
