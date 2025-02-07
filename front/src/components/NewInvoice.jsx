import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";

function AddInvoiceButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [invoice, setInvoice] = useState({
    fullname: "",
    date: "",
    sum: "",
    status: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const handleAddInvoice = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/invoice`,
        invoice
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
        className="bg-white hover:bg-amber-100 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => setIsOpen(true)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="#1A1D23"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      <Popup open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Add New Invoice</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Fullname
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={invoice.fullname}
                onChange={(e) =>
                  setInvoice({ ...invoice, fullname: e.target.value })
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
                value={invoice.date}
                onChange={(e) =>
                  setInvoice({ ...invoice, date: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={invoice.sum}
                onChange={(e) =>
                  setInvoice({ ...invoice, sum: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={invoice.status}
                onChange={(e) =>
                  setInvoice({ ...invoice, status: e.target.value })
                }
              >
                <option value="">Select Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <button
              className="bg-amber-600 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddInvoice}
            >
              Add Invoice
            </button>
          </form>
        </div>
      </Popup>
    </div>
  );
}

export default AddInvoiceButton;
