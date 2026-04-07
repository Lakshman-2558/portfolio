import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <section id="hero" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #FFF9F0 0%, #FFF0F8 40%, #F0FBFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Blobs */}
      <Blob color="rgba(255,107,107,0.5)" size={400} top="-80px" left="-80px" />
      <Blob color="rgba(76,201,240,0.4)" size={350} top="60%" left="70%" delay={2} />
      <Blob color="rgba(247,37,133,0.3)" size={300} top="50%" left="-60px" delay={4} />
      <Blob color="rgba(255,217,61,0.4)" size={280} top="10%" left="65%" delay={1} />
      <Blob color="rgba(46,196,182,0.3)" size={320} top="70%" left="40%" delay={3} />

      {/* Floating shapes */}
      {[
        { size: 60, top: '20%', left: '18%', color: '#FF6B6B', delay: 0 },
        { size: 40, top: '70%', left: '80%', color: '#2EC4B6', delay: 1 },
        { size: 50, top: '40%', left: '88%', color: '#FFD93D', delay: 2 },
        { size: 35, top: '80%', left: '20%', color: '#F72585', delay: 0.5 },
      ].map((s, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', width: s.size, height: s.size, borderRadius: '50%', background: s.color, opacity: 0.15, top: s.top, left: s.left }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Content */}
      <div className="section-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 48, alignItems: 'center', paddingTop: 80, position: 'relative', zIndex: 10 }}>
        {/* LEFT — text column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Name */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
            <h1 style={{ fontSize: 'clamp(52px,10vw,96px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-2px', margin: 0 }}>
              <span style={{ color: '#1a1a2e' }}>Lakshman</span>
              <br />
              <span className="text-grad-coral">Kaja</span>
            </h1>
          </motion.div>

          {/* Typing */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 400, color: '#666' }}>
              {typed}
              <span style={{ borderLeft: '3px solid #F72585', marginLeft: 2, animation: 'pulse 1s infinite' }}>&nbsp;</span>
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ maxWidth: 520, color: '#777', fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            {personalDetails.objective}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="projects" smooth offset={-80} duration={600}>
              <button className="btn-coral">View Projects <ArrowRight size={16} /></button>
            </Link>
            <button className="btn-outline-pink"><Download size={16} /> Download Resume</button>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {[
              { href: personalDetails.socials.github, Icon: GithubIcon, color: '#333' },
              { href: personalDetails.socials.linkedin, Icon: LinkedinIcon, color: '#0077b5' },
            ].map(({ href, Icon, color }, i) => (
              <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 5 }}
                style={{ width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', color }}>
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

        </div>{/* end left column */}

        {/* RIGHT — profile photo */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Rotating gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: -8, borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #FF6B6B, #FF9F1C, #FFD93D, #2EC4B6, #4CC9F0, #F72585, #FF6B6B)',
                filter: 'blur(4px)',
              }}
            />
            {/* White ring */}
            <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'white' }} />
            {/* Profile image */}
            <img
              src="/profile.jpeg"
              alt="Lakshman Kaja"
              style={{
                width: 280, height: 280, borderRadius: '50%',
                objectFit: 'cover', display: 'block', position: 'relative', zIndex: 2,
              }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentNode.style.background = 'linear-gradient(135deg,#FF6B6B,#FF9F1C)';
              }}
            />

          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.18em', color: '#aaa', fontFamily: 'monospace' }}>SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <ChevronDown size={16} color="#ccc" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
