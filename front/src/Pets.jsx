import axios from "axios";
import AddPetsButton from "./components/AddPet";
import { useEffect, useState } from "react";
import { EditPetsButton } from "./components/EditPets";
import Logout from "./components/Logout";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState('date'); 
  const [order, setOrder] = useState('desc'); 
  const API_URL = import.meta.env.VITE_API_URL;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;

    try {
      await axios.delete(`${API_URL}/pets/${id}`, { withCredentials: true });
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const getPets = async () => {
    try {
      const { data: response } = await axios.get(`${API_URL}/pets`, {
        params: { page, limit, search, sort, order },
        withCredentials: true,
      });
      setPets(response.data);
      setTotal(response.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPets();
  }, [page, search, limit, sort, order]);

  return (
    <>
      <header>
        <h1 className="p-3 text-white flex justify-center bg-blue-800 text-4xl">
          Pets Medicare <div className="text-xl justify-end"><Logout/></div>
        </h1>
      </header>

      <section className="mx-50 text-xl mt-5">
        <div>
          <AddPetsButton />
        </div>

        <input 
          type="text" 
          placeholder="Search by name or notes" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full mb-3"
        />

<div className="flex mb-3">
          <div className="mr-3">
            <label className="mx-1">Sort By</label>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)} 
              className="border p-2 rounded-md"
            >
              <option value="name">Name</option>
              <option value="date">Date</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <div>
            <label className="mx-1">Order</label>
            <select 
              value={order} 
              onChange={(e) => setOrder(e.target.value)} 
              className="border p-2 rounded-md"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>


        <div className="flex justify-between mb-3">
          <button 
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
            disabled={page === 1}
            className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button 
            onClick={() => setPage((prev) => (prev * limit < total ? prev + 1 : prev))}
            disabled={page * limit >= total}
            className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="overflow-auto h-[35rem]">
          {pets.map((pet) => (
            <div className="flex border-b-2 border-dotted" key={pet.id}>
              <button
                onClick={() => handleDelete(pet.id)}
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
              </button><div className="mr-3 ">
              <EditPetsButton pets={pet}/></div>
              <div className="flex w-full flex-col justify-between">
                <div className=" flex justify-between">
                  <h2 className="text-purple-900">{pet.name}</h2>
                  <div className="flex">
                    <p>
                      {new Date(pet.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="mx-1">
                      {new Date(pet.date).toLocaleTimeString("en-US", {
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
                    {pet.owner}
                  </p>
                  <p>{pet.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className=" p-3 bg-blue-900 mt-3">
        <div className="flex justify-between mx-50 text-white text-[1rem]">
          <p>All rights reserved</p>
          <p>Techin</p>
        </div>
      </footer>
    </>
  );
};

export default Pets;