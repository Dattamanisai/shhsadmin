import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MarksUpload = () => {
  const [assessmentType, setAssessmentType] = useState('');
  const [file, setFile] = useState(null);

  // Function to handle file upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to handle form submission for upload
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file || !assessmentType) {
      toast.error("Please select an assessment type and upload a file");
      return;
    }

    const formData = new FormData();
    formData.append('assessmentType', assessmentType);
    formData.append('file', file);

    fetch('/api/upload-marks', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("File uploaded successfully");
        console.log(data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        toast.error("Error uploading file");
      });
  };

  // Function to handle form submission for update
  const handleUpdate = (event) => {
    event.preventDefault();
    if (!file || !assessmentType) {
      toast.error("Please select an assessment type and upload a file");
      return;
    }

    const formData = new FormData();
    formData.append('assessmentType', assessmentType);
    formData.append('file', file);

    fetch('/api/update-marks', {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Marks updated successfully");
        console.log(data);
      })
      .catch((error) => {
        console.error('Error updating marks:', error);
        toast.error("Error updating marks");
      });
  };

  // Function to download the template
  const downloadTemplate = () => {
    const csvContent = `data:text/csv;charset=utf-8,StudentRegNo,Telugu,Hindi,English,Mathematics,Physics,Biology,Social\n\n`; // Default headers
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "marks_template.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg sm:p-8">
      <ToastContainer  autoClose={3000} />
      
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Upload Student Marks</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="assessmentType" className="block text-gray-700 text-sm font-semibold mb-2">
            Select Assessment Type
          </label>
          <select
            id="assessmentType"
            value={assessmentType}
            onChange={(e) => setAssessmentType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Choose an option</option>
            <option value="fa-1">FA-1</option>
            <option value="fa-2">FA-2</option>
            <option value="sa-1">SA-1</option>
            <option value="fa-3">FA-3</option>
            <option value="fa-4">FA-4</option>
            <option value="sa-2">SA-2</option>
          </select>
        </div>

        <div>
          <label htmlFor="file" className="block text-gray-700 text-sm font-semibold mb-2">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".xlsx, .csv"
            required
            className="w-full text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 p-2"
          />
        </div>

        <button
          type="button"
          onClick={downloadTemplate}
          className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
        >
          Download Template
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          Upload
        </button>

        <button
          type="button"
          onClick={handleUpdate}
          className="w-full bg-yellow-500 text-white font-bold py-2 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default MarksUpload;
