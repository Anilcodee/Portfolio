import React, { useContext } from 'react'
import { dataContext } from './context/UserContext.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminSignUp from './pages/AdminSignUp.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminLayout from './pages/AdminLayout.jsx'
import AdminMessages from './pages/AdminMessages.jsx'
import AdminProjects from './pages/AdminProjects.jsx'
import AdminAnalytics from './pages/AdminAnalytics.jsx'
import ProjectForm from './components/ProjectForm.jsx'

const App = () => {
  const {userData, setUserData} = useContext(dataContext)
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/signup' element={<AdminSignUp/>}/>
      <Route 
        path='/admin'
        element={
          <ProtectedRoute>
            <AdminLayout/>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace/>}/>
        <Route path="dashboard" element={<AdminDashboard/>}/>
        <Route path="messages" element={<AdminMessages/>}/>
        <Route path="projects" element={<AdminProjects/>}/>
        <Route path="analytics" element={<AdminAnalytics/>}/>
        <Route path='projectformfill' element={<ProjectForm/>}/>
      </Route>
    </Routes>
  )
}

export default App