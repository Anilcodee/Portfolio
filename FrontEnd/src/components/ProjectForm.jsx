import React, { useContext, useEffect, useRef, useState } from 'react'
import add from '../assets/add.svg'
import axios from 'axios'
import { dataContext } from '../context/userContext.jsx'
import { useNavigate } from 'react-router-dom'

const ProjectForm = ({project, onClose, onUpdate}) => {
  const [addProject, setAddProject] = useState(null)
  const {serverUrl} = useContext(dataContext)
  const fileRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [githubLink, setGithubLink] = useState("")
  const [demoLink, setDemoLink] = useState("")
  useEffect(() => {
    if (project) {
        setTitle(project.title);
        setDesc(project.description);
        setGithubLink(project.githubLink);
        setDemoLink(project.liveDemoLink);
        setTeckStack(project.techStack || []);
        setPreview(project.imageUrl || null);
    }
  }, [project]);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setGithubLink("");
    setDemoLink("");
    setTeckStack([]);
    setSelectedFile(null);
    setPreview(null);
  };
  const techOptions = [
    "React",
    "Redux",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "AWS"
  ];

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [techStack, setTeckStack] = useState([])

  const toggleTech = (tech) => {
    setTeckStack(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech])
  }

  const handleProjectForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        let formdata = new FormData()
        formdata.append("title", title)
        formdata.append("description", desc)
        formdata.append("techStack", JSON.stringify(techStack))
        formdata.append("githubLink", githubLink)
        formdata.append("liveDemoLink", demoLink)
        if(selectedFile){
            formdata.append("imageUrl", selectedFile)
        }
        if(project){
            const {data} = await axios.put(`${serverUrl}/api/admin/project/${project._id}`, formdata, {
                withCredentials:true
            })
            onUpdate(data.Project);
            resetForm()
            console.log(data)
            alert("Project updated successfully!")
        }else{
            const {data} = await axios.post(`${serverUrl}/api/admin/projects`, formdata, {
                withCredentials:true
            })
            setAddProject(data)
            resetForm()
            console.log(data)
            alert("Project added successfully!")
        }
        
        setLoading(false)
    } catch (error) {
        console.log(error.message)
        alert(error)
    }
  }

  return (
    <div className='max-w-3xl'>
        
        <div className='relative flex flex-col justify-center items-center bg-[#1f2933] w-full p-6 rounded-xl border mt-2 border-gray-700 mx-auto'>

            <h1 className='text-xl font-semibold'>Project Form</h1>

            <form className='space-y-4' onSubmit={handleProjectForm}>
                <div className='flex flex-col gap-2 text-[14px]'>
                    <span className='text-start'>Title : </span>
                    <input placeholder="enter your project title" value={title} onChange={(e) => setTitle(e.target.value)} className='text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition'
                    />
                </div>

                <div className='flex flex-col gap-2 text-[14px]'>
                    <span className='text-start'>Description : </span>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="write your project description here" className='text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition'
                    />
                </div>

                <div className='border border-gray-500 rounded-md p-3'>
                    <p className='text-[14px] mb-2'>Tech Stack</p>

                    <div className='flex flex-wrap gap-2'>
                        {techOptions.map((tech) => (
                            <label
                                key={tech}
                                className='flex items-center gap-2 text-[12px] cursor-pointer'
                            >
                                <input type="checkbox" checked={techStack.includes(tech)} onChange={() => toggleTech(tech)}
                                    className='accent-[#00df9a]'
                                />
                                {tech}
                            </label>
                        ))}

                    </div>
                </div>

                <div className='flex flex-col gap-2 text-[14px]'>
                    <span className='text-start'>Github Link : </span>
                    <input placeholder="paste here your github project link" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} className='text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition'
                    />
                </div>

                <div className='flex flex-col gap-2 text-[14px]'>
                    <span className='text-start'>Live Demo Link : </span>
                    <input placeholder="paste here your live demo project link" value={demoLink} onChange={(e) => setDemoLink(e.target.value)} className='text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition'
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
                    {!project && 
                        <button disabled={loading}  className="cursor-pointer font-bold flex border bg-[#00df9a] text-[14px] border-gray-700 rounded p-2 justify-center items-center gap-2 transition-transform duration-300 hover:scale-105">
                            {loading? "Project Adding..":"Add Project"}
                        </button>}
                    {project &&
                        <button disabled={loading}  className="cursor-pointer font-bold flex border bg-[#00df9a] text-[14px] border-gray-700 rounded p-2 justify-center items-center gap-2 transition-transform duration-300 hover:scale-105">
                            {loading? "Project Updating..":"Update Project"}
                        </button>
                    }
                </div>

                {!project && addProject && <button onClick={() => {
                    navigate("/admin/projects")
                    setAddProject(null)
                }} className='cursor-pointer text-[12px] mx-auto text-blue-500 underline flex justify-center items-center'>
                    Back
                </button>
                }

                {
                    <button onClick={onClose} className='cursor-pointer text-[12px] mx-auto text-blue-500 underline flex justify-center items-center'>
                        Back
                    </button>
                }

            </form>

        </div>
    </div>
  )
}

export default ProjectForm