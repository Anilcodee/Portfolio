import React, { useContext, useEffect, useState } from 'react'
import { Codesandbox } from '../icons/Codesandbox.jsx'
import hamburger from '../assets/hamburger.svg'
import BlogCard from '../components/BlogCard.jsx'
import toast from 'react-hot-toast'
import { dataContext } from '../context/UserContext.jsx'
import axios from 'axios'
import UseDebounce from '../hooks/UseDebounce.jsx'


const ViewBlogs = () => {
  const {serverUrl} = useContext(dataContext)
  const [blogs, setBlogs] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const debouncedSearch = UseDebounce(search)
  const [selectedTag, setSelectedTag] = useState("")
  const [sort, setSort] = useState("latest")
  const [placeholder, setPlaceholder] = useState(
    window.innerWidth < 640 ? "Search blogs..." : "Search blogs by title, tags, or content..."
  )

  useEffect(() => {
    const handleResizer = () => {
      setPlaceholder(window.innerWidth < 640
        ? "Search blogs..." : "Search blogs by title, tags, or content..."
      )
    }
    window.addEventListener("resize", handleResizer)
    return () => window.removeEventListener("resize", handleResizer)
  },[])

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const {data} = await axios.get(`${serverUrl}/api/blogs`,{params: {search: debouncedSearch,
          sort,
          tag: selectedTag
        }})
        setBlogs(data.blogs)
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Internal Server Error");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs()
  },[debouncedSearch, sort, selectedTag])
  return (
    <div className='w-full min-h-screen text-gray-100 flex flex-col bg-linear-to-tr from-[#29323c] to-[#485563]'>
      <section className='w-full flex h-16 px-6 justify-between items-center border-b border-gray-600 bg-[#1f2933] sticky top-0 z-50'>
        <div className='flex items-center gap-2'>
          <Codesandbox/>
          <span className='font-bold hover:text-[#00df9a]'>
            <a href="/">Codee</a>
          </span>
        </div>
        <div>
          <nav className='flex gap-10'>
            <a href="/" className='hover:text-[#00df9a] px-3 py-1 rounded-full hover:bg-gray-800 transition-transform duration-300 hover:scale-105'>Home</a>
          </nav>
        </div>
      </section>

      <section className='w-full py-24 px-6'>
        <div className='max-w-5xl mx-auto text-center space-y-12'>
            <div>
                <h1 className='text-2xl font-bold mb-4'>Blogs & Insights</h1>
                <p className='text-gray-400'>
                    Thoughts, tutorials, and experiences on web development, backend systems, and building real-world applications.
                </p>
            </div>
            <div className='flex flex-col gap-4 md:flex-row justify-between items-center'>
                <form action="" className='border w-3/4 p-2 flex justify-between rounded-full border-white/10 bg-[#1f2933]'>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}placeholder={placeholder} className='w-full outline-none bg-transparent pl-4 text-[14px]'/>
                    <button type="submit" className='border py-1 border-white/2 bg-[#485563] px-4 rounded-full hover:bg-gray-800 transition-transform duration-300 hover:scale-105 cursor-pointer'>Search</button>
                </form>
                <select className='bg-[#1f2933] border border-gray-700 px-3 py-2 rounded text-[14px]' value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="views">Most Viewed</option>
                </select>
            </div>
            <div className='flex flex-wrap gap-3 justify-center'>
                {["All", "React", "Backend", "MongoDB", "Node.js", "CSS", "JavaScript", "Career"].map(tag => (
                    <button key={tag} onClick={() => setSelectedTag(tag === "All" ? "" : tag)} className={`px-4 py-1 rounded-full text-[14px] border transition ${
                        selectedTag === tag ? "bg-[#00df9a] text-black border-[#00df9a]" : "border-gray-600 text-gray-300  hover:border-[#00df9a]"
                    }`}>
                        {tag}
                    </button>
                ))}
            </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex justify-center items-center min-h-50">
            <p className="text-gray-400 text-sm animate-pulse">
              Searching blogs...
            </p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex justify-center items-center min-h-50">
            <p className="text-gray-400 text-sm">
              No blogs found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                title={blog.title}
                content={blog.content}
                date={new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  year: '2-digit'
                })}
                tags={blog.tags}
                coverImage={blog.coverImage}
                author={blog.author}
                views={blog.views}
                slug={blog.slug}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}

export default ViewBlogs