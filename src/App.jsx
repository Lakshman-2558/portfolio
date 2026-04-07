import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Colorful loader
const Loader = ({ onDone }) => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setPct(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(onDone, 300); return 100; }
        return p + (p < 70 ? 3 : p < 92 ? 1.5 : 0.7);
      });
    }, 30);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <motion.div exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}
      style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#FFF9F0,#FFF0F8,#F0FBFF)' }}>
      {/* Animated blobs in loader */}
      {[
        { color: 'rgba(255,107,107,0.3)', size: 200, top: '10%', left: '10%' },
        { color: 'rgba(76,201,240,0.3)', size: 180, top: '60%', right: '10%' },
        { color: 'rgba(247,37,133,0.2)', size: 160, bottom: '10%', left: '20%' },
      ].map((b, i) => (
        <div key={i} style={{ position: 'absolute', width: b.size, height: b.size, borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%', background: b.color, filter: 'blur(40px)', top: b.top, left: b.left, right: b.right, bottom: b.bottom, animation: `blob ${6 + i}s ease-in-out ${i}s infinite` }} />
      ))}

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{ width: 80, height: 80, borderRadius: 24, background: 'linear-gradient(135deg,#FF6B6B,#FF9F1C,#FFD93D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 40px rgba(255,107,107,0.35)', fontSize: 30, fontWeight: 900, color: 'white' }}>
          LK
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: '#1a1a2e' }}>
            LAKSHMAN<span style={{ color: '#FF6B6B' }}>.</span>
          </h1>
          <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#aaa', letterSpacing: '1em', margin: '6px 0 0', paddingLeft: '1em' }}>PORTFOLIO</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ width: 200, height: 6, borderRadius: 99, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 99,
            width: `${pct}%`,
            background: 'linear-gradient(90deg,#FF6B6B,#FF9F1C,#FFD93D,#2EC4B6,#4CC9F0)',
            backgroundSize: '300% 100%',
            animation: 'gradient-x 2s ease infinite',
            transition: 'width 0.1s',
          }} />
        </motion.div>
        <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#bbb' }}>{Math.round(pct)}%</span>
      </div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [follower, setFollower] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const coords = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = (e) => {
      const targetEl = e.target.closest('a, button, [role="button"], .interactive');
      if (targetEl) setIsHovered(true);
    };
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mouseout', handleHoverEnd);

    const animate = () => {
      const ease = 0.15;
      coords.current.x += (target.current.x - coords.current.x) * ease;
      coords.current.y += (target.current.y - coords.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${coords.current.x}px, ${coords.current.y}px) scale(${isHovered ? 2.5 : isClicking ? 0.8 : 1})`;
        ringRef.current.style.borderColor = isHovered ? '#4CC9F0' : '#FF6B6B';
        ringRef.current.style.backgroundColor = isHovered ? 'rgba(76,201,240,0.1)' : 'transparent';
      }
      requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mouseout', handleHoverEnd);
      cancelAnimationFrame(animId);
    };
  }, [isHovered, isClicking]);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" style={{
        position: 'fixed', top: 0, left: 0, width: '8px', height: '8px',
        backgroundColor: '#F72585', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9999, transform: 'translate(-50%, -50%)', mixBlendMode: 'difference'
      }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{
        position: 'fixed', top: 0, left: 0, width: '40px', height: '40px',
        border: '2px solid #FF6B6B', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9998, transform: 'translate(-50%, -50%)',
        transition: 'border-color 0.3s, background-color 0.3s, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }} />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Toggle dark mode for specific sections (e.g., Skills, Achievements)
      const skillsSection = document.getElementById('skills');
      const achievementsSection = document.getElementById('achievements');

      let dark = false;
      if (skillsSection && achievementsSection) {
        const skillsTop = skillsSection.offsetTop - windowHeight / 2;
        const skillsBottom = skillsTop + skillsSection.offsetHeight;
        const achTop = achievementsSection.offsetTop - windowHeight / 2;
        const achBottom = achTop + achievementsSection.offsetHeight;

        if ((scrollY > skillsTop && scrollY < skillsBottom) || (scrollY > achTop && scrollY < achBottom)) {
          dark = true;
        }
      }

      if (dark) document.body.classList.add('dark');
      else document.body.classList.remove('dark');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } }
  };

  return (
    <div style={{ position: 'relative' }}>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ duration: 0.7 }}>
        <Navbar />
        <main>
          <Hero />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
            <About />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
            <Skills />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
            <Projects />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
            <Achievements />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
            <Contact />
          </motion.div>
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
