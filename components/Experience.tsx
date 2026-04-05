"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBriefcase, FaGraduationCap, FaCertificate, FaReact, FaShieldAlt, FaUsers, FaHandshake, FaAward, FaChalkboardTeacher } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const experiences = [
    {
      title: "Frontend Developer",
      company: "Commondo Protection Service",
      period: "2025 (3 Months)",
      type: "Professional",
      icon: SiNextdotjs,
      gradient: "from-cyan to-blue-500",
      description: [
        "Designed and developed responsive web modules using Next.js framework",
        "Replicated web modules into mobile screens using React Native for cross-platform consistency",
        "Collaborated with product team to deliver pixel-accurate, component-based frontend code",
      ],
    },
    {
      title: "President – Quick Heal Cyber Warriors Club",
      company: "Quick Heal Foundation",
      period: "Aug 2024 – Sep 2024",
      type: "Leadership",
      icon: FaShieldAlt,
      gradient: "from-red-500 via-orange-500 to-yellow-500",
      description: [
        "Led cybersecurity awareness operations for 19-member team",
        "Delivered 20+ public seminars reaching 500+ community members",
        "Established partnerships with schools, NGOs, and industry stakeholders",
        "Awarded Best Entry College Award and nominated for Best President Award",
      ],
    },
  ];

  const education = [
    {
      degree: "BSc Computer Science",
      institution: "Patkar Varde College, Mumbai",
      period: "June 2023 – May 2026 (Expected)",
      description: "Third Year Student with consistent academic performance and active research output",
    },
    {
      degree: "HSC (12th Grade)",
      institution: "Nirmal Junior College",
      period: "June 2023",
      grade: "67%",
    },
    {
      degree: "SSC (10th Grade)",
      institution: "S.V.N. English School",
      period: "March 2021",
      grade: "85%",
    },
  ];

  const certifications = [
    {
      title: "Real Time Threat Detection and Management",
      issuer: "Patkar Varde College (Erasmus+ Programme)",
      period: "16th April – 16th June, 2025",
      icon: FaShieldAlt,
      gradient: "from-red-500 to-orange-500",
    },
    {
      title: "Python for Cyber Security",
      issuer: "Patkar Varde College (Erasmus+ Programme)",
      period: "15th October – 18th December, 2025",
      icon: FaShieldAlt,
      gradient: "from-blue-500 to-cyan",
    },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-darker via-dark to-darker"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>

        {/* Professional Experience */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <FaBriefcase className="text-primary" />
            Professional Experience
          </motion.h3>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass p-6 rounded-2xl glow-hover neon-border relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${exp.gradient}`}>
                        <exp.icon className="text-2xl text-white" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold gradient-text mb-1">{exp.title}</h4>
                        <p className="text-xl text-gray-300">{exp.company}</p>
                      </div>
                    </div>
                    <span className="bg-primary/20 text-primary px-4 py-1 rounded-full text-sm border border-primary/30">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{exp.period}</p>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">▹</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <FaGraduationCap className="text-primary" />
            Education
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass p-6 rounded-2xl glow-hover neon-border relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                      <FaGraduationCap className="text-xl text-white" />
                    </div>
                    <h4 className="text-xl font-bold gradient-text">{edu.degree}</h4>
                  </div>
                  <p className="text-gray-300 mb-2">{edu.institution}</p>
                  <p className="text-gray-400 text-sm mb-3">{edu.period}</p>
                  {edu.grade && (
                    <p className="text-secondary font-semibold">Grade: {edu.grade}</p>
                  )}
                  {edu.description && (
                    <p className="text-gray-400 text-sm mt-2">{edu.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-8 gradient-text">Certifications</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="glass p-6 rounded-2xl glow-hover neon-border relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.gradient} flex-shrink-0`}>
                    <cert.icon className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">{cert.title}</h4>
                    <p className="text-gray-300 mb-2">{cert.issuer}</p>
                    <p className="text-gray-400 text-sm">{cert.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
