import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext.jsx'
import image from '../assets/User-Image.jpeg'
import p1 from '../assets/Virtual_Assistant_project_image.png'
import p2 from '../assets/Paste_App_project_image.png'
import instagram from '../assets/instagram.svg'
import linkedin from '../assets/linkedin.svg'
import github from '../assets/github.svg'
import hamburger from '../assets/hamburger.svg'
import { Codesandbox } from '../icons/Codesandbox.jsx'
import '../styles/highlighter.css'
import ProjectCard from '../components/ProjectCard.jsx'
import MessageForm from '../components/MessageForm.jsx'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  const [projects, setProjects] = useState([])
  const [showContactForm, setShowContactForm] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const {serverUrl} = useContext(dataContext)
  const [profile, setProfile] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const {data} = await axios.get(`${serverUrl}/api/projects`)
        setProjects(data.Projects)
        console.log(data.Projects)
      } catch (error) {
        alert(error)
      }
    }
    
    const fetchPhoto = async () => {
      try {
        const {data} = await axios.get(`${serverUrl}/api/getprofileimage`)
        setProfile(data.Profile)
        console.log(data.Profile)
      } catch (error) {
        alert(error)
      }
    }
    
    fetchPhoto()
    fetchProjects()
  },[])

  if(!projects && !profile){
    return <p className='text-gray-400'>Loading Details...</p>
  }

  return (
    <div className='w-full min-h-screen text-gray-100 flex flex-col bg-linear-to-tr from-[#29323c] to-[#485563]'>
      <section id='Home' className='w-full flex h-16 px-6 justify-between items-center border-b border-gray-600 bg-[#1f2933] sticky top-0 z-50'>
        <div className='flex items-center gap-2'>
          <Codesandbox/>
          <span className='font-bold hover:text-[#00df9a]'>Codee</span>
        </div>
        {/* Desktop */}
        <div>
          <nav className='hidden md:flex gap-10'>
            <a href="#Home" className='hover:text-[#00df9a] px-3 py-1 rounded-full hover:bg-gray-800 transition-transform duration-300 hover:scale-105'>Home</a>
            <a href="#About" className='hover:text-[#00df9a] px-3 py-1 rounded-full hover:bg-gray-800 transition-transform duration-300 hover:scale-105'>About</a>
            <a href="#Projects" className='hover:text-[#00df9a] px-3 py-1 rounded-full hover:bg-gray-800 transition-transform duration-300 hover:scale-105'>Projects</a>
            <a href="#Contact" className='hover:text-[#00df9a] px-3 py-1 rounded-full hover:bg-gray-800 transition-transform duration-300 hover:scale-105'>Contact</a>
          </nav>
        </div>

        <button className='md:hidden' onClick={() => setMenuOpen(!menuOpen)}>
          <img src={hamburger} alt="Menu" className='w-6 h-6 hover:brightness-0 hover:invert transition' />
        </button>
      </section>

      {/* Mobile */}
        {menuOpen && (
          <div className='md:hidden bg-[#1f2933] border-b border-gray-600'>
            <nav className='flex flex-col items-center gap-4 py-6'>
              <a href="#Home" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#About" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#Projects" onClick={() => setMenuOpen(false)}>Projects</a>
              <a href="#Contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </nav>
        </div>
        )}

      <section className='w-full flex flex-col md:flex-row justify-center items-center gap-12 py-20 border-b border-gray-600'>
        <img
          src={profile[0]?.profileImage}
          alt="Profile"
          className="w-40 h-40 md:w-48 mid:h-48 p-2 border border-teal-400 rounded-md object-cover"
          loading='lazy'
        />
        <div className='font-bold text-3xl text-center md:text-left flex flex-col justify-center items-center gap-2'>
          Hi, I’m Anil
          <div className='text-[20px]'>Full-Stack Developer</div>
          <div className='text-[16px] text-gray-300 max-w-md'>Turning ideas into clean, functional web experiences.</div>
          <div className="role-switch w-70 flex justify-between mt-4">
            <span className="highlight"></span>
            <span className="role coder">Coder</span>
            <span className="role developer">Developer</span>
          </div>
        </div>
      </section>

      <section id="About" className="w-full py-24 border-b border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-12">

          <div>
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-gray-300">
              I’m a B.Tech student in Computer Science and Biosciences at IIIT-Delhi
              (IIITD’28), with a strong interest in software development and AI.
              I enjoy building full-stack applications and improving backend systems.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <p>B.Tech in Computer Science and Biosciences</p>
            <p className="text-gray-400">IIIT-Delhi · Expected 2028</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["Python", "C++", "Java", "React", "Node.js", "MongoDB", "DSA"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-gray-800 hover:bg-[#00df9a] hover:text-black transition">
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

        </div>
      </section>

      <section id="Projects" className='w-full py-20 border-b border-gray-600'>
        <h1 className='text-center font-bold text-xl mb-12'>Projects</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center'>
          {
            
            projects.map((p) => (
              <div key={p._id}>
                <ProjectCard
                  title={p.title}
                  desc={p.description}
                  tech={p.techStack}
                  github={p.githubLink}
                  live={p.liveDemoLink}
                  img={p.imageUrl}
                />
              </div>  
            ))
          }
          
        </div>
      </section>

      <section id="Contact" className='w-full py-20'>
        <div className='text-center space-y-2'>
          <p>Feel free to reach out if you’d like to collaborate or just say hello.</p>
          
          {showContactForm && (
            <div className="mb-10 mt-10">
              <MessageForm onClose={() => setShowContactForm(false)} />
            </div>
          )}

          {!showContactForm && <button onClick={() => setShowContactForm(true)} className='text-[#00df9a] text-[14px] hover:underline'>
            anil24076@iiitd.ac.in
          </button>}
        </div>

        <div className='text-center gap-2 mt-6'>
          <h2 className='text-[12px] my-2'>Find me on</h2>
          <div className='flex justify-center items-center gap-2'>
            <a href="https://github.com/Anilcodee">
              <img src={github} alt="GitHub" className='w-10 h-10 hover:brightness-0 hover:invert transition' loading='lazy'/>
            </a>
            <a href="https://www.linkedin.com/in/anil-b16b86342/">
              <img src={linkedin} alt="LinkedIn" className='w-10 h-10 hover:brightness-0 hover:invert transition' loading='lazy'/>
            </a>
            <a href="https://www.instagram.com/anilk_mar886041/">
              <img src={instagram} alt="Instagram" className='w-8 h-8 hover:brightness-0 hover:invert transition' loading='lazy'/>
            </a>
          </div>
        </div>

        <footer className='text-center py-6 text-gray-400 text-[12px]'>
          © 2025 Anil · Built with React & Tailwind CSS
        </footer>
      </section>
    </div>
  )
}

export default Home
