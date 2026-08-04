import { ArrowRight } from "lucide-react";
import { projects } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Projects = () => {
  const containerRef = useScrollReveal(".reveal-item");

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-base-border">
      <div ref={containerRef} className="section-container">
        <div className="reveal-item flex items-center justify-between mb-10 pb-6 border-b border-base-border">
          <h2 className="font-display text-2xl md:text-3xl">SELECTED PROJECTS</h2>
          <a
            href="#projects"
            className="hidden sm:flex items-center gap-2 text-xs tracking-widest text-gray-400 hover:text-brand-red transition-colors"
          >
            VIEW ALL PROJECTS <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <a
              href={project.link}
              key={project.number}
              target="_blank"
              className="reveal-item group block"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-base-card mb-5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-brand-red font-display text-sm mr-3">
                    {project.number}
                  </span>
                  <span className="font-semibold tracking-wide">{project.title}</span>
                  <p className="text-xs text-gray-500 tracking-wide mt-1 ml-8">
                    {project.category}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="text-gray-500 group-hover:text-brand-red group-hover:translate-x-1 transition-all duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
