import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  console.log(id);

  const editData = () => {
    console.log("Clicked");
    navigate(`/updateform/${id}`);
  };

  const deleteData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://recipe-app-be-ivll.vercel.app/api/recipe/deleterecipe/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await response.json();

      if (!response.ok) {
        toast.error("Failed to delete recipe");
        return;
      } else {
        toast.success(res.message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      toast.error("Error deleting recipe:", error.message);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://recipe-app-be-ivll.vercel.app/api/recipe/getsinglerecipe/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRecipe(data.recipe);
      } catch (error) {
        toast.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <h1 className="py-10 text-center text-[22px] font-[500]">Card Details</h1>
      <div className="lg:justify-left p-4 shadow-md sm:flex sm:flex-col  sm:items-center sm:justify-center   md:flex-col  lg:flex lg:h-[60vh] lg:flex-row lg:gap-3">
        <div className=" lg:flex lg:w-1/2 lg:items-center lg:justify-center">
          <img src={recipe.image} alt="" className="w-full lg:w-1/2"/>
        </div>
        <div className="h-[90%] w-[1px] bg-gray-500"></div>
        <div className="flex flex-col gap-3 px-10 py-10 font-[500] lg:w-1/2 ">
          <div className="flex">
            Food Name:<h1 className="ml-2 font-[400]">{recipe.name}</h1>
          </div>
          <div className="flex">
            Food Ingredients:
            <h1 className="ml-2 font-[400]">
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </h1>
          </div>
          <div className="flex">
            Food Description:
            <h1 className="font-[400] ml-2">
              {recipe.description.length > 30
                ? `${recipe.description.slice(0, 30)}...`
                : recipe.description}
            </h1>
          </div>

          <div className="mt-10 flex items-center justify-center gap-10">
            <Button
              className="py-4 pl-10 pr-10 text-[17px]"
              title="Update"
              onClick={() => editData(id)}
            />
            <Button
              className="bg-[red] py-4 pl-10 pr-10 text-[15px]"
              title="Delete"
              onClick={deleteData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
