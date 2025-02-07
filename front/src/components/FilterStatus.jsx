import { useState } from 'react';

const FilterStatus = ({ handleFilterChange, filter }) => {
    const [selectedStatus, setSelectedStatus] = useState(filter.status);
  
    const handleStatusChange = (event) => {
        const selectedStatus = event.target.value;
        setSelectedStatus(selectedStatus);
        if (selectedStatus === 'All') {
          handleFilterChange({ status: '' });
        } else {
          handleFilterChange({ status: selectedStatus });
        }
      };
  
    return (
      <div>
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Draft">Draft</option>
        </select>
      </div>
    );
  };
export default FilterStatus;