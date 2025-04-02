import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import logo from "../../images/logo.png"
function Navbar() {
  const navigate = useNavigate();
 const {checkId,setCheckId} = useContext(userContext);

  return (
    <nav className="bg-white shadow-md px-6 py-3 w-full">
      <div className={`max-w-7xl mx-auto flex sm:flex-row justify-between items-center ${checkId && (`flex-col`)}`}>
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            // src="https://tailwindflex.com/public/images/logo.svg"
            src={logo}
            className="w-12 h-12"
            alt="Logo"
          />
        </Link>


        {/* Navigation & Buttons */}
        {(checkId)?(<>
          <div className="flex items-center gap-x-4">
            
          <Link
            to="/create-post"
            className="sm:text-lg font-semibold px-2 sm:px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            + Create Blog
          </Link>

          <Link
            to="/my-past-post"
            className="sm:text-lg font-semibold px-2 sm:px-4 py-2 rounded-md bg-gray-200 text-black hover:bg-gray-300 transition"
          >
            My Paste Blog
          </Link>

          <button onClick={()=>{
            localStorage.removeItem("authToken")

            setCheckId(null);
            navigate("/");
            }} className="px-2 sm:px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-200 transition">
            Log out
          </button>

        </div>
        </>):(<>
          <div className="flex items-center gap-x-4">
          <Link to="/auth" className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-200 transition">
            Log in
          </Link>

        </div>
        </>)}
  
      </div>
    </nav>
  );
}

export default Navbar;
