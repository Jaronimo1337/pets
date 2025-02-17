import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const EditPets = ({ pets }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [petsData, setPetsData] = useState(pets);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleEdit = async () => {
    console.log('Editing pets:', petsData);
    try {
      const response = await axios.put(`${API_URL}/pets/${pets.id}`, petsData);
      console.log('Edit response:', response);
      setIsOpen(false);
    } catch (error) {
      console.error('Edit error:', error);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
      Edit
      </button>
      <Popup open={isOpen} onClose={() => setIsOpen(false)} modal>
        <div className="popup-content h-100">
          <h2 className='text-2xl'>Edit
          </h2>
          <form className='flex flex-col'>
          <label className="block text-gray-700 text-sm font-bold mb-2">
              Date:
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="date" value={petsData.date} onChange={(e) => setPetsData({ ...petsData, date: e.target.value })} />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">

              Name:
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" value={petsData.name} onChange={(e) => setPetsData({ ...petsData, fullname: e.target.value })} />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">

              Owner
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" value={petsData.owner} onChange={(e) => setPetsData({ ...petsData, sum: e.target.value })} />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">

Time
<input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" value={petsData.time} onChange={(e) => setPetsData({ ...petsData, sum: e.target.value })} />
</label>
            </label>
            <button className="bg-amber-600 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded" onClick={handleEdit}>Save Changes</button>
          </form>
        </div>
      </Popup>
    </>
  );
};

export const EditPetsButton = ({ pets }) => {
  return (
    <EditPets pets={pets} />
  );
};