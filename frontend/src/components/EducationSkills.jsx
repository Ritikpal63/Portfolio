import { education, skills } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";

const EducationSkills = () => {
  const containerRef = useScrollReveal(".reveal-item");

  return (
    <div ref={containerRef}>
      <h2 className="reveal-item font-display text-2xl mb-8">EDUCATION & SKILLS</h2>

      <div className="reveal-item mb-8">
        <p className="eyebrow mb-4">EDUCATION</p>
        <div className="space-y-5">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="flex items-start justify-between gap-4 pb-4 border-b border-base-border/70"
            >
              <div>
                <p className="font-semibold text-sm md:text-base">{edu.degree}</p>
                <p className="text-gray-500 text-xs mt-1">{edu.place}</p>
              </div>
              <span className="text-brand-red text-xs whitespace-nowrap font-medium">
                {edu.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="reveal-item">
        <p className="eyebrow mb-4">SKILLS</p>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill} className="pill">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSkills;
