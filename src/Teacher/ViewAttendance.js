import React, { useState } from 'react';
import axios from 'axios';

const ViewAttendance = () => {
  const [regNo, setRegNo] = useState(''); // Registration number input
  const [date, setDate] = useState(''); // Date input
  const [attendanceData, setAttendanceData] = useState(null); // Holds attendance data of the searched student
  const [error, setError] = useState(null); // Error message if fetching fails

  const handleSearch = async () => {
    if (!regNo || !date) {
      setError("Please enter both registration number and date.");
      return;
    }

    try {
      // Send a GET request to the backend with regNo and date as query parameters
      const response = await axios.get('/api/get-student-attendance', {
        params: { regNo, date }
      });
      
      // Assuming response data contains the attendance status for the specified date
      setAttendanceData(response.data);
      setError(null); // Clear any existing error
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setError("Failed to fetch attendance. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-lg font-bold mb-4">View Attendance</h2>

      <input
        type="text"
        placeholder="Enter Registration Number"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-3"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-3"
      />

      <button
        onClick={handleSearch}
        className="w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {attendanceData && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold">Attendance Details:</h3>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Status:</strong> {attendanceData.status}</p>
        </div>
      )}
    </div>
  );
};

export default ViewAttendance;
