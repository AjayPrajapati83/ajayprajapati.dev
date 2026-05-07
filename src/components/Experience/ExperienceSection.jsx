import TimelineLog from './TimelineLog'
import ResearchCards from './ResearchCards'

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header">access_log</div>
        <h2 className="section-title">Experience & Research</h2>

        <TimelineLog />
        
        <div style={{ marginTop: '2rem' }}>
          <div className="section-header" style={{ marginTop: '3rem' }}>published_research</div>
          <h3 style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            Research Papers
          </h3>
          <ResearchCards />
        </div>
      </div>
    </section>
  )
}
