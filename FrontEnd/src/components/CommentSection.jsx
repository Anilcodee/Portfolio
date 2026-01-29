import React, { useContext, useState, useEffect, useRef } from 'react'
import { dataContext } from '../context/UserContext.jsx'

import {CommentContext} from '../context/CommentAuthContext.jsx'

import { FaStar } from 'react-icons/fa'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { FaEllipsisV } from 'react-icons/fa'

const CommentSection = ({blogId, openLogin}) => {
  const {serverUrl} = useContext(dataContext)
  const {user} = useContext(CommentContext)
  const [activeMenuId, setActiveMenuId] = useState(null)
  const [comments, setComments] = useState([])
  const menuRef = useRef(null)
  const [text, setText] = useState("")
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [editRating, setEditRating] = useState(0)

  const handleDelete = async (id) => {
    try {
      const {data} = await axios.delete(`${serverUrl}/api/blogs/${blogId}/comment/${id}`,{withCredentials:true})
      toast.success("Deleted Successfully")
      setComments(prev => prev.filter(c => c._id !== id))
      setActiveMenuId(null)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to comment");
    }
  }

  const handleUpdate = async (id) => {
    try {
      const {data} = await axios.put(`${serverUrl}/api/blogs/${blogId}/comment/${id}`,
        {
          text: editText,
          rating: editRating
        },
        {withCredentials: true}
      )

      toast.success("Comment Updated Successfully")

      setComments(prev => prev.map(c => c._id === id ? { ...c, text: editText, rating: editRating} : c))
      setEditingId(null)
    } catch (error) {
      toast.error("Comment Update failed")
    }
  }

  const fetchComments = async () => {
      try {
        const {data} = await axios.get(`${serverUrl}/api/blogs/${blogId}/comments`)

        setComments(data.comments)
        
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    fetchComments()
  }, [blogId])

  useEffect(() => {
    const handler = (e) => {
      if(!menuRef.current?.contains(e.target)){
        setActiveMenuId(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const submitComment = async () => {
    if(!user){
      openLogin();
      return;
    }
    if(!text.trim()){
      return toast.error("Write something")
    }
    
    try {
      const {data} = await axios.post(`${serverUrl}/api/blogs/${blogId}/comment`, {
        text, rating
      }, {withCredentials: true})
      toast.success("Comment added")
      setText("")
      setRating(0)
      setHover(null)
      fetchComments()
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to comment");
    }
  }
  
  return (
    <div className="border-t border-gray-700 pt-10">
      <h3 className='text-xl font-semibold mb-6'>
        Comments ({comments.length})
      </h3>

      {!editingId &&
      <div className="bg-[#29323c] p-6 rounded-xl space-y-5 border border-gray-700">
        {
          user ? (
            <div className='flex gap-3 items-center'>
              <img src={user.avatar}
              className='w-10 h-10 rounded-full'
              alt="avatar" />
              <p className='text-[14px] font-medium'>{user.name}</p>
            </div>
          ) : (
            <p className='text-[14px] text-gray-400'>Login to comment</p>
          )
        }

        <div className='flex gap-2'>
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              size={20}
              className={`cursor-pointer transition ${(hover || rating) >= num ? "text-yellow-400": "text-gray-500"}`}
              onClick={() => setRating(num)}
              onMouseEnter={() => setHover(num)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </div>

        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='Write your thoughts...' className='w-full bg-[#1f2933] p-3 rounded-lg outline-none resize-none min-h-22.5'/>
        
        <div className='flex justify-end'>
          <button onClick={submitComment} className='cursor-pointer bg-[#00df9a] text-black px-5 py-2 rounded-full font-medium hover:opacity-90'>
            Post Comment
          </button>
        </div>
          
      </div>}

      <div className='mt-10 space-y-4'>
        {comments.map((c) => (
          <div key={c._id}
            className='bg-[#29323c] p-5 rounded-xl border border-gray-700'
          >
            {editingId === c._id ? (
              <div className='space-y-3'>
                  <div className='flex gap-3 items-center mb-3'>
                    <img src={c.user.avatar} alt={c.user.name} className='w-9 h-9 rounded-full'/>
                    <p className='font-medium text-[14px]'>
                      {c.user.name}
                    </p>
                    
                  </div>
                  <div className='flex gap-2'>
                      {[1, 2, 3, 4, 5].map(num => (
                        <FaStar
                        key={num}
                        size={20}
                        className={`cursor-pointer ${editRating >= num ? "text-yellow-400": "text-gray-600"}`}
                        onClick={() => setEditRating(num)}
                      />
                    ))}
                  </div>

                  <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className='w-full bg-[#1f2933] p-3 rounded-lg outline-none resize-none min-h-22.5'/>

                  <div className='flex gap-3 justify-end'>
                    <button onClick={() => setEditingId(null)} className='cursor-pointer px-4 py-1 text-[14px] border border-gray-600 rounded'>
                      Cancel
                    </button>
                    <button onClick={() => handleUpdate(c._id)} className='px-4 cursor-pointer py-1 text-[14px] bg-[#00fd9a] text-black rounded'>
                      Save
                    </button>
                  </div>
              </div>
            ):(
              <div>
                <div className='flex gap-3 items-center mb-3'>
                  <img src={c.user.avatar} alt={c.user.name} className='w-9 h-9 rounded-full'/>
                
                  <div>
                    <p className='font-medium text-[14px]'>{c.user.name}</p>
                    <div className='flex gap-1 text-yellow-400'>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={14}
                          className={
                            i < c.rating ? "text-yellow-400" : "text-gray-600"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div className='w-full flex justify-end relative'>
                    <button onClick={(e) => {
                      e.stopPropagation()
                      setActiveMenuId(prev => prev === c._id ? null : c._id)
                    }} className='cursor-pointer p-2 hover:bg-gray-700 rounded-full'>
                      <FaEllipsisV/>
                    </button>
                    { activeMenuId === c._id &&
                      <div ref={menuRef} className='absolute top-8 right-3 bg-[#1f2933] border border-gray-700 rounded-md shadow-lg flex flex-col w-25 z-20'>
                        <button onClick={() => {
                          setEditingId(c._id)
                          setEditText(c.text)
                          setEditRating(c.rating)
                          setActiveMenuId(null)
                        }}className='cursor-pointer px-4 py-2 text-left hover:rounded-md hover:bg-gray-800'>Edit</button>
                        <button onClick={() => handleDelete(c._id)}className='cursor-pointer px-4 py-2 text-left hover:rounded-md
                        hover:bg-gray-800 text-red-400'>Delete</button>
                      </div>
                    }
                  </div>
                </div>
                <p className='pl-2 text-[14px] text-gray-200'>
                  {c.text}
                </p>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection