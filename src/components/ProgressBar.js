// ProgressBar.js
import React from 'react';

const ProgressBar = ({ label, value }) => {
  const percentage = (value / 100) * 100; // Assuming the stat values are in the range 0-100

  return (
    <div className="mb-2">
      <span className="inline-block w-20 mr-2">{label}:</span>
      <div className="bg-gray-200 h-2 rounded-md">
        <div
          className="bg-blue-500 h-2 rounded-md"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
