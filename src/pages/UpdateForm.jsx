import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    ingredients: ""
  });
console.log(formData)
  useEffect(() => {
    // Fetch recipe data based on the ID
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://recipe-app-be-ivll.vercel.app/api/recipe/getsinglerecipe/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFormData(data?.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://recipe-app-be-ivll.vercel.app/api/recipe/updaterecipe/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }
      navigate("/home")
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <>
      <div className="lg:flex lg:justify-center sm:flex w-full  px-4">
        <div className="lg:w-1/3 bg-white mt-20  rounded-lg">
          <h2 className="text-2xl text-center font-bold mb-4">Update Food Recipe</h2>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe Name</label>
              <input type="text"  id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name of Food" required value={formData?.name} onChange={handleChange} />
            </div>
            <div className="mb-5">
              <label htmlFor="ingredients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredients</label>
              <input type="text" id="ingredients" name="ingredients" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={formData.ingredients} onChange={handleChange} />
            </div>
            <div className="mb-5">
              <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea id="desc"  name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Description About Food..." onChange={handleChange} value={formData.description}></textarea>
            </div>
            <div className="mb-5">
              <label htmlFor="img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image</label>
              <input id="img" name="image" accept="img/*" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Paste Your Image URL" value={formData.image} onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full py-3 pl-[150px]" title="Submit" onClick={handleSubmit}/>
          </form>
          <button className="text-gray-500 hover:text-gray-700 absolute top-3 right-3">
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
