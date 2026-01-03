import React, { useContext } from 'react'
import { useState } from 'react'
import axios from "axios"
import send from '../assets/send.svg'
import { dataContext } from '../context/UserContext.jsx';

const MessageForm = ({ onClose }) => {
  let {serverUrl} = useContext(dataContext)
  const [userEmail, setUserEmail] = useState("")
  const [userSubject, setUserSubject] = useState("")
  const [userMessage, setUserMessage] = useState("")
  const handleContactFormSubmission = async (e) => {
    e.preventDefault()
    try {
      let {data} = await axios.post(serverUrl + "/api/contact",{
        email: userEmail,
        subject: userSubject,
        message:userMessage
      })
      console.log(data)
      alert("Thanks for reaching out! Your message has been sent.")
      setUserEmail("")
      setUserMessage("")
      setUserSubject("")
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
  return (
    <div className="bg-[#1f2933] p-6 rounded-xl border border-gray-700 max-w-md mx-auto">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Contact Me</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleContactFormSubmission}>
        <div className='flex flex-col gap-2 text-[14px]'>
            <span className='text-start'>Email : </span>
            <input placeholder="Your Email" className='text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition'
              value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
            />
        </div>

        <div className='flex flex-col gap-2 text-[14px]'>
            <span className='text-start'>Subject : </span>
            <input placeholder="Enter your subject" className='text-[12px] outline-none pl-2 rounded border border-gray-500 hover:border-[#00df9a] transition'
              value={userSubject} onChange={(e) => setUserSubject(e.target.value)}
            />
        </div>

        <div className='flex flex-col gap-2 text-[14px] mb-5'>
            <h3 className='text-start'>Message :</h3>
            <textarea rows={6} className='text-[12px] pl-2 rounded border outline-none border-gray-500 hover:border-[#00df9a] transition' placeholder="Write your message here. I’ll get back to you soon."
              value={userMessage} onChange={(e) => setUserMessage(e.target.value)}
            />
        </div>
        <button className="group">
            <div className="border border-gray-500 rounded bg-[#00df9a] px-6 py-2 transition-transform duration-300 group-hover:scale-105">
                <img
                src={send}
                alt="send-icon"
                className="w-6 h-6 transition group-hover:brightness-0 group-hover:invert"
                />
            </div>
        </button>

      </form>

    </div>
  );
};


export default MessageForm