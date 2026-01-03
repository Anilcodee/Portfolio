import React, { useContext, useEffect, useRef, useState } from 'react'
import StatCard from '../components/StatCard.jsx'
import { dataContext } from '../context/UserContext.jsx'
import axios from 'axios'
import add from '../assets/add.svg'
import toast from 'react-hot-toast'


const AdminDashboard = () => {
  const {serverUrl} = useContext(dataContext)
  const [stats, setStats] = useState(null)
  const fileRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleImageUpdate = async () => {
    setLoading(true)
    try {
      let formdata = new FormData()
      if(selectedFile){
        formdata.append("imageUrl", selectedFile)
      }
      const {data} = await axios.post(`${serverUrl}/api/admin/profileimagechange`, formdata, {withCredentials:true})
      setLoading(false)
      console.log(data)
      setSelectedFile(null)
      toast.success("Image changed Successfully")
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  }
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const {data} = await axios.get(`${serverUrl}/api/admin/stats`,
          {withCredentials: true}
        )
        setStats(data)
      } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || "Internal Server Error");
      }
    }
    fetchStats()
  }, [])

  if(!stats){
    return <p className='text-gray-400'>Loading Stats...</p>
  }

  return (
    <div>
      <div className='flex justify-between mb-6 text-xl font-semibold'>
        <h1 className='p-2'>Overview</h1>
        <input type="file" onChange={(e) => {
          const file = e.target.files[0]
          setSelectedFile(file)
        }} hidden ref={fileRef}/>
        <div className='flex justify-center items-center gap-2'>
          <img onClick={() => {fileRef.current.click()}} src={add} alt="add-icon" className='cursor-pointer h-10 w-10 transition-transform duration-300 hover:brightness-0 hover:invert' loading='lazy'/>
          <button disabled={loading} onClick={handleImageUpdate} className='cursor-pointer flex border bg-red-500 text-[14px] border-gray-700 rounded p-2 justify-center items-center gap-2 transition-transform duration-300 hover:scale-105'>
            {!selectedFile ? "Select Photo":"Upload Photo"}
        </button>
        </div>
        
      </div>
      
      <div className='flex gap-6 flex-wrap'>
        <StatCard label="Total Visits" value={stats.visits}/>
        <StatCard label="Messages" value={stats.messages}/>
        <StatCard label="Projects" value={stats.projects}/>
      </div>
    </div>
  )
}

export default AdminDashboard