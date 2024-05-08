import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import cardImage from "../assets/image-1.jpg";

const Home = () => {
  const [searchItem, setSearchItem] = useState("");
  const [food, setFood] = useState([]);
  const [fetchReceipe, setFetchReceipe] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [ingredients, setIngredient] = useState("");
  const [Description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [formData, setFormData] = useState({});
  const modalRef = useRef(null);
  const navigate = useNavigate();
  // =======================Fetch Recipe Data================================

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:4000/api/recipe/allrecipies",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setFood(data.recipes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchReceipe]);

  const cardDetails = (id) => {
    navigate(`/detail/${id}`);
  };

  const searchData = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchItem(term);
    if (term) {
      // Filter the data based on the search term
      setFood(food.filter((item) => item.name.toLowerCase().startsWith(term)));
    } else {
      // If the search term is empty, reset the food list to its original state
      const token = localStorage.getItem("token");
      fetchData(token); // Fetch food data again
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchData(token);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log("ye form ka data hai", formData);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  const getName = (e) => {
    setName(e.target.value);
  };
  const getIngredients = (e) => {
    setIngredient(e.target.value);
  };
  const getDescription = (e) => {
    setDescription(e.target.value);
  };
  const getImageFile = (e) => {
    setImageFile(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }
    const data = {
      name: name,
      ingredients: ingredients,
      description: Description,
      image: imageFile,
    };
    // ==========================Add Recipe Data==============================
    try {
      const response = await fetch(
        "http://localhost:4000/api/recipe/addrecipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }
      setFetchReceipe(!fetchReceipe);
      console.log("Recipe added successfully");
      setName("");
      setIngredient("");
      setDescription("");
      setImageFile("");
      closeModal();
    } catch (error) {
      console.error("Error adding recipe:", error.message);
    }
  };

  return (
    <>
      <div className="lg:mt-10">
        <div className=" flex w-full justify-end lg:mt-[-20px] mb-10">
          <Button
            type="button"
            onClick={openModal}
            className="pl-10 pr-10 py-3 text-[17px]"
            title="Add Recipe"
          />
        </div>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            name="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            onChange={(e) => searchData(e)}
            value={searchItem}
          />
        </div>
      </div>
      <div className="lg:flex lg:flex-row md:flex-col sm:flex-row gap-8 py-10 w-full h-screen sm:h-auto md:h-auto lg:h-auto flex-wrap">
        {food.map((item) => (
          <div
            key={item._id}
            className="max-w-sm mb-5 mx-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <Link>
              <img
                className="rounded-t-lg  h-[250px]"
                src={item.image || cardImage}
                alt={item.name}
                width={350}
                height={100}
              />
            </Link>

            <div className="p-5">
              <Link>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                {item.description.length > 3
                  ? `${item.description.slice(0, 30)}...`
                  : item.description}
              </p>
              <ul className="mb-3">
                {item.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <Button title="Details" onClick={() => cardDetails(item._id)} />
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div
            ref={modalRef}
            className="lg:w-1/3 bg-white w-full mx-4 mt-20 p-8 rounded-lg"
          >
            <h2 className="text-2xl text-center font-bold mb-4">Add Recipe</h2>
            <div>
              <form onSubmit={submitForm} class="max-w-sm mx-auto">
                <div class="mb-5">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Recipe Name
                  </label>
                  <input
                    type="text"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name of Food"
                    required
                    value={name}
                    onChange={getName}
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ingredients
                  </label>
                  <input
                    type="text"
                    id="password"
                    placeholder="Enter Ingredients"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={ingredients}
                    onChange={getIngredients}
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write Description About Food..."
                    onChange={getDescription}
                    value={Description}
                  ></textarea>
                </div>
                <div class="mb-5">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Image
                  </label>
                  <input
                    type="text"
                    id="image"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={imageFile}
                    onChange={getImageFile}
                    placeholder="Enter Image URL "
                  />
                </div>
                <Button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  title="Add Racipe"
                />
              </form>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700 absolute top-3 right-3"
              onClick={closeModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
