import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttendanceUpload = () => {
  const [students, setStudents] = useState([]); // Array to hold student objects
  const [attendance, setAttendance] = useState({}); // Object to track attendance
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [studentsPerPage] = useState(10); // Number of students to display per page

  // Fetch the students when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {

        await axios.get('http://localhost:3001/students').then((data) => {
            console.log(data.data)
            setStudents(data.data)
            
        }) 
        // Initialize attendance state for each student
        const initialAttendance = {};
        students.forEach(student => {
          initialAttendance[student.regNo] = true; // Default to present
        });
        setAttendance(initialAttendance);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchStudents();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle checkbox change
  const handleCheckboxChange = (regNo) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [regNo]: !prevAttendance[regNo], // Toggle present/absent state
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to send
    const attendanceData = students.map(student => ({
      regNo: student.regNo,
      name: student.name,
      present: attendance[student.regNo],
    }));

    try {
      // Send the attendance data to the backend
      const response = await axios.post('/api/upload-attendance', attendanceData);
      console.log('Attendance uploaded:', response.data);

      // Show success notification
      toast.success('Attendance sent successfully!');
    } catch (error) {
      console.error('Error uploading attendance:', error);
      toast.error('Error sending attendance!', {
        autoClose: 1500,
      });
    }
  };

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        {loading ? (
          <p>Loading students...</p> // Loading message
        ) : (
          currentStudents.map(student => (
            <div key={student.regNo} className="flex items-center justify-between p-2 border-b border-gray-200">
              <label className="text-gray-700 font-medium">{student.regNo} - {student.name}</label>
              <input
                type="checkbox"
                checked={attendance[student.regNo]}
                onChange={() => handleCheckboxChange(student.regNo)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          ))
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          Submit Attendance
        </button>
      </form>
      <ToastContainer />

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttendanceUpload;
