import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewStudentAttendance = ({ studentId }) => {
  const [month, setMonth] = useState('06'); // Default to June
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (studentId && month) {
      fetchAttendance();
    }
  }, [studentId, month]);

  const fetchAttendance = async () => {
    try {
      const { startDate, endDate } = getMonthDates(month);
      const response = await axios.get(`/api/get-student-attendance`, {
        params: { studentId, startDate, endDate },
      });
      setAttendance(response.data.attendance);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  // Helper function to get the start and end dates of a given month accurately
  const getMonthDates = (month) => {
    const year = new Date().getFullYear(); // Use the current year
    const startDate = new Date(year, parseInt(month)-1, 2);
    const endDate = new Date(year, parseInt(month), 1); // Last day of the month
    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Attendance for Student ID: {studentId}</h2>
      
      <label className="block mb-2">Select Month:</label>
      <select
        value={month}
        onChange={handleMonthChange}
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length > 0 ? (
              attendance.map((record, index) => (
                <tr key={index} className="border-b hover:bg-blue-50">
                  <td className="px-4 py-2 text-center">{record.date}</td>
                  <td className="px-4 py-2 text-center">{record.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-2 text-center text-gray-500">No attendance data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudentAttendance;
