import React, { useContext, useEffect, useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaStar, FaTrash } from 'react-icons/fa'

const AdminComments = () => {
  const {serverUrl} = useContext(dataContext)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const fetchComments = async () => {
    try {
        const {data} = await axios.get(`${serverUrl}/api/admin/comments`, {withCredentials: true})
        setComments(data.comments)
        setLoading(false)
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load comments")
        setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this comment permanently")){
        return
    }
    try {
        const {data} = await axios.delete(`${serverUrl}/api/admin/comment/${id}`,{
            withCredentials: true
        })
        toast.success("Comment removed")
        setComments(prev => prev.filter(c => c._id !== id))
    } catch (error) {
        toast.error(error.response?.data?.message || "Comment Delete failed")
    }
  }
  if(loading){
    return <p className='text-gray-400'>Loading comments...</p>
  }
  return (
    <div>
        <div className='flex justify-between mb-6'>
            <h1 className='text-xl font-semibold'>Comment Manager</h1>
            <span className='text-[14px] text-gray-400 py-1'>
                Total: {comments.length}
            </span>
        </div>
        <div className='bg-[#1f2933] border border-gray-700 rounded-xl overflow-hidden'>
          <table className='w-full text-[14px]'>
            <thead className='bg-gray-800 border-b border-gray-700'>
              <tr>
                <th className='p-3 text-center'>User</th>
                <th className='p-3 text-center hidden sm:table-cell'>Blog</th>
                <th className='p-3 text-center hidden md:table-cell'>Rating</th>
                <th className='p-3 text-center'>Comment</th>
                <th className='p-3 text-center hidden md:table-cell'>Date</th>
                <th className='p-3 text-center'>Action</th>
              </tr>
            </thead>

            <tbody>
              {comments.map(c => (
                <tr key={c._id}>
                  <td className='p-3 hover:bg-gray-800 transition text-center'>
                    <div className='flex gap-2 items-center justify-center'>
                      <img src={c.user.avatar} className='w-8 h-8 rounded-full'/>
                      <span className='hidden md:block'>{c.user.name}</span>
                    </div>
                  </td>
                  <td className='p-3 hover:bg-gray-800 transition text-center hidden sm:table-cell'>
                    <a href={`/blog/${c.blog.slug}`} target='_blank' className='text-[#00fd9a] hover:underline cursor-pointer'
                    >
                      {c.blog.title}
                    </a>
                  </td>
                  <td className='p-3 hover:bg-gray-800 transition text-center hidden md:table-cell'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaStar className='text-yellow-400'/>
                    <span>{c.rating}</span>
                    </div>
                  </td>
                  <td className='p-3 max-w-md flex flex-wrap hover:bg-gray-800 transition items-center justify-center'>
                    {c.text}
                  </td>
                  <td className='p-3 hover:bg-gray-800 transition text-center hidden md:table-cell'>{new Date(c.createdAt).toLocaleDateString('en-US', options)}</td>
                  <td className='p-3 text-center hover:bg-gray-800 transition'>
                    <button onClick={() => handleDelete(c._id)}className='cursor-pointer text-red-400 hover:text-red-500'>
                      <FaTrash/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default AdminComments