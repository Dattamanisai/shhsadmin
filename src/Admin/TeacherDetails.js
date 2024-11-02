import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './DataTable';

const sampleTeachers = [
  {
    empId: "T001",
    firstName: "John",
    lastName: "Doe",
    subject: "Mathematics",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    empId: "T002",
    firstName: "Jane",
    lastName: "Smith",
    subject: "Science",
    email: "jane.smith@example.com",
    phone: "0987654321",
  },
  {
    empId: "T003",
    firstName: "Alice",
    lastName: "Johnson",
    subject: "English",
    email: "alice.johnson@example.com",
    phone: "1122334455",
  },
];

const fields = [
  { key: 'empId', label: 'Employee ID' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'subject', label: 'Subject' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
];

const TeacherDetails = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('/api/get-teachers');
        setTeachers(response.data.teachers); // Assuming response structure has `teachers`
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Teacher Details</h2>

      <DataTable
        data={teachers.length > 0 ? teachers : sampleTeachers}
        fields={fields}
        title="Teacher"
        isStudent={false}
      />
    </div>
  );
};

export default TeacherDetails;
