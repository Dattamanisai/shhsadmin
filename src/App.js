import React from 'react'
import SideBar from './SideBar'
import { UserProvider } from './UserContext';
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import LoginPage from './LoginPage'
import MarksUpload from './Teacher/MarksUpload';
import ViewMarks from './Teacher/ViewMarks';
import ViewAttendance from './Teacher/ViewAttendance';
import Notifications from './Admin/Notifications';
import StudentDetails from './Admin/StudentDetails';
import TeacherDetails from './Admin/TeacherDetails';
import ViewStudentAttendance from './Student/ViewStudentAttendance';
import AttendanceUpload from './Teacher/AttendanceUpload';
const App = () => {
  return (
    <div>
      <UserProvider>
       <BrowserRouter> 
          <Routes>
            <Route path="/" element={<SideBar />} />
            <Route path="/attendance-upload" element={<AttendanceUpload />} />
            <Route path="/marks-upload" element={<MarksUpload />} />
            <Route path="/view-marks" element={<ViewMarks />} />
            <Route path="/view-attendance" element={<ViewAttendance />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/student-details" element={<StudentDetails />} />
            <Route path="/teacher-details" element={<TeacherDetails />} />
            <Route path="/view-student-attendance" element={<ViewStudentAttendance />} />
            {/* Add additional routes as necessary */}
          </Routes>
        
      </BrowserRouter>
    </UserProvider>

    </div>
  )
}

export default App