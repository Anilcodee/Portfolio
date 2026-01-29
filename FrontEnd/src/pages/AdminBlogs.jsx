import React, { useContext, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import add from '../assets/add.svg'
import BlogForm from '../components/BlogForm.jsx'
import { dataContext } from '../context/UserContext.jsx'
import toast from 'react-hot-toast'
import axios from 'axios'
const AdminBlogs = () => {
  const {serverUrl} = useContext(dataContext)
  const [openBlog, setOpenBlog] = useState(false)
  const [blogData, setBlogData] = useState([])
  const [editingBlog, setEditingBlog] = useState(null)
  const handleBlogDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this blog?")){
      return
    }
    try {
      await axios.delete(`${serverUrl}/api/admin/blog/${id}`,{
        withCredentials:true
      })
      setBlogData(prev => prev.filter(blog => blog._id !== id))
      toast.success("Blog deleted successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  }
  useEffect(() => {
    const fetchBlogs = async () => {
        try {
            const {data} = await axios.get(`${serverUrl}/api/admin/blogs`,{
                withCredentials:true
            })
            setBlogData(data.blogs)
            console.log(data)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    }
    fetchBlogs()
  }, [])
  if(!blogData){
    return <p className='text-gray-400'>Loading Blogs...</p>
  }
  return (
    <div>
        <div className='flex justify-between mb-6 text-xl font-semibold'>
            <h1 className='p-2'>Blogs Dashboard</h1>
            {openBlog && <BlogForm onClose={() => setOpenBlog(false)}/>}
            <nav>
                <NavLink to="/admin/blogformfill">
                    { !openBlog &&
                    <button onClick={() => setOpenBlog(true)} className='cursor-pointer flex border bg-red-500 text-[14px] border-gray-700 rounded p-2 justify-center items-center gap-2 transition-transform duration-300 hover:scale-105'>
                        <img src={add} alt="add-icon" className='h-6 w-6 brightness-0 invert transition' loading='lazy'/>
                        Add Blog
                    </button>
                    }
                </NavLink>
            </nav>
        </div>

        {!editingBlog && blogData.map((blog) => (
            <div key={blog._id} className='bg-[#1f2933] border border-gray-700 rounded-xl p-4 flex justify-between items-center mt-4'>
                <div>
                    <h3 className="font-semibold">{blog.title}</h3>
                    <div className='flex flex-wrap gap-2 mt-1'>
                        {
                        blog.tags.map((tag) => (
                            <span key={tag} className='text-gray-400 text-[12px] border border-gray-600 bg-gray-700 px-2 py-0.5 rounded'>
                            {tag}
                            </span>
                        ))
                        }
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className=' hidden bg-gray-500 sm:flex items-center justify-center border w-20 border-gray-600 px-3 py-1 rounded'>
                        {blog.isPublished ? (
                            <span className='text-gray-700 text-sm font-semibold'>Published</span>
                        ) : (
                            <span className='text-gray-700 text-sm font-semibold'>Draft</span>
                        )}
                    </div>
                    <button onClick={() => setEditingBlog(blog)} className="cursor-pointer text-sm px-3 py-1 border border-gray-600 rounded hover:border-[#00df9a]">
                        Edit
                    </button>
                    <button onClick={() => handleBlogDelete(blog._id)} className="cursor-pointer text-sm px-3 py-1 border border-red-500 text-red-400 rounded">
                        Delete
                    </button>
                </div>
            </div>
        ))}

        {editingBlog && (
            <BlogForm
            blog={editingBlog}
            onClose={() => setEditingBlog(null)}
            onUpdate={(updatedBlog) => {
                setBlogData(prev => prev.map(b => b._id === updatedBlog._id ? updatedBlog : b))
                setEditingBlog(null)
            }}
            />
        )}

    </div>
  )
}

export default AdminBlogs