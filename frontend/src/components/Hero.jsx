import { useRef } from "react";
import { Globe, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { profile, stats } from "../data/portfolioData";
import Navbar from "./Navbar";

const Hero = () => {
  const containerRef = useRef(null);

  // Page-load entrance animation -> hero sabse pehle dikhta hai isliye
  // scroll-trigger nahi, seedha mount pe chalega
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-bg-text", { opacity: 0, scale: 1.08, duration: 1.1 })
        .from(".hero-photo", { opacity: 0, y: 40, duration: 0.9 }, "-=0.7")
        .from(".hero-item", { opacity: 0, y: 25, stagger: 0.12, duration: 0.7 }, "-=0.5")
        .from(".hero-stat", { opacity: 0, x: 20, stagger: 0.1, duration: 0.6 }, "-=0.6");
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative overflow-hidden pb-16 md:pb-24 border-b border-base-border"
    >
      <Navbar />

      <div className="relative min-h-[640px] md:min-h-[780px]">
        {/* Giant background heading */}
        <h1
          aria-hidden="true"
          className="hero-bg-text pointer-events-none select-none absolute left-0 right-0 top-[30%] md:top-[10%px] text-center font-display leading-[0.78] bg-red-gradient bg-clip-text text-transparent  text-[18vw] md:text-[13vw] [transform:scaleY(3)]"
        >
          PORTFOLIO
        </h1>

        {/* Portrait photo */}
        {/* <div className="hero-photo relative mx-auto mt-24 w-[72%] max-w-[300px] md:mt-0 md:absolute md:right-[35%] md:top-[50%] md:w-[360px] md:max-w-none z-1">
          <div className="relative rounded-t-[140px] overflow-hidden aspect-[3/4] shadow-2xl shadow-black">
            <img
              src={profile.photo}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-red-dark/20 via-transparent to-transparent" />
          </div>
        </div> */}

        {/* Stats column - desktop only */}
        <div className="hidden lg:flex flex-col gap-7 absolute right-10 bottom-0 z-20">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-5">
              <p className="w-20 flex justify-end items-center">
                <span className="inline-block text-3xl font-display text-brand-red [transform:scaleY(2)] origin-center">
                  {s.value}
                </span>

                <span className="text-xl text-brand-red self-center ml-1">
                  +
                </span>
              </p>
              <p className="w-28 text-left text-[12px] font-bold whitespace-pre-line leading-4 text-gray-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Small quote bubble - desktop only */}
        <div className="hero-item hidden lg:flex items-start gap-3 absolute left-[72%] top-[250px] z-20 max-w-[170px]">
          <div className="mt-1 w-9 h-9 rounded-full border border-brand-red flex items-center justify-center shrink-0">
            <Sparkles size={14} className="text-brand-red" />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{profile.quoteBubble}</p>
        </div>

        {/* Main intro content */}
        <div className="section-container relative z-20 mt-10 md:mt-0 md:absolute md:bottom-6 md:left-0">
          <p className="hero-item font-script text-3xl md:text-4xl text-white mb-1">
            {profile.greeting}
          </p>
          <h2 className="hero-item font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-white mb-4">
            {profile.firstName}
            <br />
            {profile.lastName}
          </h2>
          <p className="hero-item text-brand-red font-bold text-sm md:text-base tracking-wide mb-4">
            {profile.role}
          </p>
          <p className="hero-item text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
            {profile.description}
          </p>
          <div className="hero-item flex items-center gap-2 text-xs text-gray-300 tracking-wide">
            <Globe size={14} className="text-brand-red" />
            {profile.availability}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
