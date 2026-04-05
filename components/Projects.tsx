"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaExternalLinkAlt, FaGithub, FaMobile, FaShieldAlt, FaRobot, FaGraduationCap, FaMusic, FaCalendar, FaLock, FaSearch } from "react-icons/fa";
import { SiFlutter, SiFirebase, SiNextdotjs, SiTypescript, SiSupabase, SiJavascript, SiPython } from "react-icons/si";

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const projects = [
    {
      title: "Cyber Safe Companion",
      subtitle: "Cybersecurity Awareness & Education App",
      icon: FaShieldAlt,
      iconColor: "text-red-500",
      tech: [
        { name: "Flutter", icon: SiFlutter },
        { name: "Firebase", icon: SiFirebase },
        { name: "Gemini API", icon: FaRobot },
      ],
      description: "Award-winning mobile application with 7 core modules including AI-powered chatbot, gamified quizzes, and age-based threat assessment. Research paper awarded Best Research Paper at CONFAB 2025.",
      features: [
        "AI-powered cybersecurity guidance using Gemini API",
        "Multi-level learning progression (Beginner → Advanced)",
        "Gamified quizzes with progress tracking",
        "Real-time cyber news and security tips",
      ],
      award: "Best Research Paper - CONFAB 2025",
      github: "https://github.com/ajayprajapati83",
      gradient: "from-red-500 via-orange-500 to-yellow-500",
    },
    {
      title: "ESSS Cube",
      subtitle: "Event Management Company Website",
      icon: FaCalendar,
      iconColor: "text-primary",
      tech: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TypeScript", icon: SiTypescript },
      ],
      description: "Production-grade event management website with responsive UI, modern navigation, and optimized performance using Next.js App Router.",
      features: [
        "SEO-friendly architecture",
        "Type-safe with TypeScript",
        "Responsive design for all devices",
        "Fast page load times",
      ],
      live: "https://essscube.vercel.app/",
      github: "https://github.com/ajayprajapati83",
      gradient: "from-cyan to-blue-500",
    },
    {
      title: "RhythmFlow Academy",
      subtitle: "Dance Course E-Commerce Platform",
      icon: FaMusic,
      iconColor: "text-secondary",
      tech: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Supabase", icon: SiSupabase },
      ],
      description: "Full-stack course-selling platform with authentication, course catalogue, and real-time backend powered by Supabase.",
      features: [
        "User authentication and registration",
        "Course listings and management",
        "Payment-ready architecture",
        "Server-side rendering for performance",
      ],
      live: "https://rhythmflowacademy.vercel.app/",
      github: "https://github.com/ajayprajapati83",
      gradient: "from-purple-500 via-pink-500 to-red-500",
    },
    {
      title: "Ubuntu Fest 2025",
      subtitle: "College Fest Website",
      icon: FaGraduationCap,
      iconColor: "text-accent",
      tech: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TypeScript", icon: SiTypescript },
      ],
      description: "Dynamic college fest website with event listings, schedules, and registration flows using mobile-first design approach.",
      features: [
        "Event schedules and listings",
        "Registration flows",
        "SEO-optimized with static generation",
        "Mobile-first responsive design",
      ],
      live: "https://ubuntu-fest2025.vercel.app/",
      github: "https://github.com/ajayprajapati83",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
    },
    {
      title: "PhishShield",
      subtitle: "Advanced Phishing Detection Platform",
      icon: FaLock,
      iconColor: "text-yellow-400",
      tech: [
        { name: "JavaScript", icon: SiJavascript },
      ],
      description: "Real-time phishing URL detection system with educational modules and instant scanning capabilities.",
      features: [
        "Real-time URL scanning",
        "Detailed threat reporting",
        "Educational security modules",
        "User-friendly interface",
      ],
      live: "https://ajayprajapati83.github.io/Phishshield/",
      github: "https://github.com/ajayprajapati83/Phishshield",
      gradient: "from-yellow-400 via-orange-400 to-red-500",
    },
    {
      title: "MalwareScanner Pro",
      subtitle: "File Security Analyser",
      icon: FaSearch,
      iconColor: "text-blue-400",
      tech: [
        { name: "Python", icon: SiPython },
      ],
      description: "Desktop GUI application for detecting and managing suspicious files with comprehensive security features.",
      features: [
        "Folder scanning capabilities",
        "Safe deletion protocols",
        "Security confirmation dialogs",
        "Intuitive desktop interface",
      ],
      live: "https://ajayprajapati83.github.io/P2_MalwareScanner/",
      github: "https://github.com/ajayprajapati83/P2_MalwareScanner",
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-darker via-dark to-darker"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Building innovative solutions that make a difference</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass rounded-2xl overflow-hidden glow-hover group neon-border"
            >
              {/* Project Header */}
              <div className={`bg-gradient-to-br ${project.gradient} p-4 sm:p-6 relative`}>
                {project.award && (
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-yellow-500/20 text-yellow-400 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs border border-yellow-400/30 backdrop-blur-sm whitespace-nowrap">
                    🏆 Award Winner
                  </div>
                )}
                <div className="flex items-start gap-3 sm:gap-4 mb-3 pr-20 sm:pr-24">
                  <div className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-xl flex-shrink-0">
                    <project.icon className={`text-2xl sm:text-3xl ${project.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:scale-105 transition-transform break-words">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <p className="text-white/90 text-xs sm:text-sm">{project.subtitle}</p>
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6">
                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">{project.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-xs sm:text-sm font-semibold gradient-text mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="text-gray-400 text-xs sm:text-sm flex items-start">
                        <span className="text-primary mr-2 flex-shrink-0">▹</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-darker/50 px-3 py-1 rounded-lg border border-primary/20 hover:border-primary/50 transition-all"
                    >
                      <tech.icon className="text-primary" />
                      <span className="text-gray-300 text-xs">{tech.name}</span>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-gray-700">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors group"
                    >
                      <FaExternalLinkAlt className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors group"
                    >
                      <FaGithub className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                </div>

                {project.award && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-yellow-400 text-sm font-semibold">🏆 {project.award}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
