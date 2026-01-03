import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import hamburger from '../assets/hamburger.svg'
import toast from "react-hot-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    navigate("/admin/login")
    toast.success("Logout successfully!")
  }
  
  return (
    <div className="min-h-screen flex bg-[#29323c] text-gray-100">

      {/* Sidebar */}
      <aside className={`fixed md:static z-40 h-full md:h-auto w-56 bg-[#1f2933] border-r border-gray-700 p-4 transform transition-transform duration-300 ${open ? "translate-x-0":"-translate-x-full"} md:translate-x-0`}>
        <h1 className=" px-8 py-2 text-xl font-bold text-[#00df9a] mb-8">Admin</h1>

        <nav className="flex flex-col gap-3">
          <NavLink to="/admin/dashboard" onClick={() => setOpen(false)} className={({isActive}) => `px-7 py-2 rounded transition ${isActive? "bg-gray-800 text-[#00df9a] border-l-4 border-[#00df9a]":"text-gray-300 hover:text-[#00df9a]"}`}>Dashboard</NavLink>
          <NavLink to="/admin/messages" onClick={() => setOpen(false)} className={({isActive}) => `px-7 py-2 rounded transition ${isActive? "bg-gray-800 text-[#00df9a] border-l-4 border-[#00df9a]":"text-gray-300 hover:text-[#00df9a]"}`}>Messages</NavLink>
          <NavLink to="/admin/projects" onClick={() => setOpen(false)} className={({isActive}) => `px-7 py-2 rounded transition ${isActive? "bg-gray-800 text-[#00df9a] border-l-4 border-[#00df9a]":"text-gray-300 hover:text-[#00df9a]"}`}>Projects</NavLink>
          <NavLink to="/admin/analytics" onClick={() => setOpen(false)} className={({isActive}) => `px-7 py-2 rounded transition ${isActive? "bg-gray-800 text-[#00df9a] border-l-4 border-[#00df9a]":"text-gray-300 hover:text-[#00df9a]"}`}>Analytics</NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="font-semibold mt-10 text-sm border rounded-3xl px-8 py-2 bg-red-500 ml-4 transition-transform duration-300 hover:scale-105"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-[#1f2933] border-b border-gray-700 flex items-center px-6">
          <button className='md:hidden mr-4' onClick={() => setOpen(!open)}>
            <img src={hamburger} alt="Menu" className='w-6 h-6 hover:brightness-0 hover:invert transition' />
          </button>
          <h2 className="font-semibold">Admin Dashboard</h2>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
