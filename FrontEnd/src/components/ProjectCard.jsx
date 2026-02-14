import ImageSkeleton from "./ImageSkeleton";
import imageNotFound from "../assets/browser.webp"
import ProjectCardSkeleton from "./ProjectCardSkeleton";

const ProjectCard = ({ title, desc, tech, github, live, img }) => {
  const optimizedImageProject = img.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_600/"
  )
  return (
    <div
      className="max-w-90 dark:bg-[#1f2933] rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:border-[#00df9a] hover:shadow-xl hover:shadow-black/30">
      <div className="h-48 overflow-hidden">
        <ImageSkeleton
          src={optimizedImageProject}
          alt={title}
          containerClass="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          imageFallBack={imageNotFound}
        />
      </div>

      <div className="p-6 flex flex-col gap-4 text-center">
        <h3 className="text-xl font-semibold">{title}</h3>

        <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>

        <div className="flex flex-wrap justify-center gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded bg-gray-300 dark:bg-gray-800">
              {t}
            </span>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <a
            href={github}
            target="_blank"
            className="px-4 py-2 text-sm rounded border border-gray-500 hover:border-[#00df9a] transition">
            GitHub
          </a>

          {live && (
            <a
              href={live}
              target="_blank"
              className="px-4 py-2 text-sm rounded bg-[#00df9a] text-black">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
