"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPython, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaAws } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiFlutter, SiDart, SiFirebase, SiSupabase, SiTailwindcss, SiMongodb, SiPostgresql, SiJavascript } from "react-icons/si";

const TechStack = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const techCategories = [
    {
      category: "Frontend",
      color: "from-cyan to-blue-500",
      techs: [
        { name: "React", icon: FaReact, level: 90 },
        { name: "Next.js", icon: SiNextdotjs, level: 85 },
        { name: "TypeScript", icon: SiTypescript, level: 80 },
        { name: "JavaScript", icon: SiJavascript, level: 90 },
        { name: "Tailwind CSS", icon: SiTailwindcss, level: 85 },
      ],
    },
    {
      category: "Mobile",
      color: "from-purple-500 to-pink-500",
      techs: [
        { name: "Flutter", icon: SiFlutter, level: 85 },
        { name: "Dart", icon: SiDart, level: 80 },
        { name: "React Native", icon: FaReact, level: 75 },
      ],
    },
    {
      category: "Backend",
      color: "from-green-400 to-emerald-500",
      techs: [
        { name: "Python", icon: FaPython, level: 90 },
        { name: "Node.js", icon: FaNodeJs, level: 80 },
        { name: "Firebase", icon: SiFirebase, level: 85 },
        { name: "Supabase", icon: SiSupabase, level: 75 },
      ],
    },
    {
      category: "Database",
      color: "from-orange-400 to-red-500",
      techs: [
        { name: "MongoDB", icon: SiMongodb, level: 80 },
        { name: "PostgreSQL", icon: SiPostgresql, level: 75 },
        { name: "Firebase", icon: SiFirebase, level: 85 },
      ],
    },
    {
      category: "Tools & Others",
      color: "from-yellow-400 to-orange-500",
      techs: [
        { name: "Git", icon: FaGitAlt, level: 85 },
        { name: "Docker", icon: FaDocker, level: 70 },
        { name: "AWS", icon: FaAws, level: 65 },
      ],
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-darker via-dark to-darker"></div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Technologies I work with</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              className="glass p-6 rounded-2xl neon-border glow-hover"
            >
              <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${category.color} mb-6`}>
                <h3 className="text-white font-semibold">{category.category}</h3>
              </div>

              <div className="space-y-4">
                {category.techs.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: catIndex * 0.1 + techIndex * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <tech.icon className="text-2xl text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-gray-300 font-medium">{tech.name}</span>
                      </div>
                      <span className="text-primary text-sm font-semibold">{tech.level}%</span>
                    </div>
                    <div className="w-full bg-darker/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${tech.level}%` } : {}}
                        transition={{ delay: catIndex * 0.1 + techIndex * 0.05 + 0.3, duration: 1 }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
