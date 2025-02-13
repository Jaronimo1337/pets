import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";

function AddPetsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [pets, setPets] = useState({
    name: "",
    owner: "",
    date: "",
    time: "",
    notes: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const handleAddPets = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/pets`,
        pets
      );
      console.log(response.data);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-800 hover:bg-blue-600 py-3 my-3 text-white flex justify-center items-center font-bold w-full"
        onClick={() => setIsOpen(true)}
      >
        <svg
          className="w-6 h-6 "
          fill="none"
          stroke="#FFFFFF"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg> Add appointment
      </button>

      <Popup open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Add New pets</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Pets name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={pets.name}
                onChange={(e) =>
                  setPets({ ...pets, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Pets owners name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={pets.owner}
                onChange={(e) =>
                  setPets({ ...pets, owner: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={pets.date}
                onChange={(e) =>
                  setPets({ ...pets, date: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Time
  </label>
  <input
    type="time"
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    value={pets.time}
    onChange={(e) =>
      setPets({ ...pets, time: e.target.value })
    }
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Notes
  </label>
  <textarea
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    value={pets.notes}
    onChange={(e) =>
      setPets({ ...pets, notes: e.target.value })
    }
  />
</div>
            <button
              className="bg-amber-600 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddPets}
            >
              Add pets
            </button>
          </form>
        </div>
      </Popup>
    </div>
  );
}

export default AddPetsButton;
