import React from 'react'

const studentData = [
    {
      regno: 1,
      firstname: "John",
      lastname: "Doe",
      fathername: "Robert Doe",
      mothername: "Jane Doe",
      address: "123 Main St, Cityville",
      classname: "10th Grade",
      classsection: "A"
    },
    {
      regno: 2,
      firstname: "Emma",
      lastname: "Smith",
      fathername: "James Smith",
      mothername: "Laura Smith",
      address: "456 Park Ave, Townsville",
      classname: "10th Grade",
      classsection: "B"
    },
    // Add more sample students as needed
  ];

const StudentDetails = () => {

    
  return (
    <div>
         <div className="overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Reg No</th>
            <th className="px-4 py-2 border border-gray-300">First Name</th>
            <th className="px-4 py-2 border border-gray-300">Last Name</th>
            <th className="px-4 py-2 border border-gray-300">Father's Name</th>
            <th className="px-4 py-2 border border-gray-300">Mother's Name</th>
            <th className="px-4 py-2 border border-gray-300">Address</th>
            <th className="px-4 py-2 border border-gray-300">Class Name</th>
            <th className="px-4 py-2 border border-gray-300">Class Section</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student) => (
            <tr key={student.regno}>
              <td className="px-4 py-2 border border-gray-300">{student.regno}</td>
              <td className="px-4 py-2 border border-gray-300">{student.firstname}</td>
              <td className="px-4 py-2 border border-gray-300">{student.lastname}</td>
              <td className="px-4 py-2 border border-gray-300">{student.fathername}</td>
              <td className="px-4 py-2 border border-gray-300">{student.mothername}</td>
              <td className="px-4 py-2 border border-gray-300">{student.address}</td>
              <td className="px-4 py-2 border border-gray-300">{student.classname}</td>
              <td className="px-4 py-2 border border-gray-300">{student.classsection}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default StudentDetails