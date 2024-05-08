import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import foodLogo from '../../assets/foodLOgo.png'

const  Navbar = () => {
 

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <Link className="text-[22px] font-[500]" to="/">
            Food Recipes
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
           <img src={foodLogo} alt="Logo" width={50}/>
          </div>
        </div>
      </nav>
      
    </>
  );
}

export default Navbar;
