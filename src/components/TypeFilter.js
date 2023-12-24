import React, { useEffect } from 'react';
const TypeFilter = ({ types, handleTypeChange }) => {
  return (
    <div className='border border-black'>
      <select onChange={(e) => handleTypeChange(e.target.value)}>
        <option value="">Filter by Type</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};
export default TypeFilter;