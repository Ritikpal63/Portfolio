import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Har section me is hook ko call karo, aur jo bhi child animate karna hai
// usko `className="reveal-item"` de do — scroll me aate hi fade+slide up ho jayega
export const useScrollReveal = (selector = ".reveal-item", options = {}) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const targets = containerRef.current?.querySelectorAll(selector);
      if (!targets || targets.length === 0) return;

      gsap.from(targets, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
        },
        ...options,
      });
    },
    { scope: containerRef }
  );

  return containerRef;
};
