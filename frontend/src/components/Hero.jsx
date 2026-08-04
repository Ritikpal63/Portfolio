import { useRef, useEffect } from "react";
import { Globe, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { profile, stats } from "../data/portfolioData";
import Navbar from "./Navbar";


const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  useEffect(() => {
    gsap.to(imageRef.current, {
      y: -10,
      duration: 1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);
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
      className="relative overflow-hidden border-b border-base-border pb-16 md:pb-24"
    >
      <Navbar />

      <div className="relative min-h-[45px] sm:min-h-[650px] md:min-h-[720px] lg:min-h-[780px]">
        {/* Giant background heading */}
        <h1
          aria-hidden="true"
          className="
      hero-bg-text
      pointer-events-none
      select-none
      absolute
      inset-x-0
      top-[28%]
      sm:top-[25%]
      md:top-[18%]
      lg:top-[12%]
      text-center
      font-display
      leading-[0.78]
      bg-red-gradient
      bg-clip-text
      text-transparent
      text-[22vw]
      sm:text-[20vw]
      md:text-[16vw]
      lg:text-[13vw]
      [transform:scaleY(2.8)]
      lg:[transform:scaleY(3)]
      portfolio
      "
        >
          PORTFOLIO
        </h1>

        {/* Portrait */}

        <div className="">
          <div className="relative">
            <img
              ref={imageRef}
              src={profile.photo}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="absolute lg:top-[-50px] lg:left-[24%] md:rigth-[10%] hero-img md:top-[70px] sm:top-[80px]"
            />
          </div>
        </div>
        {/* Stats */}
        <div
          className="
      hidden
      lg:flex
      flex-col
      gap-6
      xl:gap-7
      absolute
      right-4
      xl:right-10
      bottom-6
      xl:bottom-0
      z-20
      stats
      "
        >
          {stats.map((s) => (
            <div key={s.label} className="hero-stat flex items-center gap-5">
              <p className="w-20 xl:w-24 flex justify-end items-center">
                <span
                  className="
              inline-block
              text-2xl
              xl:text-3xl
              font-display
              text-brand-red
              [transform:scaleY(2)]
              origin-center
              "
                >
                  {s.value}
                </span>

                <span className="text-lg xl:text-xl text-brand-red ml-1">
                  +
                </span>
              </p>

              <p
                className="
            w-24
            xl:w-28
            text-left
            text-[11px]
            xl:text-[12px]
            font-bold
            whitespace-pre-line
            leading-4
            text-gray-400
            "
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          className="
      hero-item
      hidden
      lg:flex
      items-start
      gap-3
      absolute
      right-28
      xl:right-44
      top-52
      xl:top-64
      z-20
      max-w-[170px]
      "
        >
          <div className="mt-1 w-9 h-9 rounded-full border border-brand-white flex items-center justify-center shrink-0">
            <Sparkles size={14} className="text-brand-white" />
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            {profile.quoteBubble}
          </p>
        </div>

        {/* Main Intro */}
        <div
          className="
      section-container
      relative
      z-20
      mt-10
      sm:mt-14
      md:mt-0
      pt-8
      sm:pt-10
      md:pt-0
      md:absolute
      md:left-0
      md:bottom-6
      lg:bottom-0
      "
        >
          <div className="">
            <div className="greeting">
              <p
                className="
        hero-item
        font-script
        text-2xl
        sm:text-3xl
        md:text-4xl
        text-white
        mb-1
        md:bottom-[30%]
        "
              >
                {profile.greeting}
              </p>

              <h2
                className="
        hero-item
        font-display
        text-4xl
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        leading-[0.95]
        text-white
        mb-4
        "
              >
                {profile.firstName}
                <br />
                {profile.lastName}
              </h2>


            </div>
            <p
              className="
        hero-item
        text-brand-red
        font-bold
        text-xs
        sm:text-sm
        md:text-base
        tracking-wide
        mb-4
        role
        "
            >
              {profile.role}
            </p>
            <div className="description">
              <p
                className="
        hero-item
        text-gray-400
        text-sm
        md:text-base
        leading-relaxed
        mb-6
        max-w-[320px]
        sm:max-w-sm 
        "
              >
                {profile.description}
              </p>

              <div
                className="
        hero-item
        flex
        items-center
        gap-2
        text-xs
        sm:text-sm
        text-gray-300
        tracking-wide
        "
              >
                <Globe size={14} className="text-brand-red" />
                {profile.availability}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



