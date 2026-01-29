import React, { useContext, useEffect, useRef, useState } from 'react'
import add from '../assets/add.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import { dataContext } from '../context/UserContext';

const BlogForm = ({blog, onClose, onUpdate}) => {
  const navigate = useNavigate()
  const {serverUrl} = useContext(dataContext)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState([])
  const [AuthorName, setAuthorName] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const fileRef = useRef()
  const [isPublished, setIsPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [addBlog, setAddBlog] = useState(null)
  const toggleTags = (tag) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  useEffect(() => {
    if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
        setAuthorName(blog.author);
        setIsPublished(blog.isPublished || false);
        setTags(blog.tags || []);
        setPreview(blog.coverImage || null);
      }
  }, [blog]);

  const resetForm = () => {
      setTitle("");
      setContent("");
      setAuthorName("");
      setTags([]);
      setSelectedFile(null);
      setPreview(null);
  };

  const BlogOptions = [
    "React",
    "Redux",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "AWS",
    "javaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "Career",
    "DevOps"
  ];

  const handleProjectForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        let formdata = new FormData()
        formdata.append("title", title)
        formdata.append("content", content)
        formdata.append("tags", JSON.stringify(tags))
        formdata.append("author", AuthorName)
        formdata.append("isPublished", isPublished)
        if(selectedFile){
            formdata.append("coverImage", selectedFile)
        }
        if(blog){
            const {data} = await axios.put(`${serverUrl}/api/admin/blog/${blog._id}`, formdata, {
                withCredentials:true
            })
            onUpdate(data.blog);
            resetForm()
            console.log(data)
            toast.success("Blog updated successfully!")
        }else{
            const {data} = await axios.post(`${serverUrl}/api/admin/blog`, formdata, {
                withCredentials:true
            })
            setAddBlog(data)
            resetForm()
            console.log(data)
            toast.success("Blog added successfully!")
        }
        
        setLoading(false)
    } catch (error) {
        console.log(error.message)
        toast.error(error.response?.data?.message || "Internal Server Error");
    }
  }


  return (
    <div className='max-w-3xl'>
        <div className='relative flex flex-col justify-center items-center bg-[#1f2933] w-full p-6 rounded-xl border mt-2 border-gray-700 mx-auto'>
            <h1 className='text-xl font-semibold'>Blog Form</h1>

            <form className='space-y-4' onSubmit={handleProjectForm}>
                <div className='flex flex-col gap-2 text-[14px]'>
                    <span className='text-start'>Title : </span>
                    <input placeholder="enter your project title" value={title} onChange={(e) => setTitle(e.target.value)} className='text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition'
                    />
                </div>
                <div className='flex flex-col gap-2 text-[14px]'>
                    <span className='text-start'>Content : </span>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="write your project description here" className='text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition'
                    />
                </div>
                <div className='flex flex-col gap-2 text-[14px]'>
                    <span className='text-start'>Author : </span>
                    <textarea value={AuthorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="write your project description here" className='text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition'
                    />
                </div>
                <div className='border border-gray-500 rounded-md p-3'>
                    <p className='text-[14px] mb-2'>Tags</p>

                    <div className='flex flex-wrap gap-2'>
                        {BlogOptions.map((option) => (
                            <label
                                key={option}
                                className='flex items-center gap-2 text-[12px] cursor-pointer'
                            >
                                <input type="checkbox" checked={tags.includes(option)} onChange={() => toggleTags(option)}
                                    className='accent-[#00df9a]'
                                />
                                {option}
                            </label>
                        ))}

                    </div>
                </div>
                <div className='flex gap-2 text-[14px]'>
                    <span className='text-start'>Do you want to publish? (if not leave it unchecked)  : </span>
                    <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className='accent-[#00df9a]'
                    />
                </div>
                <div className='flex flex-col gap-2 text-[14px]'>
                    <input type="file" onChange={(e) => {
                        const file = e.target.files[0]
                        setSelectedFile(file)
                        setPreview(URL.createObjectURL(file))
                    }} hidden ref={fileRef}/>
                
                    <button type='button' onClick={() => {fileRef.current.click()}} className="cursor-pointer fond-semibold flex border bg-red-500 text-[14px] border-gray-700 rounded p-2 justify-center items-center gap-2 transition-transform duration-300 hover:scale-105">
                        <img src={add} alt="add-icon" className='h-6 w-6 brightness-0 invert transition' loading='lazy'/>
                            Add Photo
                    </button>
                </div>
                {
                    preview && (
                        <div className='relative w-32 h-32 group'>
                            <button type='button' onClick={() => setPreview(null)} className="absolute top-1 right-1 z-10 hidden group-hover:flex items-center justify-center w-6 h-6 rounded-full bg-black/60 text-white text-[14px] hover:bg-red-500 transition">
                                ✕
                            </button>
                            <img
                                src={preview}
                                alt='preview'
                                className='w-full h-full object-cover rounded border border-gray-700 hover:border-[#00df9a] transition'
                            />
                        </div>
                    )
                }
                <div className='flex flex-col gap-2 text-[14px]'>
                    {!blog && 
                        <button disabled={loading}  className="cursor-pointer font-bold flex border bg-[#00df9a] text-[14px] border-gray-700 rounded p-2 justify-center items-center gap-2 transition-transform duration-300 hover:scale-105">
                            {loading? "Blog Adding..":"Add Blog"}
                        </button>}
                    {blog &&
                        <button disabled={loading}  className="cursor-pointer font-bold flex border bg-[#00df9a] text-[14px] border-gray-700 rounded p-2 justify-center items-center gap-2 transition-transform duration-300 hover:scale-105">
                            {loading? "Blog Updating..":"Update Blog"}
                        </button>
                    }
                </div>

                {!blog && addBlog && <button onClick={() => {
                    navigate("/admin/blogsDashboard")
                    setAddBlog(null)
                }} className='cursor-pointer text-[12px] mx-auto text-blue-500 underline flex justify-center items-center'>
                    Back
                </button>
                }

                {
                    blog && <button onClick={onClose} className='cursor-pointer text-[12px] mx-auto text-blue-500 underline flex justify-center items-center'>
                        Back
                    </button>
                }
            </form>
        </div>
    </div>
  )
}

export default BlogForm