import React, { useContext, useState } from 'react'
import { Codesandbox } from '../icons/Codesandbox.jsx'
import { useNavigate } from 'react-router-dom'
import { dataContext } from '../context/UserContext.jsx'
import axios from "axios"
import toast from 'react-hot-toast'
const AdminLogin = () => {
  const {userData, setUserData, serverUrl, getUserData} = useContext(dataContext)
  const navigate = useNavigate()
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        const {data} = await axios.post(serverUrl + "/api/admin/login",
            {
                email: adminEmail,
                password: adminPassword
            },
            {withCredentials:true}
        )
        setUserData(data.admin)
        setLoading(false)
        await getUserData()
        navigate('/admin/dashboard')
        toast.success("Logged in successfully!")
    } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error(error.response?.data?.message || "Internal Server Error");
    }
  }
  return (
    <div className='w-full min-h-screen text-gray-100 flex justify-center items-center bg-linear-to-tr from-[#29323c] to-[#485563]'>
        <div className='w-100 h-112.5 bg-[#1f2933] p-6 rounded-xl border border-gray-700'>

            <div className='text-center'>
                <Codesandbox width={35} height={35}/>
                <span className='text-2xl font-bold hover:text-[#00df9a]'>Codee</span>
            </div>

            <h1 className='text-center text-[16px] mt-4 text-[#00df9a] font-semibold'>Welcome Back!
            </h1>

            <div className='mt-2 rounded border text-[#00df9a]'></div>

            <form onSubmit={handleLogin} className='flex flex-col gap-4 mt-4'>
                <div className='flex flex-col gap-2'>
                    <span className='text-[14px]'>Email :</span>
                    <input type="text" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className='h-8 text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition' placeholder='enter your email'/>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-[14px]'>Password :</span>
                    <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className='h-8 text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition' placeholder='enter your password'/>
                </div>

                <button className='mx-auto w-20 h-10 mt-4 rounded border border-gray-500 bg-[#00df9a] font-bold transition-transform duration-300 hover:scale-105'>
                    {loading ? "Loading...":"Login"}
                </button>
            </form>

            <div  className='text-center mt-4 text-[14px] text-gray-500 cursor-pointer'>
                <p onClick={() => navigate('/admin/signup')}>Don't have an account? <span className='text-[#00df9a]'> Sign Up Now</span></p>
            </div>
            
        </div>
    </div>
  )
}

export default AdminLogin