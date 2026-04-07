import { motion } from 'framer-motion';
import { personalDetails } from '../data/portfolioData';
import { GraduationCap, Trophy, Zap, MapPin } from 'lucide-react';

const stats = [
  { label: 'CGPA', value: '8.2', icon: GraduationCap, color: '#FF6B6B', bg: '#FFF0F0' },
  { label: 'DSA Solved', value: '150+', icon: Trophy, color: '#FF9F1C', bg: '#FFF8EE' },
  { label: 'Projects', value: '3+', icon: Zap, color: '#2EC4B6', bg: '#F0FDFB' },
];

const About = () => (
  <section id="about" style={{ background: 'var(--color-bg)', position: 'relative', overflow: 'hidden', padding: '100px 0', transition: 'background-color 0.8s' }}>
    {/* Decorative corner blobs */}
    <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(76,201,240,0.12)', filter: 'blur(40px)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: -80, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,107,107,0.1)', filter: 'blur(50px)', pointerEvents: 'none' }} />

    <div className="section-wrap">
      {/* Label */}
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        className="section-label" style={{ color: '#FF6B6B', marginBottom: 24 }}>
        <span style={{ width: 32, height: 3, background: 'linear-gradient(90deg,#FF6B6B,#FF9F1C)', borderRadius: 99, display: 'inline-block' }} />
        01 — About Me
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 60, alignItems: 'center' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }} 
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }} 
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, lineHeight: 1.2, margin: 0, color: 'var(--color-text)' }}>
            Crafting Digital<br /><span className="text-grad-coral">Experiences</span><br />with Passion
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ color: 'var(--color-text)', opacity: 0.8, lineHeight: 1.8, fontSize: 16 }}>
            I'm <strong style={{ color: 'var(--color-text)' }}>{personalDetails.name}</strong>, a passionate Computer Science student and Full-Stack Developer. I love building scalable web applications and solving complex algorithmic challenges.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text)', opacity: 0.6, fontSize: 14 }}>
            <MapPin size={16} color="#2EC4B6" />
            <span>Vignan's Foundation for Science, Technology & Research — 3rd Year B.Tech CSE</span>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {stats.map(({ label, value, icon: Icon, color, bg }) => (
              <motion.div 
                key={label} 
                whileHover={{ rotate: -10, scale: 0.9 }} // "Turn shrink" effect
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                style={{ background: bg, borderRadius: 20, padding: '16px 12px', textAlign: 'center', border: `1.5px solid ${color}44`, cursor: 'pointer' }}>
                <Icon size={20} color={color} style={{ marginBottom: 8 }} />
                <p style={{ fontSize: 24, fontWeight: 900, color: '#1a1a2e', margin: 0 }}>{value}</p>
                <p style={{ fontSize: 11, color: '#666', margin: 0, fontFamily: 'monospace' }}>{label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Availability badge */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(46,196,182,0.1)', border: '1.5px solid rgba(46,196,182,0.4)', borderRadius: 50, padding: '10px 20px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2EC4B6', display: 'inline-block' }} className="animate-pulse" />
            <span style={{ fontSize: 13, color: '#2EC4B6', fontWeight: 600 }}>Actively seeking Summer 2025 Internships</span>
          </motion.div>
        </div>

        {/* Right — card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }} 
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, type: 'spring' }}
          whileHover={{ scale: 1.05 }} // "Bigger" effect
        >
          <div style={{ position: 'relative', perspective: 1000 }}>
            {/* Background card */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: 28, background: 'linear-gradient(135deg,#FF6B6B,#FF9F1C,#FFD93D)', transform: 'rotate(4deg)', opacity: 0.2 }} />
            {/* Main card */}
            <div className="card-white" style={{ padding: 32, position: 'relative', border: '1.5px solid rgba(255,107,107,0.2)', background: 'var(--color-card)' }}>
              {/* Terminal header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                {['#FF6B6B', '#FFD93D', '#2EC4B6'].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
                <span style={{ fontSize: 12, color: '#bbb', fontFamily: 'monospace', marginLeft: 8 }}>about.json</span>
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 13, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['name', `"${personalDetails.name}"`, '#FF6B6B'],
                  ['role', '"Full-Stack Developer"', '#FF9F1C'],
                  ['education', '"B.Tech CSE, 3rd Year"', '#2EC4B6'],
                  ['cgpa', `"${personalDetails.cgpa}/10"`, '#FFD93D'],
                  ['stack', '"MERN Stack"', '#F72585'],
                  ['status', '"Open to Opportunities"', '#4CC9F0'],
                ].map(([k, v, c]) => (
                  <div key={k} style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: c, fontWeight: 700 }}>"{k}"</span>
                    <span style={{ color: '#bbb' }}>:</span>
                    <span style={{ color: 'var(--color-text)', opacity: 0.9 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badge */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              style={{ position: 'absolute', top: -20, right: -16, background: 'linear-gradient(135deg,#FFD93D,#FF9F1C)', borderRadius: 14, padding: '8px 14px', fontSize: 13, fontWeight: 800, color: 'white', boxShadow: '0 8px 20px rgba(255,159,28,0.4)', zIndex: 5 }}>
              🎓 CGPA {personalDetails.cgpa}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
