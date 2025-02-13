import axios from "axios";
import AddPetsButton from "./components/AddPet";
import { useEffect, useState } from "react";
const Pets = () => {
  const [pets, setPets] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/pets/${id}`);
      console.log(response.data);
      setPets(pets.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getPets = async () => {
      try {
        const { data: response } = await axios.get(`${API_URL}/pets`, {
          withCredentials: true,
        });
        setPets(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPets();
  }, []);
  return (
    <>
      <header>
        <h1 className="p-3 text-white flex justify-center bg-blue-800 text-4xl">
          Pets Medicare
        </h1>
      </header>

      <section className="mx-50 text-xl mt-5">
        <div>
          <AddPetsButton />
        </div>
<div className="overflow-auto h-[35rem]">
        {pets.map((pets) => (
  <div className="flex border-b-2 border-dotted" key={pets.id}>
    <button
      onClick={() => handleDelete(pets.id)}
      className="bg-red-500 hover:bg-red-700 text-white font-bold mt-1 mr-1 px-3 w-10 h-5 rounded"
    >
      <svg
        fill="#000000"
        width="15px"
        height="15px"
        viewBox="0 0 256 256"
        id="Flat"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M205.65674,194.34326a7.99984,7.99984,0,1,1-11.31348,11.31348L128,139.31348,61.65674,205.65674a7.99984,7.99984,0,0,1-11.31348-11.31348L116.68652,128,50.34326,61.65674A7.99984,7.99984,0,0,1,61.65674,50.34326L128,116.68652l66.34326-66.34326a7.99984,7.99984,0,0,1,11.31348,11.31348L139.31348,128Z" />
      </svg>
    </button>
    <div className="flex w-full flex-col justify-between">
      <div className=" flex justify-between">
        <h2 className="text-purple-900">{pets.name}</h2>
        <div className="flex">
          <p>
            {new Date(pets.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="mx-1">
            {new Date(pets.date).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </div>
      </div>
      <div>
        <p>
          <span className="text-gray-500">Owner: </span>
          {pets.owner}
        </p>
        <p>{pets.notes}</p>
      </div>
    </div>
  </div>
))}</div>
      </section>
      <footer className=" p-3 bg-blue-900 mt-15">
        <div className="flex justify-between  mx-50 text-white text-[1rem] "><p>All rights reserved</p>
        <p>Techin</p></div>
      </footer>
    </>
  );
};
export default Pets;
