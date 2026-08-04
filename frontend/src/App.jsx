import Hero from "./components/Hero";
import Projects from "./components/Projects";
import EducationSkills from "./components/EducationSkills";
import WorkProcess from "./components/WorkProcess";
import Quote from "./components/Quote";
import Contact from "./components/Contact";

function App() {
  return (
    <main className="bg-base-black min-h-screen">
      <Hero />
      <Projects />

      <section className="py-20 md:py-28 border-b border-base-border">
        <div className="section-container grid lg:grid-cols-[1fr_1fr_0.85fr] gap-12">
          <EducationSkills />
          <WorkProcess />
          <Quote />
        </div>
      </section>

      <Contact />
    </main>
  );
}

export default App;
