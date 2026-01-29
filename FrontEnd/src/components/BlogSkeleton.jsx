const BlogSkeleton = () => {
  return (
    <div className="animate-pulse">

      {/* HERO */}
      <section className="relative h-[55vh] min-h-90 w-full bg-gray-800">
        <div className="absolute inset-0 bg-gray-700" />

        <div className="relative z-10 max-w-full mx-auto px-8 h-full flex flex-col justify-end pb-12">

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-6 w-20 rounded-full bg-gray-600"
              />
            ))}
          </div>

          {/* Title */}
          <div className="h-10 md:h-14 bg-gray-600 rounded w-3/4 mb-4" />

          {/* Meta */}
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-gray-600 rounded" />
            <div className="h-4 w-20 bg-gray-600 rounded" />
            <div className="h-4 w-16 bg-gray-600 rounded" />
          </div>

        </div>
      </section>

      {/* CONTENT */}
      <main className="bg-[#29323c] text-gray-100">

        <article className="max-w-full mx-auto bg-[#1f2933] p-8 space-y-8">

          {/* Author Card */}
          <div className="flex items-center gap-4 border-b border-gray-700 pb-6">
            <div className="w-12 h-12 rounded-full bg-gray-600" />

            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-600 rounded" />
              <div className="h-3 w-20 bg-gray-700 rounded" />
            </div>
          </div>

          {/* Content Lines */}
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-700 rounded"
                style={{ width: `${90 - i * 3}%` }}
              />
            ))}
          </div>

          {/* Share */}
          <div className="border-t border-gray-700 pt-6">
            <div className="h-4 w-40 bg-gray-600 rounded mb-4" />

            <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-9 w-28 rounded-full bg-gray-700"
                />
              ))}
            </div>
          </div>

        </article>

      </main>
    </div>
  );
};

export default BlogSkeleton;
