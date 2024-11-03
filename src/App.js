import React from 'react'
import SideBar from './SideBar'
import { UserProvider } from './UserContext';
import { BrowserRouter,Route,Routes,Router } from 'react-router-dom'
import LoginPage from './LoginPage'
import MarksUpload from './Teacher/MarksUpload';
import ViewMarks from './Teacher/ViewMarks';
import ViewAttendance from './Teacher/ViewAttendance';
import Notifications from './Admin/Notifications';
import StudentDetails from './Admin/StudentDetails';
import TeacherDetails from './Admin/TeacherDetails';
import ViewStudentAttendance from './Student/ViewStudentAttendance';
import AttendanceUpload from './Teacher/AttendanceUpload';
import Dashboard from './Admin/Dashboard';
import SideBar2 from './SideBar2';
import Header from './Header';
const App = () => {
  return (
    <div>
      <UserProvider>

       <BrowserRouter> 
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/attendance-upload" element={<AttendanceUpload />} />
            <Route path="/marks-upload" element={<MarksUpload />} />
            <Route path="/view-marks" element={<ViewMarks />} />
            <Route path="/view-attendance" element={<ViewAttendance />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/student-details" element={<StudentDetails />} />
            <Route path="/teacher-details" element={<TeacherDetails />} />
            <Route path="/view-student-attendance" element={<ViewStudentAttendance />} /> */}
            {/* Add additional routes as necessary */}
          </Routes>    
     </BrowserRouter>
      <BrowserRouter> 
      <Header/>
      <div className="flex">
      <SideBar2 />
      <div className="flex-1 p-7 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance-upload" element={<AttendanceUpload />} />
          <Route path="/marks-upload" element={<MarksUpload />} />
          <Route path="/view-marks" element={<ViewMarks />} />
          <Route path="/view-attendance" element={<ViewAttendance />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/teacher-details" element={<TeacherDetails />} />
          <Route path="/view-student-attendance" element={<ViewStudentAttendance />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
    </UserProvider>

    </div>
  )
}

export default App