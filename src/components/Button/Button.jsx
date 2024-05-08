import React from 'react'
const Button = ({ className, onClick, title }) => {
  return (
    <>
       <button
                onClick={onClick}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium  text-white bg-[#52bcda] rounded-lg hover:bg-[#2994b1] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
              >
                {title}
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
    </>
  )
}

export default Button
