import React from 'react'

const ProjectCardSkeleton = () => {
  return (
    <div
      className="max-w-90 bg-[#1f2933] rounded-xl overflow-hidden border border-gray-700 animate-pulse">

      {/* IMAGE */}
      <div className="h-48 bg-gray-700" />

      {/* CONTENT */}
      <div className="p-6 flex flex-col gap-4 text-center">

        {/* TITLE */}
        <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto" />

        {/* DESC */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto" />
        </div>

        {/* TECH STACK */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {[1, 2, 3, 4].map(i => (
            <span
              key={i}
              className="h-6 w-16 bg-gray-700 rounded"
            />
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="h-9 w-24 bg-gray-700 rounded" />
          <div className="h-9 w-24 bg-gray-700 rounded" />
        </div>

      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
