import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setRole } = useContext(UserContext);
  const [localRole, setLocalRole] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Assuming successful login here
    setRole(localRole); // Set the role in UserContext
    console.log("Selected Role:", localRole);
    console.log("Registration Number:", registrationNumber);
    console.log("Password:", password);
    navigate('/')
    // Redirect to the main page with the sidebar, e.g., using React Router
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="hidden lg:block lg:w-1/2">
        <img src="" alt="Left Side" className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col justify-center items-center lg:w-1/2 w-full bg-gray-50 px-8 py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
        <p className="text-gray-500 mb-6">Login to your account.</p>

        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 mb-2">
              Select Role
            </label>
            <select
              id="role"
              value={localRole}
              onChange={(e) => setLocalRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="regNumber" className="block text-gray-700 mb-2">
              Registration Number
            </label>
            <input
              type="text"
              id="regNumber"
              placeholder="Enter your registration number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
