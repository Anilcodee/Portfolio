import React from 'react'
import StatCard from '../components/StatCard'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { dataContext } from '../context/userContext'

const AdminAnalytics = () => {
  const {serverUrl} = useContext(dataContext)
  const [visitData, setVisitData] = useState(null)

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const {data} = await axios.get(`${serverUrl}/api/admin/analytics`,{
          withCredentials:true
        })
        setVisitData(data)
      } catch (error) {
        alert(error)
      }
    }
    fetchVisits()
  },[])

  if(!visitData){
    return <p className='text-gray-400'>Loading Stats...</p>
  }
  return (
    <div>
      <h1 className='text-xl font-semibold mb-6'>Portfolio Visiter</h1>
      <div className='flex gap-6 flex-wrap'>
        <StatCard label="Total Visits" value={visitData.totalVisits}/>

        <div className='bg-[#1f2933] border border-gray-700 rounded-xl overflow-hidden'>
            
            <table className='w-full text-[14px]'>
                <thead className='bg-gray-800 text-gray-300 border-b border-gray-700'>
                    <tr>
                        <th className='p-3 text-center'>IP</th>
                        <th className='p-3 text-center'>UserAgent</th>
                        <th className='p-3 text-center'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {visitData.recentVisits.map(
                        (message) => (
                            <tr key={message._id}>
                                <td className='p-3 hover:bg-gray-800 transition text-center'>{message.ip}</td>
                                <td className='p-3 hover:bg-gray-800 transition text-center'>{message.userAgent}</td>
                                <td className='p-3 hover:bg-gray-800 transition text-center'>{new Date(message.createdAt).toLocaleDateString('en-US',{
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics