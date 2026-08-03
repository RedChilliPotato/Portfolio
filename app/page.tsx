"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, GitBranch, Link2, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "timeline", label: "TIMELINE" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];

const skills = [
  {
    title: "Web Applications",
    items: ["Django", "FastAPI", "REST APIs", "JWT", "PostgreSQL", "MongoDB", "SQLite", "Pyramid"],
  },
  {
    title: "Data & Intelligence",
    items: ["Data Analysis", "Data Science", "TensorFlow", "Keras", "Python Automation"],
  },
  {
    title: "Frontend & UX",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "SCSS", "Bootstrap"],
  },
  {
    title: "Engineering Tools",
    items: ["Git", "GitHub", "PyCharm", "Figma", "Drone Programming", "System Design"],
  },
];

const timeline = [
  {
    title: "Master of Computer Applications (MCA)",
    subtitle: "BBD University Lucknow",
    details: "78% | 2022 - 2024",
  },
  {
    title: "Industrial Training",
    subtitle: "SoftPro India",
    details: "Professional development through applied industry practice.",
  },
  {
    title: "Django Project Training",
    subtitle: "Precursor",
    details: "Structured training in modern web application development.",
  },
  {
    title: "Award Recipient",
    subtitle: "BBD Software Exhibition",
    details: "Recognized for engineering-focused digital innovation.",
  },
];

const projects = [
  {
    title: "Daily Chores & Security Portal",
    subtitle: "Marketplace for Daily Chores and Security Services.",
    description:
      "Architected a platform optimizing resource allocation, facilitating efficient service acquisition and management for commercial entities and individuals. Implemented secure workflows for hiring and payment processing.",
  },
  {
    title: "School Management System",
    subtitle: "Comprehensive Administrative Platform.",
    description:
      "Engineered a centralized system to streamline operational logistics across an educational institution. Features include comprehensive financial oversight (Salary & Fee management), dynamic scheduling, class structure optimization, and centralized administrative control.",
  },
  {
    title: "World Wide Land",
    subtitle: "Unified Real Estate Information System.",
    description:
      "Constructed high-performance interfaces for real estate property listing and acquisition. Integrated features allowing for detailed property inquiries, scheduling, and direct offer submission, enhancing transparency for both property owners and investors.",
  },
];

function getCurrentTime() {
  const now = new Date();
  return {
    time: now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
    date: now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    day: now.toLocaleDateString("en-US", { weekday: "long" }),
  };
}

export default function Home() {
  const [now, setNow] = useState<{ time: string; date: string; day: string } | null>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [revealComplete, setRevealComplete] = useState(false);

  useEffect(() => {
    setNow(getCurrentTime());
    const interval = setInterval(() => setNow(getCurrentTime()), 1000);
    const timer = window.setTimeout(() => setRevealComplete(true), 1200);
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setShowCursor(mediaQuery.matches);

    return () => {
      clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#000000] text-white">
      <AnimatePresence>
        {!revealComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="fixed inset-0 z-[220] flex items-center justify-center bg-black"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,30,58,0.16),transparent_60%)]" />
            <motion.div
              initial={{ width: 0, opacity: 0.4 }}
              animate={{ width: "68%", opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="h-px bg-gradient-to-r from-transparent via-[#c41e3a] to-transparent"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="absolute text-center"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-white/60">OPENING PORTFOLIO</p>
              <p className="mt-3 text-2xl font-semibold uppercase tracking-[0.25em] text-white sm:text-3xl">
                Sudhanshu Ranjan
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[10] overflow-hidden"
        animate={{ y: scrollY * 0.12, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 90, damping: 24 }}
      >
        <div className="ambient-orb ambient-orb-one" />
        <div className="ambient-orb ambient-orb-two" />
        <div className="ambient-grid" />
        <motion.div
          className="ambient-symbol ambient-symbol-one"
          animate={{ x: scrollY * 0.03, y: scrollY * -0.04, scale: 1 + scrollY * 0.0004 }}
          transition={{ type: "spring", stiffness: 80, damping: 24 }}
        >
          &lt;/&gt;
        </motion.div>
        <motion.div
          className="ambient-symbol ambient-symbol-two"
          animate={{ x: scrollY * -0.04, y: scrollY * 0.03, scale: 1 + scrollY * 0.00025 }}
          transition={{ type: "spring", stiffness: 80, damping: 24 }}
        >
          {}
        </motion.div>
        <motion.div
          className="ambient-symbol ambient-symbol-three"
          animate={{ x: scrollY * 0.025, y: scrollY * -0.02, scale: 1 + scrollY * 0.0003 }}
          transition={{ type: "spring", stiffness: 80, damping: 24 }}
        >
          []
        </motion.div>
        <motion.div
          className="ambient-symbol ambient-symbol-four"
          animate={{ x: scrollY * -0.03, y: scrollY * 0.035, scale: 1 + scrollY * 0.0002 }}
          transition={{ type: "spring", stiffness: 80, damping: 24 }}
        >
          ()
        </motion.div>
        <motion.div
          className="ambient-symbol ambient-symbol-five"
          animate={{ x: scrollY * 0.02, y: scrollY * -0.025, scale: 1 + scrollY * 0.00035 }}
          transition={{ type: "spring", stiffness: 80, damping: 24 }}
        >
          import
        </motion.div>
        <motion.div
          className="ambient-symbol ambient-symbol-six"
          animate={{ x: scrollY * -0.025, y: scrollY * 0.02, scale: 1 + scrollY * 0.0003 }}
          transition={{ type: "spring", stiffness: 80, damping: 24 }}
        >
          data
        </motion.div>
      </motion.div>
      {showCursor && (
        <>
          <motion.div
            className="pointer-events-none fixed z-[90] h-3 w-3 rounded-full bg-[#c41e3a]"
            animate={{ x: cursorPosition.x - 6, y: cursorPosition.y - 6 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.3 }}
          />
          <motion.div
            className="pointer-events-none fixed z-[80] h-8 w-8 rounded-full border border-white/40"
            animate={{ x: cursorPosition.x - 16, y: cursorPosition.y - 16 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.3 }}
          />
          <div
            className="pointer-events-none fixed inset-0 z-[80] hidden md:block"
            style={{
              background: `radial-gradient(circle 180px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(196,30,58,0.18), transparent 60%)`,
              mixBlendMode: "screen",
            }}
          />
        </>
      )}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#about" className="text-[0.7rem] uppercase tracking-[0.4em] text-white/80">
            SUDHANSHU RANJAN
          </a>
          <div className="hidden items-center gap-4 md:flex">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`text-[0.68rem] uppercase tracking-[0.35em] transition ${
                  activeSection === section.id ? "text-[#c41e3a]" : "text-white/60 hover:text-white"
                }`}
                onMouseEnter={(event) => {
                  const target = event.currentTarget as HTMLElement;
                  target.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(event) => {
                  const target = event.currentTarget as HTMLElement;
                  target.style.transform = "scale(1)";
                }}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="about" className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          style={{ y: scrollY * 0.015 }}
        >
          <div className="space-y-6">
            <motion.div
              className="glass-panel max-w-2xl p-6 sm:p-8"
              animate={{ y: scrollY * 0.01, rotateX: 0, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 24 }}
            >
              <div className="mb-6 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
                <span className="rounded-full border border-[#c41e3a]/60 px-3 py-1 text-[#c41e3a]">CURRENT STATUS</span>
                <span className="rounded-full border border-white/15 px-3 py-1">LOCAL DATE / DAY</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="text-[0.7rem] uppercase tracking-[0.35em] text-white/50">TIME</div>
                  <div className="mt-2 font-mono text-2xl tracking-[0.2em] text-white">{now?.time ?? "--:--:--"}</div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="text-[0.7rem] uppercase tracking-[0.35em] text-white/50">DATE</div>
                  <div className="mt-2 font-mono text-lg tracking-[0.1em] text-white">{now?.date ?? "--/---/----"}</div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="text-[0.7rem] uppercase tracking-[0.35em] text-white/50">DAY</div>
                  <div className="mt-2 font-mono text-lg tracking-[0.1em] text-white">{now?.day ?? "------"}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-panel p-8 sm:p-10"
              animate={{ y: scrollY * -0.008 }}
              transition={{ type: "spring", stiffness: 60, damping: 24 }}
            >
              <p className="mb-4 text-[0.7rem] uppercase tracking-[0.45em] text-[#c41e3a]">PROFILE OVERVIEW</p>
              <h1 className="max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[0.04em] text-white sm:text-5xl lg:text-6xl">
                SUDHANSHU RANJAN
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
                Experienced Web Developer & Designer | MCA Graduate
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-[#c41e3a] bg-[#c41e3a]/10 px-5 py-3 text-sm uppercase tracking-[0.3em] text-white transition duration-200 hover:scale-[1.02] hover:bg-[#c41e3a]"
                >
                  <Download size={16} /> Download Resume
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.3em] text-white/80 transition duration-200 hover:scale-[1.02] hover:border-white/30"
                >
                  <Sparkles size={16} /> View Projects
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="glass-panel p-8 sm:p-10"
            style={{ y: scrollY * 0.02 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#c41e3a]">EXECUTIVE SUMMARY</p>
              <div className="ml-4 h-px flex-1 bg-white/10" />
            </div>
            <p className="text-sm leading-8 text-white/75 sm:text-[15px]">
              I work across web development, application engineering, and data-driven problem solving. My focus is on building reliable systems, clear interfaces, and practical solutions that span full-stack products, Python-based work, automation, and analytical projects.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.35em] text-white/60">
                <Sparkles size={14} className="text-[#c41e3a]" /> CORE MISSION
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c41e3a]/50 text-[#c41e3a]">
                  <Sparkles size={24} />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">Practical engineering, thoughtful execution.</p>
                  <p className="mt-1 text-sm text-white/60">From web applications to data-focused systems, I build solutions that are structured, adaptable, and useful.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#c41e3a]">SKILL SET</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[0.08em] text-white sm:text-3xl">TECHNICAL PROFICIENCIES</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {skills.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <h3 className="text-sm uppercase tracking-[0.34em] text-white/90">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/70">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-10">
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#c41e3a]">EDUCATION & TRAINING</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[0.08em] text-white sm:text-3xl">ACADEMIC AND PROFESSIONAL DEVELOPMENT</h2>
          <div className="mt-8 space-y-6 border-l border-white/10 pl-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="relative"
              >
                <div className="absolute -left-[1.7rem] top-1 h-3 w-3 rounded-full border border-[#c41e3a] bg-[#c41e3a]" />
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#c41e3a]">{item.subtitle}</p>
                  <h3 className="mt-2 text-lg font-medium text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">{item.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#c41e3a]">SELECTED WORK</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[0.08em] text-white sm:text-3xl">PROJECTS</h2>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6, rotateX: -5, rotateY: 5, scale: 1.02, borderColor: "rgba(196, 30, 58, 0.75)" }}
                className="group rounded-[1.6rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.66rem] uppercase tracking-[0.32em] text-[#c41e3a]">0{index + 1}</span>
                  <ArrowUpRight className="text-white/60 transition group-hover:text-[#c41e3a]" size={18} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/55">{project.subtitle}</p>
                <p className="mt-5 text-sm leading-8 text-white/70">{project.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#c41e3a]">CONTACT</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[0.08em] text-white sm:text-3xl">DIRECT CONTACT</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Fsudhanshusrivastav" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 transition duration-200 hover:scale-[1.02] hover:border-[#c41e3a]/50">
                <GitBranch size={16} /> GitHub
              </a>
              <a href="https://www.google.com/search?q=https%3A%2F%2Fin.linkedin.com%2Fin%2Fsudhanshu3107" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 transition duration-200 hover:scale-[1.02] hover:border-[#c41e3a]/50">
                <Link2 size={16} /> LinkedIn
              </a>
              <a href="mailto:sudhanshuranjan3107@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 transition duration-200 hover:scale-[1.02] hover:border-[#c41e3a]/50">
                <Mail size={16} /> Email
              </a>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6 text-sm leading-8 text-white/70">
            <p>Formal Site: sudhanshuranjan.vercel.app</p>
            <p>Direct Contact: +91-9670090088 | sudhanshuranjan3107@gmail.com</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/80 px-4 py-6 text-center text-[0.7rem] uppercase tracking-[0.35em] text-white/45 sm:px-6 lg:px-8">
        Crafted with clarity, structure, and attention to detail.
      </footer>
    </main>
  );
}
