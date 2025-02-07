import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const EditInvoice = ({ invoice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(invoice);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleEdit = async () => {
    console.log('Editing invoice:', invoiceData);
    try {
      const response = await axios.put(`${API_URL}/invoice/${invoice.id}`, invoiceData);
      console.log('Edit response:', response);
      setIsOpen(false);
    } catch (error) {
      console.error('Edit error:', error);
    }
  };
  
  const handleDelete = async (event) => {
    try {
      const response = await axios.delete(`${API_URL}/invoice/${invoice.id}`);
      console.log('Delete response:', response);
      setIsOpen(false);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill='#FFFFFF' d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
      </button>
      <Popup open={isOpen} onClose={() => setIsOpen(false)} modal>
        <div className="popup-content h-100">
          <h2 className='text-2xl'>Edit Invoice</h2>
          <form className='flex flex-col'>
          <label className="block text-gray-700 text-sm font-bold mb-2">
              Date:
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="date" value={invoiceData.date} onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })} />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">

              Fullname:
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" value={invoiceData.fullname} onChange={(e) => setInvoiceData({ ...invoiceData, fullname: e.target.value })} />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">

              Sum:
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" value={invoiceData.sum} onChange={(e) => setInvoiceData({ ...invoiceData, sum: e.target.value })} />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">

              Status:
              <select value={invoiceData.status} onChange={(e) => setInvoiceData({ ...invoiceData, status: e.target.value })}>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Draft">Draft</option>
              </select>
            </label>
            <button className="bg-amber-600 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded" onClick={handleEdit}>Save Changes</button>
            <button type="button" className="bg-red-600 my-1 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>Delete Invoice</button>
          </form>
        </div>
      </Popup>
    </>
  );
};

export const EditInvoiceButton = ({ invoice }) => {
  return (
    <EditInvoice invoice={invoice} />
  );
};