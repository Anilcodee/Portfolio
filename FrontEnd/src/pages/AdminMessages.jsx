import React, { useContext, useEffect, useState } from 'react'
import { dataContext } from '../context/userContext.jsx'
import axios from 'axios'

const AdminMessages = () => {
  const {serverUrl} = useContext(dataContext)
  const [contacts, setContacts] = useState(null)

  useEffect(() =>{
    const fetchContact = async () => {
        try {
            const {data} = await axios.get(`${serverUrl}/api/admin/getcontacts`,{
                withCredentials:true
            })
            setContacts(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchContact()
  },[])

  if(!contacts){
    return <p className='text-gray-400'>Loading Messages...</p>
  }

  return (
    <div>
        <h1 className='text-xl font-semibold mb-6'>Messages</h1>

        <div className='bg-[#1f2933] border border-gray-700 rounded-xl overflow-hidden'>
            <table className='w-full text-[14px]'>
                <thead className='bg-gray-800 text-gray-300 border-b border-gray-700'>
                    <tr>
                        <th className='p-3 text-center'>Email</th>
                        <th className='p-3 text-center'>Subject</th>
                        <th className='p-3 text-center'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.contacts.map(
                        (message) => (
                            <tr key={message._id}>
                                <td className='p-3 hover:bg-gray-800 transition text-center'>{message.email}</td>
                                <td className='p-3 hover:bg-gray-800 transition text-center'>{message.subject}</td>
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
  )
}

export default AdminMessages