import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({title, content, date, tags, coverImage, author, views, slug}) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/blog/${slug}`)} className='relative dark:bg-[#1f2933] border border-gray-700 rounded-xl overflow-hidden hover:border-[#00df9a] transition'>
        <img src={coverImage} alt="Blog Cover" className='w-full h-44 object-cover' loading='lazy'/>
        <div className='absolute top-2 left-2 flex gap-2'>
          {
            tags.map((tag) => (
              <span key={tag} className=' border border-[#00fd9a] dark:border-gray-600 dark:bg-[#485563] text-gray-500 dark:text-gray-300 text-[12px] px-2 py-1 rounded'>
                {tag}
              </span>
            ))
          }
        </div>
        

        <div className='p-4 space-y-2'>
            <h3 className='font-semibold text-lg'>{title}</h3>
            <p className='text-gray-400 text-[14px] line-clamp-2'>{content}</p>
            <div className='flex justify-between items-center text-[12px] dark:text-gray-500 mt-3'>
                <span>{author} | {date}</span>
                <span>{views} views</span>
            </div>
        </div>
    </div>
  )
}

export default BlogCard