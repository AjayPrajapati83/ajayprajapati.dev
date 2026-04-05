"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaDownload } from "react-icons/fa";
import TypingAnimation from "./TypingAnimation";
import Image from "next/image";

const Hero = () => {
  const roles = [
    "Cybersecurity Specialist",
    "Frontend Developer",
    "Tech Innovation Leader",
    "Mobile App Developer",
    "AI Integration Expert",
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-bg pt-20 md:pt-0">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary text-xl mb-2 font-mono"
            >
              👋 Hello, I'm
            </motion.h3>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              Ajay <span className="gradient-text">Prajapati</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-6 h-8"
            >
              <TypingAnimation texts={roles} className="gradient-text font-semibold" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 mb-8 text-lg leading-relaxed"
            >
              🏆 Award-winning researcher and developer passionate about bridging cybersecurity education gaps through technology innovation. 
              Reached <span className="text-primary font-semibold">1,000+</span> individuals through awareness campaigns and built <span className="text-secondary font-semibold">4+</span> live production applications.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 mb-8"
            >
              <a href="https://linkedin.com/in/ajayprajapatii" target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-full hover:bg-primary/20 transition-all glow-hover group" aria-label="LinkedIn">
                <FaLinkedin className="text-2xl group-hover:text-primary transition-colors" />
              </a>
              <a href="https://github.com/ajayprajapati83" target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-full hover:bg-primary/20 transition-all glow-hover group" aria-label="GitHub">
                <FaGithub className="text-2xl group-hover:text-primary transition-colors" />
              </a>
              <a href="mailto:64.ajayprajapati@gmail.com" className="glass p-4 rounded-full hover:bg-primary/20 transition-all glow-hover group" aria-label="Email">
                <FaEnvelope className="text-2xl group-hover:text-primary transition-colors" />
              </a>
              <a href="tel:+918369564372" className="glass p-4 rounded-full hover:bg-primary/20 transition-all glow-hover group" aria-label="Phone">
                <FaPhone className="text-2xl group-hover:text-primary transition-colors" />
              </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#projects" className="relative px-8 py-3 rounded-full font-semibold overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent animate-gradient bg-[length:200%_auto]"></span>
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </a>
              <a href="#contact" className="glass px-8 py-3 rounded-full font-semibold hover:bg-primary/20 transition-all neon-border flex items-center gap-2">
                <FaDownload className="text-sm" />
                Download CV
              </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">1000+</div>
                <div className="text-gray-400 text-sm">People Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">20+</div>
                <div className="text-gray-400 text-sm">Seminars</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">14</div>
                <div className="text-gray-400 text-sm">Awards</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square glass rounded-3xl overflow-hidden glow neon-border animate-glow">
                <Image
                  src="/Ajay.png"
                  alt="Ajay Prajapati"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/40 rounded-full blur-2xl animate-pulse-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/40 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
              <div className="absolute top-1/2 -right-8 w-20 h-20 bg-accent/40 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
