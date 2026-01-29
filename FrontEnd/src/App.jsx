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
import {Toaster} from "react-hot-toast"
import ViewBlogs from './pages/ViewBlogs.jsx'
import BlogForm from './components/BlogForm.jsx'
import AdminBlogs from './pages/AdminBlogs.jsx'
import BlogDetails from './pages/BlogDetails.jsx'
import AdminComments from './pages/AdminComments.jsx'

const App = () => {
  const {userData, setUserData} = useContext(dataContext)
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 2000, // stays 4 seconds
          style: {
            background: "#1f2933",
            color: "#ffffff",
            border: "1px solid #00df9a",
            padding: "10px 14px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#00df9a",
              secondary: "#0f172a",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#0f172a",
            },
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blogs' element={<ViewBlogs/>}/>
        <Route path='/blog/:slug' element={<BlogDetails/>}/>
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
          <Route path="Comments" element={<AdminComments/>}/>
          <Route path="blogs" element={<AdminBlogs/>}/>
          <Route path='projectformfill' element={<ProjectForm/>}/>
          <Route path='blogformfill' element={<BlogForm/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App