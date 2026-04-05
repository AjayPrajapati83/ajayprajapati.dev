"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaAward, FaUsers, FaChalkboardTeacher, FaCode, FaPython, FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaMobile, FaRobot, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaJava } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiFlutter, SiDart, SiFirebase, SiSupabase, SiCplusplus, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { icon: FaUsers, value: "1,000+", label: "People Reached", color: "from-cyan to-primary" },
    { icon: FaChalkboardTeacher, value: "20+", label: "Public Seminars", color: "from-secondary to-neon" },
    { icon: FaCode, value: "4+", label: "Live Applications", color: "from-accent to-primary" },
    { icon: FaAward, value: "14", label: "Competition Wins", color: "from-yellow-400 to-orange-500" },
  ];

  const skills = {
    "Programming": [
      { name: "Python", icon: FaPython, color: "text-yellow-400" },
      { name: "C++", icon: SiCplusplus, color: "text-blue-400" },
      { name: "Java", icon: FaJava, color: "text-red-500" },
      { name: "Dart", icon: SiDart, color: "text-cyan" },
      { name: "JavaScript", icon: FaJs, color: "text-yellow-300" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    ],
    "Web Development": [
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "React", icon: FaReact, color: "text-cyan" },
      { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS3", icon: FaCss3Alt, color: "text-blue-400" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan" },
      { name: "React Native", icon: TbBrandReactNative, color: "text-primary" },
    ],
    "Mobile Development": [
      { name: "Flutter", icon: SiFlutter, color: "text-blue-400" },
      { name: "React Native", icon: TbBrandReactNative, color: "text-cyan" },
      { name: "Dart", icon: SiDart, color: "text-cyan" },
    ],
    "Backend & Database": [
      { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
      { name: "Supabase", icon: SiSupabase, color: "text-accent" },
      { name: "REST APIs", icon: FaNodeJs, color: "text-accent" },
      { name: "Database", icon: FaDatabase, color: "text-primary" },
    ],
    "AI & Tools": [
      { name: "Gemini API", icon: FaRobot, color: "text-secondary" },
      { name: "AI Automation", icon: FaRobot, color: "text-neon" },
      { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    ],
    "Cybersecurity": [
      { name: "Threat Detection", icon: FaShieldAlt, color: "text-red-500" },
      { name: "Security Analysis", icon: FaShieldAlt, color: "text-primary" },
      { name: "Awareness Training", icon: FaChalkboardTeacher, color: "text-accent" },
    ],
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-darker via-dark to-darker"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass p-6 rounded-2xl text-center glow-hover relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <div className={`inline-block p-4 rounded-full bg-gradient-to-br ${stat.color} mb-3 animate-float`}>
                  <stat.icon className="text-4xl text-white" />
                </div>
                <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">My Journey</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              I'm a third-year BSc Computer Science student at Patkar Varde College, Mumbai, with a passion for cybersecurity and full-stack development. 
              My journey has been marked by innovation, leadership, and a commitment to making technology accessible to everyone.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              As President of the Quick Heal Cyber Warriors Club, I led a 19-member team in conducting cybersecurity awareness campaigns, 
              reaching over 1,000 individuals across schools and communities. This experience reinforced my belief in the power of education 
              to create a safer digital world.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My research paper on "Cyber Safe Companion" was awarded Best Research Paper at the International Conference CONFAB 2026, 
              recognizing my work in developing innovative mobile-based cybersecurity education platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">What I Do</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              I specialize in building frontend web and mobile applications with a focus on cybersecurity, user experience, and AI integration. 
              My technical expertise spans across multiple domains:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">▹</span>
                <span className="text-gray-300">Developing responsive web applications using Next.js, React, and TypeScript</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">▹</span>
                <span className="text-gray-300">Building cross-platform mobile apps with Flutter and React Native</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">▹</span>
                <span className="text-gray-300">Integrating AI capabilities using Gemini API for intelligent features</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">▹</span>
                <span className="text-gray-300">Implementing cybersecurity solutions and awareness platforms</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">▹</span>
                <span className="text-gray-300">Leading teams and delivering impactful public seminars</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center gradient-text">Technical Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="glass p-6 rounded-2xl glow-hover neon-border"
              >
                <h4 className="text-xl font-semibold gradient-text mb-4">{category}</h4>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <div
                      key={skill.name}
                      className="group relative"
                    >
                      <div className="flex items-center gap-2 bg-darker/50 hover:bg-darker px-3 py-2 rounded-lg border border-primary/20 hover:border-primary/50 transition-all cursor-pointer">
                        <skill.icon className={`text-xl ${skill.color}`} />
                        <span className="text-gray-300 text-sm">{skill.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
