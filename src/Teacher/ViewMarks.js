import React, { useState } from 'react';
import axios from 'axios';

const sampleData = {
    "12345": {
      Telugu: { FA1: 80, FA2: 85, SA1: 90, FA3: 75, FA4: 88, SA2: 92 },
      Hindi: { FA1: 78, FA2: 82, SA1: 89, FA3: 74, FA4: 85, SA2: 90 },
      English: { FA1: 88, FA2: 90, SA1: 92, FA3: 85, FA4: 89, SA2: 94 },
      Maths: { FA1: 90, FA2: 93, SA1: 95, FA3: 88, FA4: 92, SA2: 96 },
      Science: { FA1: 85, FA2: 87, SA1: 91, FA3: 80, FA4: 88, SA2: 93 },
      Social: { FA1: 82, FA2: 86, SA1: 90, FA3: 78, FA4: 84, SA2: 89 },
    }
  };

const ViewMarks = () => {
  const [regNo, setRegNo] = useState(''); // Registration number input
  const [marksData, setMarksData] = useState(null); // Holds marks data of the searched student

  // Handler for fetching the marks
  const fetchMarks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/marks/${regNo}`); // Endpoint to fetch marks by regNo
      console.log(response.data)
      setMarksData(response.data);
      console.log(marksData)
    } catch (error) {
      console.error("Error fetching marks:", error);
      setMarksData(null); // Reset if fetch fails
    }
  };

  // Render subjects and assessments in a table
  const renderMarksTable = () => {
    if (!marksData) return null;

    const subjects = ['Telugu', 'Hindi', 'English', 'Maths', 'Science', 'Social'];
    const assessments = ['FA1', 'FA2', 'SA1', 'FA3', 'FA4', 'SA2'];

    return (
      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Subject</th>
            {assessments.map(assessment => (
              <th key={assessment} className="border px-4 py-2">{assessment}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject}>
              <td className="border px-4 py-2 font-semibold">{subject}</td>
              {assessments.map(assessment => (
                <td key={assessment} className="border px-4 py-2">
                  {marksData[subject] ? marksData[subject][assessment] || '-' : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-lg font-bold mb-4">View Student Marks</h2>
      <input
        type="text"
        placeholder="Enter Registration Number"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        onClick={fetchMarks}
        className="w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
      
      {marksData ? renderMarksTable() : <p className="text-gray-500 mt-4">Enter a registration number to view marks.</p>}
    </div>
  );
};

export default ViewMarks;
