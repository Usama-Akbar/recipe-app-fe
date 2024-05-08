import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setUserEmail(e.target.value);
  const handlePasswordChange = (e) => setUserPassword(e.target.value);
 const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      email: userEmail,
      password: userPassword
    };

    fetch("https://recipe-app-be-ivll.vercel.app/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          setIsLoggedIn(true);
        }
        setResponseMessage(data.message);
        navigate('/')
      })
      .catch((error) => {
        console.error("Error:", error);
        setResponseMessage("Error occurred while registering.");
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <h1 className="text-center lg:text-[26px] font-[600]">Registration Form</h1>
      <form onSubmit={handleSubmit} className="max-w-sm lg:mx-auto mx-4 my-20">
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Email"
            required
            value={userEmail}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={userPassword}
            onChange={handlePasswordChange}
          />
        </div>
        {responseMessage && <p className="text-red-500">{responseMessage}</p>}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3 md:mb-0"
          >
            Register
          </button>
          <Link className="font-[500] mt-3 md:mt-0" to="/">
            Back
          </Link>
        </div>
      </form>
    </>
  );
}

export default Register;
