import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate } from 'animejs';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import { personalDetails } from '../data/portfolioData';

const ROLES = ['Full-Stack Developer', 'Problem Solver', 'Python stack '];

const useTyping = (words, speed = 80, pause = 1800) => {
  const [text, setText] = useState('');
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[wi];
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, text.length + 1));
        if (text.length === cur.length) setTimeout(() => setDel(true), pause);
      } else {
        setText(cur.slice(0, text.length - 1));
        if (text.length === 0) { setDel(false); setWi(i => (i + 1) % words.length); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, wi, words, speed, pause]);
  return text;
};

// Floating blob
const Blob = ({ color, size, top, left, delay = 0 }) => (
  <motion.div
    className="absolute blob opacity-40 pointer-events-none"
    style={{ background: color, width: size, height: size, top, left, filter: 'blur(60px)' }}
    animate={{ borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'] }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const Hero = () => {
  const typed = useTyping(ROLES);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const profileRef = useRef(null);

  useEffect(() => {
    if (profileRef.current) {
      const animateProfile = (manual = false) => {
        animate(profileRef.current, {
          rotateY: '+=360',
          duration: manual ? 1200 : 2000,
          ease: 'inOutQuart',
          scale: [
            { to: 1.1, duration: manual ? 600 : 1000, ease: 'outQuad' },
            { to: 1, duration: manual ? 600 : 1000, ease: 'inQuad' }
          ],
          onComplete: () => {
            if (!manual) setTimeout(() => animateProfile(), 5000);
          }
        });
      };
      
      const handleMouseEnter = () => {
        animateProfile(true);
      };

      const el = profileRef.current.parentElement;
      if (el) el.addEventListener('mouseenter', handleMouseEnter);
      
      const initialTimeout = setTimeout(() => animateProfile(), 1000);

      return () => {
        clearTimeout(initialTimeout);
        if (el) el.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" style={{ minHeight: isMobile ? 'auto' : '100vh', padding: isMobile ? '80px 0 60px' : '0', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #FFF9F0 0%, #FFF0F8 40%, #F0FBFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Blobs */}
      <Blob color="rgba(255,107,107,0.5)" size={isMobile ? 250 : 400} top="-80px" left="-80px" />
      <Blob color="rgba(76,201,240,0.4)" size={isMobile ? 200 : 350} top="60%" left="70%" delay={2} />
      <Blob color="rgba(247,37,133,0.3)" size={isMobile ? 180 : 300} top="50%" left="-60px" delay={4} />

      {/* Content */}
      <div className="section-wrap" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: isMobile ? 40 : 80,
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        textAlign: isMobile ? 'center' : 'left'
      }}>

        {/* RIGHT — profile photo (order 1 on mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', order: isMobile ? 1 : 2 }}
        >
          <div style={{ position: 'relative', display: 'inline-block', perspective: '1000px' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: isMobile ? -8 : -12, borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #FF6B6B, #FF9F1C, #FFD93D, #2EC4B6, #4CC9F0, #F72585, #FF6B6B)',
                filter: 'blur(6px)', opacity: 0.8
              }}
            />
            <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', background: 'var(--color-bg)' }} />
            <div ref={profileRef} style={{ position: 'relative', zIndex: 2, transformStyle: 'preserve-3d' }}>
              <img
                src="/profile.jpeg"
                alt="Lakshman Kaja"
                style={{
                  width: isMobile ? '220px' : 'min(380px, 35vw)',
                  height: isMobile ? '220px' : 'min(380px, 35vw)',
                  borderRadius: '50%',
                  objectFit: 'cover', display: 'block',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                  border: '4px solid white'
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* LEFT — text column (order 2 on mobile) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          order: isMobile ? 2 : 1,
          alignItems: isMobile ? 'center' : 'flex-start'
        }}>

          {/* Name */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
            <h1 style={{
              fontSize: 'clamp(44px, 10vw, 84px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-2.5px',
              margin: 0,
              color: '#1a1a2e'
            }}>
              Lakshman<br />
              <span className="text-grad-coral">Kaja</span>
            </h1>
          </motion.div>

          {/* Typing */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ height: isMobile ? 32 : 44, display: 'flex', alignItems: 'center' }}>
            <p style={{ fontSize: 'clamp(18px, 5vw, 26px)', fontWeight: 600, color: '#1a1a2e', opacity: 0.9 }}>
              {typed}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ borderLeft: '3.5px solid #F72585', marginLeft: 4 }}>&nbsp;</motion.span>
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{
              maxWidth: 550,
              color: '#334155',
              fontWeight: 500,
              fontSize: isMobile ? '16px' : '19px',
              lineHeight: 1.8,
              margin: 0,
              textAlign: isMobile ? 'center' : 'left',
              textShadow: '0 1px 2px rgba(255,255,255,0.8)'
            }}>
            I'm a passionate developer building <strong style={{ color: '#F72585' }}>elegant solutions</strong> through clean code and modern architecture. Specializing in high-performance web experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start', width: '100%' }}>
            <Link to="projects" smooth offset={-80} duration={600}>
              <button className="btn-coral" style={{ padding: '16px 36px', fontSize: 15 }}>View Projects <ArrowRight size={18} /></button>
            </Link>
            <button className="btn-outline-pink" style={{ padding: '16px 36px', fontSize: 15 }}><Download size={18} /> Resume</button>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {[
              { href: personalDetails.socials.github, Icon: GithubIcon, color: '#333' },
              { href: personalDetails.socials.linkedin, Icon: LinkedinIcon, color: '#0077b5' },
            ].map(({ href, Icon, color }, i) => (
              <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 8 }}
                style={{
                  width: 52, height: 52, borderRadius: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'white', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', color,
                  border: '1.5px solid #f0f0f0'
                }}>
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

        </div>{/* end column */}

        {/* Scroll cue (desktop only) */}
        {!isMobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            style={{
              position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
            }}>
            <span style={{ fontSize: 10, letterSpacing: '0.4em', color: '#64748b', fontWeight: 900 }}>SCROLL</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown size={22} color="#F72585" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
