import React from 'react'
import SideBar from './SideBar'
import { UserProvider } from './UserContext';
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Student from './StudentDetails'
import LoginPage from './LoginPage'

const App = () => {
  return (
    <div>
      <UserProvider>
       <BrowserRouter> 
          <div>
              <Routes>
              <Route exact path="/" element={<SideBar />} />
                <Route exact path="/student" element={<Student />} />
                <Route exact path="/login" element={<LoginPage />} />
              </Routes>
          </div>
      </BrowserRouter>
    </UserProvider>

    </div>
  )
}

export default App