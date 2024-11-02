import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentMarks = ({ regNo }) => {
  const [marksData, setMarksData] = useState([]);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await axios.get(`/api/get-student-marks`, {
          params: { regNo },
        });
        setMarksData(response.data);
      } catch (error) {
        console.error("Error fetching marks:", error);
      }
    };

    if (regNo) {
      fetchMarks();
    }
  }, [regNo]);

  return (
    <div className="mt-4 max-w-full overflow-x-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Marks for Reg No: {regNo}</h2>
      
      <table className="min-w-full bg-white border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-blue-500 text-white text-sm md:text-base">
            <th className="px-2 py-2 md:px-4">Exam Name</th>
            <th className="px-2 py-2 md:px-4">Subject</th>
            <th className="px-2 py-2 md:px-4">Marks</th>
          </tr>
        </thead>
        <tbody>
          {marksData.map((exam, examIndex) => (
            exam.subjectMarksList.map((subject, subIndex) => (
              <tr key={`${examIndex}-${subIndex}`} className="border-b text-sm md:text-base">
                {subIndex === 0 && (
                  <td rowSpan={exam.subjectMarksList.length} className="px-2 py-2 font-semibold bg-gray-100 text-center">
                    {exam.examName}
                  </td>
                )}
                <td className="px-2 py-2">{subject.subjectName}</td>
                <td className="px-2 py-2">{subject.marks}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentMarks;
