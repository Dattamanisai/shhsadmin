import React, { useState } from 'react';
import StudentMarks from '../Student/StudentMarks';

const ViewMarks = () => {
  const [regNo, setRegNo] = useState('');
  const [searchRegNo, setSearchRegNo] = useState(null);

  const handleSearch = () => {
    setSearchRegNo(regNo);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Search Student Marks</h2>
      
      <div className="flex flex-col md:flex-row items-center mb-4">
        <input
          type="text"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          placeholder="Enter Student Reg No"
          className="p-2 border rounded mb-4 md:mb-0 md:mr-2 w-full"
        />
        <button 
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded w-full md:w-auto"
        >
          Search
        </button>
      </div>

      {searchRegNo && <StudentMarks regNo={searchRegNo} />}
    </div>
  );
};

export default ViewMarks;
