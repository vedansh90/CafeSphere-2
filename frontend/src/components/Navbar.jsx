import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isstate, setIsState] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsState(!!token);
    const storedName = localStorage.getItem("userName");
    const userid = localStorage.getItem("userId");
    if (storedName) {
      setUsername(storedName);
      setUserId(userid);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsState(false);
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#f9f3e9] w-full z-50 shadow-[0_4px_10px_-2px_#764B36] sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between  h-16 items-center">
          {/* Logo */}
          <NavLink to={"/"}>
            <div className="text-2xl font-bold text-[#764B36] mr"  >CafeSphere</div>
          </NavLink>

          {/* Hamburger Menu */}
          <div className="flex md:hidden">
            <button onClick={toggleMobileMenu} className="text-[#764B36] focus:outline-none">
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 items-center "  >
            {isstate && (
              <li className="text-[#1F5CD5]">
                Welcome, <span className="font-medium">{username.toUpperCase()}</span>
              </li>
            )}
            
            <NavLink to="/about">
              <li className="text-[#764B36] font-medium hover:underline">About Us</li>
            </NavLink>
            <NavLink to="/contact">
              <li className="text-[#764B36] font-medium hover:underline">Contact</li>
            </NavLink>
            {isstate ? (
             
             
             <NavLink to={`/profile/${userId}`}>
             <img
               className="w-[30px] h-[30px] rounded-full cursor-pointer"
               src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg"
               alt="avatar"
             />
           </NavLink>
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
            ) : (
              <>
                <NavLink to="/add-cafe">
                  <li className="text-[#764B36] font-medium hover:underline">Add Cafe</li>
                </NavLink>
                <NavLink to="/login">
                  <li className="text-[#764B36] font-medium hover:underline">Sign in</li>
                </NavLink>
                <NavLink to="/sign">
                  <li className="text-[#764B36] font-medium hover:underline">Register</li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 justify-center items-center bg-[#f9f3e9] rounded-lg">
            {isstate && (
              <li className="text-[#1F5CD5]">
                Welcome, <span className="font-medium">{username.toUpperCase()}</span>
              </li>
            )}
            <NavLink to="/add-cafe">
              <li className="text-[#764B36] font-medium">Add Cafe</li>
            </NavLink>
            <NavLink to="/about">
              <li className="text-[#764B36] font-medium">About Us</li>
            </NavLink>
            <NavLink to="/contact">
              <li className="text-[#764B36] font-medium">Contact</li>
            </NavLink>
            {isstate ? (
              <>
                <NavLink to={`/profile/${userId}`}>
                  <li className="text-[#764B36] font-medium">My Profile</li>
                </NavLink>
                <li onClick={handleLogout} className="text-red-500 font-medium cursor-pointer">
                  Logout
                </li>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <li className="text-[#764B36] font-medium">Sign in </li>
                </NavLink>
                <NavLink to="/sign">
                  <li className="text-[#764B36] font-medium">Register</li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;