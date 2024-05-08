import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
console.log(id)
  const editData = () => {
    console.log("Clicked");
    navigate(`/updateform/${id}`);
  };

  const deleteData = async () => {
    try{
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:4000/api/recipe/deleterecipe/${id}`, {
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    navigate('/home')
    console.log("this is response")
    console.log(response)
    const data = await response.json();
    setRecipe(data.recipe);
  }catch (error) {
    console.error("Error fetching recipe:", error);
  }
}
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:4000/api/recipe/getsinglerecipe/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        console.log("this is response")
        console.log(response)
        const data = await response.json();
        setRecipe(data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }





  return (
    <>
      <h1 className="text-center text-[22px] font-[500] py-10">Card Details</h1>
      <div className="lg:flex lg:flex-row sm:flex sm:justify-center sm:items-center  sm:flex-col md:flex-col   lg:gap-3  lg:h-[60vh] lg:justify-left shadow-md p-4">
        <div className="lg:w-1/2 lg:flex lg:justify-center overflow-hidden lg:items-center">
          <img src={recipe.image} alt="" width={450}  />
        </div>
        <div className="w-[1px] h-[90%] bg-gray-500"></div>
        <div className="font-[500] flex flex-col gap-3 px-10 py-10 lg:w-1/2 ">
          <h1>Food Name: {recipe.name}</h1>
          <h1 className="mt-6">
            Food Ingredients:{" "}
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </h1>
          <h1 className="mt-6">Food Description:               {recipe.description.length > 30 ? `${recipe.description.slice(0, 30)}...` : recipe.description}</h1>
          <div className="flex justify-center gap-10 items-center mt-10">
            <Button
              className="pl-10 pr-10 py-4 text-[17px]"
              title="Update"
              onClick={() => editData(id)}
            />
            <Button
              className="pl-10 pr-10 py-4 bg-[red] text-[15px]"
              title="Delete"
              onClick={() => deleteData(id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
