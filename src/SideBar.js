import React, { useState, useContext } from 'react';
import { UserContext } from "./UserContext";
import logo from './assets/logo.png';
import control from './assets/control.png';
import Chart_fill from './assets/Chart_fill.png';
import Chat from './assets/Chat.png';
import User from './assets/User.png';
import Calendar from './assets/Calendar.png';
import Search from './assets/Search.png';
import Chart from './assets/Chart.png';
import Folder from './assets/Folder.png';
import Setting from './assets/Setting.png';
import MarksUpload from './Teacher/MarksUpload';
import AttendanceUpload from './Teacher/AttendanceUpload';
import ViewMarks from './Teacher/ViewMarks';
import ViewAttendance from './Teacher/ViewAttendance';
import Notifications from './Admin/Notifications';
import StudentDetails from './Admin/StudentDetails';
import TeacherDetails from './Admin/TeacherDetails';
import ViewStudentAttendance from './Student/ViewStudentAttendance';

const SideBar = () => {
  const { role } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  // Define sidebar menu items for each role
  const menusByRole = {
    admin: [
      { title: "Dashboard", src: Chart_fill },
      { title: "Events", src: Chat },
      { title: "Accounts", src: User, gap: true },
      { title: "Students", src: Calendar },
      { title: "Teacher Details", src: Search },
      { title: "Analytics", src: Chart },
      { title: "Attendance", src: Folder, gap: true },
      { title: "Notification", src: Setting },
    ],
    teacher: [
      { title: "View Attendance", src: Chart_fill },
      { title: "Attendance", src: Folder },
      { title: "Marks", src: Calendar },
      { title: "View Marks", src: Setting },
    ],
    student: [
      { title: "Attendance Details", src: Folder },
      { title: "Marks", src: Setting },
    ],
  };

  const Menus = menusByRole["student"] || []; // Select the menu items based on role

  const handleMenuClick = (title) => {
    setSelectedMenu(title);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className='p-8 flex justify-center bg-dark-purple text-white'>
        <h1 className='text-5xl '>Sacred Heart High School</h1>
      </div>
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${open ? "w-72" : "w-20"} bg-dark-purple h-full p-5 pt-8 relative duration-300`}>
          <img
            src={control}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img src={logo} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
            <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
              {role.toUpperCase()}
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${selectedMenu === Menu.title && "bg-light-white"}`}
                onClick={() => handleMenuClick(Menu.title)}
              >
                <img src={Menu.src} alt={Menu.title} />
                <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-7 overflow-auto">
          <h1 className="text-2xl font-semibold">{selectedMenu}</h1>
          <p className="mt-4">
            {/* Display respective content for each menu item */}
            {selectedMenu === "Dashboard" && "This is the Dashboard content."}
            {selectedMenu === "Events" && "This is the Events content."}
            {selectedMenu === "Accounts" && "This is the Accounts content."}
            {selectedMenu === "Students" && <StudentDetails />}
            {selectedMenu === "Teacher Details" && <TeacherDetails/> }
            {selectedMenu === "Analytics" && "This is the Analytics content."}
            {selectedMenu === "Attendance" && <AttendanceUpload /> }
            {selectedMenu === "Attendance Details" && <ViewStudentAttendance /> }
            {selectedMenu === "Notification" && <Notifications/>}
            {selectedMenu === "Marks" && <MarksUpload />}
            {selectedMenu === "View Marks" && <ViewMarks />}
            {selectedMenu === "View Attendance" && <ViewAttendance />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
