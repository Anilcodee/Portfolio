import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { dataContext } from '../context/UserContext.jsx'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'
import BlogSkeleton from '../components/BlogSkeleton.jsx'
import { useEffect } from 'react'
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { CommentContext } from '../context/CommentAuthContext.jsx'
import CommentSection from '../components/CommentSection.jsx'
import GooglePopupLogin from '../components/GooglePopupLogin.jsx'

const BlogDetails = () => {
  const {slug} = useParams()
  const [blogDetails, setBlogDetails] = React.useState(null)
  const {serverUrl} = useContext(dataContext)
  const {user} = useContext(CommentContext)
  const [loading, setLoading] = useState(true)
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  const [expanded, setExpanded] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const CONTENT_LIMIT = 50

  useEffect(() => {
    if (!blogDetails) return;

    document.title = `${blogDetails.title} | Anilcodee`;

    let meta = document.querySelector("meta[name='description']");

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = blogDetails.content.slice(0, 150);
  }, [blogDetails]);
  useEffect(() => {
    const fetchBlogDetails = async () => {
        try {
            const {data} = await axios.get(`${serverUrl}/api/blogs/${slug}`)
            setBlogDetails(data.blog)
        } catch (error) {
            toast.error(error.response?.data?.message || "Internal Server Error");
        }finally {
            setLoading(false)
        }
    }
    fetchBlogDetails()
  }, [slug])  
  if(loading){
    return <BlogSkeleton/>
  }
  if(!blogDetails){
    return null
  }

  const isLong = blogDetails.content.length > CONTENT_LIMIT

  return (
    <>

      {/* HERO */}
      <section className="relative h-[55vh] min-h-90 w-full">

        <img
          src={blogDetails.coverImage}
          alt={blogDetails.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

        <div className="relative z-10 max-w-full mx-auto px-8 h-full flex flex-col justify-end pb-12 text-white">

          <div className="flex flex-wrap gap-3 mb-4">
            {blogDetails.tags?.map(tag => (
              <span
                key={tag}
                className="bg-black/60 backdrop-blur px-3 py-1 rounded-full text-[12px] text-gray-600 border border-white/10 hover:bg-[#00df9a] hover:border-[#00df9a] transition"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {blogDetails.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
            <span>{blogDetails.author}</span>
            <span>•</span>
            <span>
              {new Date(blogDetails.createdAt).toLocaleDateString('en-US', options)}
            </span>
            <span>•</span>
            <span>{blogDetails.views} views</span>
          </div>

        </div>
      </section>

      {/* CONTENT */}
      <main className="dark:bg-[#29323c] text-gray-100">

        <article className="max-w-full mx-auto dark:bg-[#1f2933] p-8 space-y-8">

          {/* Author Card */}
          <div className="flex items-center gap-4 border-b border-gray-700 pb-6">

            <div className="w-12 h-12 rounded-full bg-[#00df9a] flex items-center justify-center text-black font-bold">
              {blogDetails?.author[0] || "A"}
            </div>

            <div>
              <p className="font-semibold text-gray-500 dark:text-white">{blogDetails.author}</p>
              <p className="text-xs text-gray-400">
                Published Author
              </p>
            </div>

          </div>

          {/* Blog Content */}
          <div className="prose prose-invert max-w-none leading-relaxed text-gray-400 dark:text-gray-200">
            {expanded || !isLong ? blogDetails.content : blogDetails.content.slice(0, CONTENT_LIMIT) + "..."}
            {
              isLong && !expanded && (
                <button onClick={() => {
                  if(!user){
                    setShowLogin(true)
                  }else{
                    setExpanded(true)
                  }
                }} className='mt-4 text-[#00df9a] font-medium cursor-pointer
                block'>
                  Show more
                </button>
              )
            }
          </div>

          {/* Share */}
          <div className="border-t border-gray-700 pt-6">

            <p className="text-sm text-gray-400 mb-3">
              Share this article:
            </p>

            <div className="flex flex-wrap gap-4 text-gray-400 dark:text-gray-200">
              {[
                {
                  name: "Twitter",
                  icon: <FaTwitter />,
                  url: (link, title) =>
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      link
                    )}&text=${encodeURIComponent(title)}`
                },
                {
                  name: "LinkedIn",
                  icon: <FaLinkedin />,
                  url: (link) =>
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      link
                    )}`
                },
                {
                  name: "Facebook",
                  icon: <FaFacebook />,
                  url: (link) =>
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      link
                    )}`
                }
              ].map((platform) => (
                <button
                  key={platform.name}
                  onClick={() =>
                    window.open(
                      platform.url(window.location.href, document.title),
                      "_blank",
                      "noopener,noreferrer,width=600,height=500"
                    )
                  }
                  className="flex justify-center items-center gap-2 border border-gray-600 px-4 py-2 rounded-full text-sm hover:border-[#00df9a] hover:text-[#00df9a] transition"
                >
                  <span>{platform.icon}</span>
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          <CommentSection blogId={blogDetails._id} openLogin={() => setShowLogin(true)}
          />

        </article>

      </main>

      {
        showLogin && (
          <div className='fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50'>
            <div className='bg-[#1f2933] p-6 rounded-xl border border-gray-700 w-75 text-center space-y-4'>
              <h2 className='text-[#00fd9a] font-semibold text-[18px]'>Login to continue</h2>
              <p className='text-[14px] text-gray-600 dark:text-gray-400 dar'>
                Sign in with Google to read full content or comment.
              </p>

              <GooglePopupLogin onSuccess={() => {
                setShowLogin(false)
                setExpanded(true)
              }}/>

              <button onClick={() => setShowLogin(false)} className='text-[12px] text-gray-600 dark:text-gray-400 hover:underline'>
                Cancel
              </button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default BlogDetails