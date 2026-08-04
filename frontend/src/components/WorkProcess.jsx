import { Search, Lightbulb, PenTool, Code2, Send } from "lucide-react";
import { workProcess } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";

const iconMap = {
  Search,
  Lightbulb,
  PenTool,
  Code2,
  Send,
};

const WorkProcess = () => {
  const containerRef = useScrollReveal(".reveal-item");

  return (
    <div ref={containerRef}>
      <h2 className="reveal-item font-display text-2xl mb-8">WORK PROCESS</h2>

      <div className="relative">
        {/* connecting line */}
        <div className="absolute left-5 top-5 bottom-5 w-px bg-base-border" />

        <div className="space-y-8">
          {workProcess.map((step) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <div key={step.number} className="reveal-item relative flex gap-5">
                <div className="relative z-10 w-10 h-10 rounded-full bg-base-black border border-brand-red flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-brand-red" />
                </div>
                <div>
                  <p className="text-brand-red text-xs font-bold tracking-widest mb-1">
                    {step.title}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkProcess;
