import React, { useContext, useState } from 'react'
import { Codesandbox } from '../icons/Codesandbox.jsx'
import { useNavigate } from 'react-router-dom'
import { dataContext } from '../context/UserContext.jsx'
import axios from "axios"
const AdminSignUp = () => {
  const {userData, setUserData, serverUrl, getUserData} = useContext(dataContext)
  const navigate = useNavigate()
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
        const data = await axios.post(serverUrl + "/api/admin/signup", {
            email: adminEmail,
            password: adminPassword,
            adminKey: import.meta.env.VITE_ADMIN_KEY
        },{withCredentials:true})
        setUserData(data.admin)
        await getUserData()
        navigate("/admin/dashboard")
    } catch (error) {
        console.log(error)
        alert(error)
    }
  }
  return (
    <div className='w-full min-h-screen text-gray-100 flex justify-center items-center bg-linear-to-tr from-[#29323c] to-[#485563]'>
        <div className='w-100 h-112.5 bg-[#1f2933] p-6 rounded-xl border border-gray-700'>
            <div className='text-center'>
                <Codesandbox width={35} height={35}/>
                <span className='text-2xl font-bold hover:text-[#00df9a]'>Codee</span>
            </div>

            <h1 className='text-center text-[16px] mt-4 text-[#00df9a] font-semibold'>Create Account
            </h1>

            <div className='mt-2 rounded border text-[#00df9a]'></div>

            <form onSubmit={handleSignUp} className='flex flex-col gap-4 mt-4'>

                <div className='flex flex-col gap-2'>
                    <span className='text-[14px]'>Email :</span>
                    <input type="text" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className='h-8 text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition' placeholder='enter your email'/>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-[14px]'>Password :</span>
                    <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className='h-8 text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition' placeholder='enter your password'/>
                </div>

                <button className='mx-auto w-20 h-10 mt-4 rounded border border-gray-500 bg-[#00df9a] font-bold transition-transform duration-300 hover:scale-105'>
                    Sign Up
                </button>
            </form>

            <div className='text-center mt-4 text-[14px] text-gray-500'>
                <p onClick={() => navigate("/admin/login")} className='cursor-pointer'>Already have an account? <span className='text-[#00df9a] cursor-pointer'>Log In</span></p>
            </div>
            
        </div>
    </div>
  )
}

export default AdminSignUp