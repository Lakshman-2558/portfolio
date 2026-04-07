import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, personalDetails } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import GithubIcon from './icons/GithubIcon';

const cardThemes = [
  { from: '#FF6B6B', to: '#FF9F1C', light: '#FFF5F0' },
  { from: '#F72585', to: '#7209B7', light: '#FFF0F8' },
  { from: '#2EC4B6', to: '#4CC9F0', light: '#F0FBFF' },
];

const techColors = {
  'Node.js': { bg: '#f0fdf4', color: '#16a34a', border: '#86efac' },
  React:     { bg: '#eff6ff', color: '#2563eb', border: '#93c5fd' },
  MongoDB:   { bg: '#f0fdf4', color: '#15803d', border: '#4ade80' },
  Express:   { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  'MERN Stack': { bg: '#faf5ff', color: '#7c3aed', border: '#c4b5fd' },
  Flask:     { bg: '#fefce8', color: '#a16207', border: '#fde047' },
};

const Projects = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" style={{ background: 'var(--color-bg)', padding: '100px 0', transition: 'background-color 0.8s' }}>
      <div className="section-wrap">
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 80 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="section-label" style={{ color: '#F72585' }}>
            <span style={{ width: 32, height: 3, background: 'linear-gradient(90deg,#F72585,#FF6B6B)', borderRadius: 99, display: 'inline-block' }} />
            03 — Projects
          </motion.div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              style={{ fontSize: 'clamp(32px,6vw,56px)', fontWeight: 900, margin: 0, color: 'var(--color-text)' }}>
              Things I've <span className="text-grad-pink">Built</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              style={{ color: 'var(--color-text)', opacity: 0.6, maxWidth: 350, fontSize: 16, margin: 0 }}>
              Real-world apps with modern architecture and clean code, built with precision.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(350px,1fr))', gap: 32 }}>
          {projects.map((project, idx) => {
            const theme = cardThemes[idx % cardThemes.length];
            const isHovered = hovered === project.id;
            return (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                initial={{ opacity: 0, scale: 0.9, rotate: idx % 2 === 0 ? 2 : -2 }} 
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: 32,
                  overflow: 'hidden',
                  boxShadow: isHovered
                    ? `0 25px 50px ${theme.from}30`
                    : '0 10px 30px rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.4s, transform 0.4s, background-color 0.4s',
                  transform: isHovered ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
                  background: 'var(--color-card)',
                  border: `2px solid ${isHovered ? theme.from + '66' : 'rgba(0,0,0,0.05)'}`,
                  cursor: 'pointer',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                  <img src={project.image} alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)', transform: isHovered ? 'scale(1.15)' : 'scale(1)' }} />
                  {/* Overlay on hover */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(135deg,${theme.from}EE,${theme.to}EE)`,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: 'white', fontWeight: 900, fontSize: 18, letterSpacing: '0.05em' }}>EXPLORE PROJECT</span>
                  </div>
                  {/* Number badge */}
                  <div style={{
                    position: 'absolute', top: 20, left: 20,
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 12, padding: '6px 16px',
                    fontSize: 12, fontWeight: 900, color: theme.from, fontFamily: 'monospace',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}>
                    0{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: 'var(--color-text)' }}>{project.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, color: 'var(--color-text)', opacity: 0.7, lineHeight: 1.7 }}>{project.description}</p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '8px 0' }}>
                    {project.tech.map(t => {
                      const tc = techColors[t] || { bg: 'rgba(0,0,0,0.05)', color: 'var(--color-text)', border: 'rgba(0,0,0,0.1)' };
                      return (
                        <span key={t} style={{
                          background: tc.bg, color: tc.color,
                          border: `1.5px solid ${tc.border}`,
                          borderRadius: 50, padding: '4px 14px',
                          fontSize: 12, fontWeight: 700,
                        }}>
                          {t}
                        </span>
                      );
                    })}
                  </div>

                  {/* Links */}
                  <div style={{ display: 'flex', gap: 20, paddingTop: 20, marginTop: 4, borderTop: '1.5px solid rgba(0,0,0,0.05)' }}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      id={`project-code-${project.id}`}
                      onClick={e => e.stopPropagation()}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 800, color: 'var(--color-text)', opacity: 0.8, textDecoration: 'none', transition: 'all 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = theme.from; e.currentTarget.style.opacity = '1'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text)'; e.currentTarget.style.opacity = '0.8'; }}
                    >
                      <GithubIcon className="w-5 h-5" /> Codebase
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      id={`project-live-${project.id}`}
                      onClick={e => e.stopPropagation()}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 800, color: theme.from, textDecoration: 'none', transition: 'transform 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                      Live Preview <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
          <a href={personalDetails?.socials?.github || '#'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="btn-outline-pink" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <GithubIcon className="w-4 h-4" /> View All Projects on GitHub
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
