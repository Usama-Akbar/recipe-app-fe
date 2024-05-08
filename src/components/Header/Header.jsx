import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { ToastContainer, toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const token = localStorage.getItem("token");
  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/");
      toast.success("User Logout Successfully");
      // setIsLoggedIn(false); // Update isLoggedIn state after successful logout
    } else {
      toast.error("Token not found in localStorage");
    }
  };

  return (
    <>
      <ToastContainer />
      <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-3">
          <Link className="text-[22px] font-[500]" to="/home">
            Food Recipes
          </Link>
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            {token && (
              <Button
                title="Logout"
                className="bg-red-600 hover:bg-red-500"
                onClick={handleLogout}
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
