import { useContext, useEffect, useState } from 'react';
import add from '../assets/add.svg'
import axios from 'axios';
import ProjectForm from '../components/ProjectForm.jsx';
import { NavLink } from 'react-router-dom';
import { dataContext } from '../context/UserContext.jsx';
const AdminProjects = () => {
  const {serverUrl} = useContext(dataContext)
  const [openProject, setOpenProject] = useState(false)
  const [projectData, setProjectData] = useState([])
  const [editingProject, setEditingProject] = useState(null)
  const handleProjectDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this project?")){
      return
    }
    try {
      const {data} = await axios.delete(`${serverUrl}/api/admin/projects/${id}`,
        {withCredentials:true}
      )
      console.log(data)
      setProjectData(prev => prev.filter(project => project._id !== id))
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const {data} = await axios.get(`${serverUrl}/api/admin/projects`,{
          withCredentials:true
        })
        setProjectData(data.Projects)
        console.log(data)
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    fetchProjects()
  }, [])

  if(!projectData){
    return <p className='text-gray-400'>Loading Projects...</p>
  }
  
  return (
    <div>
      <div className="flex justify-between mb-6 text-xl font-semibold">
        <h1 className="p-2">Projects</h1>
        {openProject && <ProjectForm onClose={() => setOpenProject(false)}/>}
        <nav>
          <NavLink to="/admin/projectformfill">
            { !openProject && 
            <button onClick={() => setOpenProject(true)} className="cursor-pointer flex border bg-red-500 text-[14px] border-gray-700 rounded p-2 justify-center items-center gap-2 transition-transform duration-300 hover:scale-105">
              <img src={add} alt="add-icon" className='h-6 w-6 brightness-0 invert transition' loading='lazy'/>
              Add Project
            </button> 
          }
          </NavLink>
        </nav>
        
      </div>

      { !editingProject &&
        projectData.map((project) => (
          <div key={project._id} className="bg-[#1f2933] border border-gray-700 rounded-xl p-4 flex justify-between items-center mt-4">
            <div>
              <h3 className="font-semibold">{project.title}</h3>
              <div className='flex flex-wrap gap-2 mt-1'>
                {
                  project.techStack.map((tech) => (
                    <span key={tech} className='text-gray-400 text-[12px] border border-gray-600 bg-gray-700 px-2 py-0.5 rounded'>
                      {tech}
                    </span>
                  ))
                }
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setEditingProject(project)} className="cursor-pointer text-sm px-3 py-1 border border-gray-600 rounded hover:border-[#00df9a]">
                Edit
              </button>
              <button onClick={() => handleProjectDelete(project._id)} className="cursor-pointer text-sm px-3 py-1 border border-red-500 text-red-400 rounded">
                Delete
              </button>
            </div>
          </div>
        ))
      }

      {editingProject && (
        <ProjectForm
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onUpdate={(updatedProject) => {
            setProjectData(prev => prev.map(p => p._id === updatedProject._id ? updatedProject : p))
            setEditingProject(null)
          }}
        />
      )}
    </div>
  );
};

export default AdminProjects;
