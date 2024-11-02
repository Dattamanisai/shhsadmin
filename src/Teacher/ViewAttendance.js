import React from 'react'
import { useState } from 'react';
const ViewAttendance= () => {

    const [regNo, setRegNo] = useState(''); // Registration number input
    const [marksData, setMarksData] = useState(null); // Holds marks data of the searched student
  

  return (
    <div>
        <div className="max-w-md mx-auto p-6">
      <h2 className="text-lg font-bold mb-4">View Attendance</h2>
      <input
        type="text"
        placeholder="Enter Registration Number"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        
        className="w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
      
      
    </div>
    </div>
  )
}

export default ViewAttendance;
