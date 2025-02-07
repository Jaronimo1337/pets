import { useState, useEffect } from "react";
import axios from "axios";
import AddInvoiceButton from "./components/NewInvoice";
import { EditInvoiceButton } from "./components/EditInvoice";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Logout from "./components/Logout";
import { lazy, Suspense } from "react";

const FilterStatus = lazy(() => import("./components/FilterStatus"));

const API_URL = import.meta.env.VITE_API_URL;
const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const [filter, setFilter] = useState({ status: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handleFilterChange = (filter) => {
    console.log("Filter changed:", filter);

    if (filter.status === "All") {
      setFilter({ status: "" });
    } else {
      setFilter(filter);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/invoice?page=${page}&limit=${limit}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (filter.status === "") {
          setInvoices(response.data);
          setTotalCount(response.data.totalCount);
        } else {
          const filteredInvoices = response.data.filter(
            (invoice) => invoice.status === filter.status
          );
          setInvoices(filteredInvoices);
        }
      })
      .catch((error) => {
        console.log("API error:", error);
        setError(error.message);
      });
  }, [filter, page, limit]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  if (error) {
    return (
      <div className="text-red-900 text-2xl p-5">
        Error: {error} Please{" "}
        <a className="text-blue-600" href="/login">
          {" "}
          login
        </a>{" "}
        or{" "}
        <a className="text-blue-600" href="/">
          register
        </a>
      </div>
    );
  }

  return (
    <div className="main--container">
      <div className="secondary--container">
        <header className="main--header">
          <h1 className="h1--header">Invoices</h1>
          <div className="pt-2 flex items-center ">
            <span className=" bg-amber-50/25 rounded-full pr-1 flex items-center">
              <AddInvoiceButton />
              <span className="text-white ml-2">New Invoice</span>
            </span>
            <div>
              <Logout />
            </div>
          </div>
        </header>
        <p className="text-white pb-2">
          There are {invoices.length} total invoices
        </p>
        <div className="text-white mb-3 flex justify-end">
          Filter by Status{" "}
          <div className="pl-2">
            <Suspense fallback={<div>Loading...</div>}>
              <FilterStatus
                handleFilterChange={handleFilterChange}
                filter={filter}
              />
            </Suspense>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {invoice.hash}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {invoice.fullname}
                  </th>
                  <td className="px-6 py-4">
                    Due{" "}
                    {new Date(invoice.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">{invoice.sum}$</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-5 py-2 text-xs font-bold rounded-full capitalize
    ${invoice.status === "Paid" ? "status-paid" : ""}
    ${invoice.status === "Pending" ? "status-pending" : ""}
    ${invoice.status === "Draft" ? "status-draft" : ""}
  `}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <EditInvoiceButton invoice={invoice} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-3">
            <button
              className=" items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <button
              className="items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
            <select
              className=" ml-1 items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-[0.5rem] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              value={limit}
              onChange={(e) => handleLimitChange(e.target.value)}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
