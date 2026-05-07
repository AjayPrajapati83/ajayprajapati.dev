import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import ProjectFilter from './ProjectFilter'
import { projects, projectCategories } from '../../data/projects'

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects
    return projects.filter(p => p.category.includes(activeFilter))
  }, [activeFilter])

  return (
    <section id="projects" className="section">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header">threat_intelligence_reports</div>
        <h2 className="section-title">Projects</h2>

        <ProjectFilter
          categories={projectCategories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}>
            {'[>] No projects found for classification: '}{activeFilter}
          </div>
        )}
      </div>
    </section>
  )
}
