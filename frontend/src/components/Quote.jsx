import { Sparkles } from "lucide-react";
import { quote } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Quote = () => {
  const containerRef = useScrollReveal(".reveal-item");

  return (
    <div
      ref={containerRef}
      className="relative bg-red-gradient rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden min-h-[340px]"
    >
      <span className="reveal-item font-display text-6xl text-white/20 leading-none">
        &ldquo;
      </span>

      <div className="reveal-item">
        <p className="font-display text-xl md:text-2xl leading-snug text-white mb-6">
          {quote.text}
        </p>
        <p className="font-script text-3xl text-white">{quote.signature}</p>
      </div>

      <div className="reveal-item flex items-center justify-between mt-8">
        <p className="text-xs tracking-widest text-white/80 max-w-[140px]">
          {quote.closingLine}
        </p>
        <Sparkles size={18} className="text-white/70" />
      </div>
    </div>
  );
};

export default Quote;
