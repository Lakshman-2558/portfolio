import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data/portfolioData';
import { Trophy, Code, Star } from 'lucide-react';

const cardData = [
  { icon: Trophy, from: '#FFD93D', to: '#FF9F1C', bg: '#FFFBEE', iconBg: '#FFF3CC', label: 'Hackathon Win' },
  { icon: Code,   from: '#4CC9F0', to: '#2EC4B6', bg: '#F0FBFF', iconBg: '#D0F5FF', label: 'DSA Champion' },
];

const Achievements = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" style={{ background: 'var(--color-bg)', padding: '100px 0', position: 'relative', overflow: 'hidden', transition: 'background-color 0.8s' }}>
      <div className="section-wrap" ref={ref}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 80, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="section-label" style={{ color: '#FF9F1C' }}>
            <span style={{ width: 32, height: 3, background: 'linear-gradient(90deg,#FFD93D,#FF9F1C)', borderRadius: 99, display: 'inline-block' }} />
            04 — Achievements
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.7 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            style={{ fontSize: 'clamp(32px,6vw,56px)', fontWeight: 900, margin: 0, color: 'var(--color-text)' }}>
            Milestones & <span className="text-grad-yellow">Wins 🏆</span>
          </motion.h2>
        </div>

        {/* Achievement Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 32, maxWidth: 1000, margin: '0 auto' }}>
          {achievements.map((a, idx) => {
            const card = cardData[idx] || cardData[0];
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5, rotateY: idx === 0 ? 45 : -45 }}
                animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.2, type: 'spring' }}
                whileHover={{ y: -15, scale: 1.05 }}
                style={{
                  background: 'var(--color-card)',
                  borderRadius: 32,
                  padding: 40,
                  border: `2.5px solid ${card.from}44`,
                  boxShadow: `0 10px 30px ${card.from}11`,
                  cursor: 'default',
                  transition: 'box-shadow 0.4s, background-color 0.4s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* BG accent */}
                <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: `linear-gradient(135deg,${card.from},${card.to})`, opacity: 0.15, filter: 'blur(30px)' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 20,
                    background: `linear-gradient(135deg,${card.from},${card.to})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 12px 24px ${card.from}55`,
                  }}>
                    <Icon size={30} color="white" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.12em', color: card.from, background: `${card.from}15`, padding: '4px 12px', borderRadius: 50, width: 'fit-content' }}>{card.label}</span>
                    <h3 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: 'var(--color-text)', lineHeight: 1.2 }}>{a.title}</h3>
                    <p style={{ margin: 0, fontSize: 16, color: 'var(--color-text)', opacity: 0.7, lineHeight: 1.6 }}>{a.details}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', marginTop: 80 }}
        >
          {[
            { val: '150+', label: 'DSA Problems', color: '#4CC9F0' },
            { val: '3+', label: 'Projects Built', color: '#F72585' },
            { val: '1st', label: 'Hackathon Prize', color: '#FFD93D' },
            { val: '8.2', label: 'CGPA', color: '#2EC4B6' },
          ].map(({ val, label, color }) => (
            <motion.div 
              key={label} 
              whileHover={{ rotate: 10, scale: 0.9 }} // "Turn shrink" effect
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                background: 'var(--color-card)',
                borderRadius: 24,
                padding: '24px 32px',
                textAlign: 'center',
                boxShadow: `0 8px 24px ${color}15`,
                border: `2px solid ${color}33`,
                minWidth: 160,
                cursor: 'pointer',
              }}>
              <p style={{ margin: 0, fontSize: 36, fontWeight: 900, color, lineHeight: 1 }}>{val}</p>
              <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--color-text)', opacity: 0.6, fontFamily: 'monospace', fontWeight: 600 }}>{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
