"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "64.ajayprajapati@gmail.com",
      link: "mailto:64.ajayprajapati@gmail.com",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91-8369564372",
      link: "tel:+918369564372",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Mumbai, Maharashtra, India",
      link: null,
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/ajayprajapatii",
      link: "https://linkedin.com/in/ajayprajapatii",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "github.com/ajayprajapati83",
      link: "https://github.com/ajayprajapati83",
      color: "from-gray-400 to-gray-600",
    },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-darker via-dark to-darker"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
            Let's connect and create something amazing together!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-6 glow-hover neon-border relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${info.color} group-hover:scale-110 transition-transform`}>
                    <info.icon className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-400 text-sm mb-1">{info.label}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        target={info.link.startsWith("http") ? "_blank" : undefined}
                        rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-white hover:text-primary transition-colors break-all"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white">{info.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-8 text-center neon-border"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">Ready to collaborate?</h3>
            <p className="text-gray-400 mb-6">
              Whether you have a project in mind, need cybersecurity consultation, or want to discuss full-stack development, 
              I'm here to help bring your ideas to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:64.ajayprajapati@gmail.com"
                className="relative px-8 py-3 rounded-full font-semibold overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent animate-gradient bg-[length:200%_auto]"></span>
                <span className="relative z-10">Send Email</span>
              </a>
              <a
                href="https://linkedin.com/in/ajayprajapatii"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-3 rounded-full font-semibold hover:bg-primary/20 transition-all neon-border"
              >
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full neon-border">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-gray-300">Available for freelance opportunities</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
