import React from 'react';

const PaginationButtons = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex mt-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
