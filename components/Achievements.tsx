"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaTrophy, FaMedal, FaStar } from "react-icons/fa";

const Achievements = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const highlights = [
    {
      icon: FaTrophy,
      title: "Best Research Paper Award",
      event: "International Conference CONFAB 2025",
      location: "Patkar Varde College",
      date: "Jan 11, 2025",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: FaMedal,
      title: "Best Entry College Award",
      event: "Quick Heal Cyber Warriors Program",
      location: "Presented by Hon. Governor of Maharashtra",
      date: "2024",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: FaStar,
      title: "Nominated for Best President Award",
      event: "Quick Heal Cyber Warriors Club",
      location: "Leadership Excellence",
      date: "2024",
      color: "from-purple-400 to-pink-500",
    },
  ];

  const competitions = [
    { event: "Climax Writing", position: "1st Place", venue: "SHIVOTSAV (Seth Vidya Mandir)" },
    { event: "Creative Relay Writing", position: "2nd Place", venue: "SHIVOTSAV (Seth Vidya Mandir)" },
    { event: "Book Review", position: "2nd Place", venue: "SHIVOTSAV (Seth Vidya Mandir)" },
    { event: "Best CL", position: "1st Place", venue: "PHOENIX (KJ Somiya)" },
    { event: "Treasure Hunt", position: "1st Place", venue: "DLU (Dalmia College)" },
    { event: "Debate", position: "2nd Place", venue: "DLU (Dalmia College)" },
    { event: "Best CL", position: "1st Place", venue: "DLU (Dalmia College)" },
    { event: "Tech Quiz", position: "1st Place", venue: "Ztech (NL College)" },
    { event: "Best CL", position: "1st Place", venue: "Ztech (NL College)" },
    { event: "Hackathon", position: "3rd Place", venue: "Lala Lajpat Rai College" },
    { event: "Debate", position: "2nd Place", venue: "Aagaaz (Lords Universal College)" },
    { event: "Sell The Product", position: "2nd Place", venue: "Pravinostav (Pravin Rohindas College)" },
    { event: "D.I.P.A.M.", position: "3rd Place", venue: "D.I.P.A.M" },
    { event: "Research Paper", position: "Best Research Paper", venue: "CONFAB 2025" },
  ];

  const getPositionColor = (position: string) => {
    if (position.includes("1st") || position.includes("Best")) return "text-yellow-400";
    if (position.includes("2nd")) return "text-gray-300";
    if (position.includes("3rd")) return "text-orange-400";
    return "text-primary";
  };

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-darker via-dark to-darker"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Achievements & <span className="gradient-text">Recognition</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Celebrating milestones and competitive excellence</p>
        </motion.div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="glass rounded-2xl p-8 text-center glow-hover relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-10`}></div>
              <div className="relative z-10">
                <div className={`inline-block p-4 rounded-full bg-gradient-to-br ${highlight.color} mb-4`}>
                  <highlight.icon className="text-4xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{highlight.title}</h3>
                <p className="text-gray-300 mb-2">{highlight.event}</p>
                <p className="text-gray-400 text-sm mb-1">{highlight.location}</p>
                <p className="text-primary text-sm font-semibold">{highlight.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competition Record */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className="gradient-text">Inter-Collegiate Competition Record</span>
            <span className="text-gray-400 text-xl ml-3">(14 Events)</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {competitions.map((comp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }}
                className="glass p-4 rounded-xl glow-hover neon-border flex items-center justify-between group"
              >
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">{comp.event}</h4>
                  <p className="text-gray-400 text-sm">{comp.venue}</p>
                </div>
                <div className={`text-right ml-4 ${getPositionColor(comp.position)}`}>
                  <p className="font-bold text-lg whitespace-nowrap">{comp.position}</p>
                  {comp.position.includes("1st") && <span className="text-2xl">🥇</span>}
                  {comp.position.includes("2nd") && <span className="text-2xl">🥈</span>}
                  {comp.position.includes("3rd") && <span className="text-2xl">🥉</span>}
                  {comp.position.includes("Best") && <span className="text-2xl">🏆</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-16 glass p-8 rounded-2xl neon-border"
        >
          <h3 className="text-3xl font-bold mb-6 text-center gradient-text">Impact & Innovation</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { value: "1,000+", label: "Individuals Reached", gradient: "from-cyan to-blue-500" },
              { value: "20+", label: "Public Seminars", gradient: "from-purple-500 to-pink-500" },
              { value: "16+", label: "Cyber Warriors Mentored", gradient: "from-green-400 to-emerald-500" },
              { value: "4+", label: "Live Applications", gradient: "from-orange-400 to-red-500" },
              { value: "1", label: "Published Research Paper", gradient: "from-yellow-400 to-orange-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="text-center group"
              >
                <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-3 group-hover:scale-110 transition-transform`}>
                  <h4 className="text-4xl font-bold text-white">{stat.value}</h4>
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
