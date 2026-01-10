import React, { useState } from 'react'

const ImageSkeleton = ({src, alt = "", containerClass = "", imageFallBack}) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden ${containerClass}`}>
        {!loaded &&
            (<div className='absolute inset-0 animate-pulse bg-gray-700 rounded-md flex justify-center items-center'>Loading...</div>)
        }

        <img src={src || imageFallBack} alt={alt} loading='lazy' onLoad={() => setLoaded(true)}
        onError={(e) => (e.target.src = imageFallBack)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}/>
    </div>
  )
}

export default ImageSkeleton