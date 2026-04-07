import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';

const ScrollingRow = ({ items, direction = 1, speed = 40 }) => {
  return (
    <div 
      className="scrolling-container"
      style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '15px 0', userSelect: 'none' }}
    >
      <motion.div
        animate={{ x: direction > 0 ? [-2000, 0] : [0, -2000] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        style={{ display: 'inline-flex', gap: 20 }}
      >
        {[...items, ...items, ...items, ...items, ...items, ...items].map((skill, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1, y: -5, boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}
            style={{
              padding: '14px 32px',
              background: 'var(--color-card)',
              borderRadius: 20,
              border: '2px solid rgba(0,0,0,0.04)',
              color: 'var(--color-text)',
              fontSize: 16,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(45deg, #F72585, #4CC9F0)' }} />
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const frontend = skills.find(s => s.category === "Frontend")?.items || [];
  const backend = skills.find(s => s.category === "Backend")?.items || [];
  const languages = skills.find(s => s.category === "Languages")?.items || [];
  const tools = skills.find(s => s.category === "Tools & Concepts")?.items || [];
  const db = skills.find(s => s.category === "Databases")?.items || [];

  return (
    <section id="skills" style={{ background: 'var(--color-bg)', padding: '120px 0', transition: 'background-color 0.8s', overflow: 'hidden' }}>
      <div className="section-wrap">
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 80, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="section-label" style={{ color: '#4CC9F0' }}>
            <span style={{ width: 32, height: 3, background: 'linear-gradient(90deg,#4CC9F0,#2EC4B6)', borderRadius: 99, display: 'inline-block' }} />
            02 — Tech Stack
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(32px,6vw,56px)', fontWeight: 900, margin: 0, color: 'var(--color-text)' }}>
            Tools of the <span className="text-grad-teal">Master 🛠️</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ color: 'var(--color-text)', opacity: 0.6, maxWidth: 500, fontSize: 17, margin: 0 }}>
            A comprehensive showcase of technologies I've mastered across the stack.
          </motion.p>
        </div>

        {/* Scrolling Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
          {/* Row 1 */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 style={{ fontSize: 13, fontWeight: 900, opacity: 0.5, color: 'var(--color-text)', marginBottom: 20, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Frontend & Visuals</h3>
            <ScrollingRow items={frontend} speed={35} direction={1} />
          </motion.div>

          {/* Row 2 */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 style={{ fontSize: 13, fontWeight: 900, opacity: 0.5, color: 'var(--color-text)', marginBottom: 20, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Logic & Backend</h3>
            <ScrollingRow items={[...backend, ...languages]} speed={45} direction={-1} />
          </motion.div>

          {/* Row 3 */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 style={{ fontSize: 13, fontWeight: 900, opacity: 0.5, color: 'var(--color-text)', marginBottom: 20, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Data & Infrastructure</h3>
            <ScrollingRow items={[...tools, ...db]} speed={40} direction={1} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
