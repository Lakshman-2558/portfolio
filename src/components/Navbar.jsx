import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
  { name: 'About', to: 'about', color: '#FF6B6B', emoji: '👤' },
  { name: 'Skills', to: 'skills', color: '#2EC4B6', emoji: '🛠️' },
  { name: 'Projects', to: 'projects', color: '#F72585', emoji: '💻' },
  { name: 'Achievements', to: 'achievements', color: '#FF9F1C', emoji: '🏆' },
  { name: 'Contact', to: 'contact', color: '#4CC9F0', emoji: '✉️' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  return (
    <>
      {/* ── Floating Profile Icon (Top Right) ── */}
      <div style={{ position: 'fixed', top: 32, right: 32, zIndex: 100 }}>
        {/* Radial nav items — revealed on open */}
        <AnimatePresence>
          {isOpen && navLinks.map((link, i) => {
            // Bloom even more spread apart
            const totalLinks = navLinks.length;
            const startAngle = 100; // a bit more than 90 to push items into screen
            const endAngle = 185;   // push towards the left
            const angle = startAngle + (i * ((endAngle - startAngle) / (totalLinks - 1)));
            const rad = (angle * Math.PI) / 180;
            const radius = 145; // Increased radius for better spacing
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.2 }}
                animate={{ opacity: 1, x, y, scale: 1 }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0.2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25, delay: i * 0.05 }}
                style={{ position: 'absolute', top: 0, right: 0 }}
              >
                <Link
                  to={link.to}
                  smooth
                  offset={-80}
                  duration={800}
                  onClick={() => setIsOpen(false)}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <motion.div
                    whileHover="hover"
                    style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {/* The Icon Circle */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      style={{
                        width: 52, height: 52, borderRadius: '20px', // More modern rounded-rect
                        background: `linear-gradient(135deg,${link.color},${link.color}cc)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'white', fontSize: 22,
                        boxShadow: `0 8px 24px ${link.color}66`,
                        border: '2.5px solid white',
                        zIndex: 2,
                        position: 'relative'
                      }}
                    >
                      {link.emoji}
                    </motion.div>

                    {/* The Label - Slide out on hover or show by default */}
                    <motion.span
                      variants={{
                        hover: { opacity: 1, scale: 1, x: -85 },
                      }}
                      initial={{ opacity: 0, scale: 0.8, x: -60 }}
                      animate={{ opacity: 1, scale: 1, x: -85 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{
                        position: 'absolute',
                        padding: '6px 14px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 900,
                        color: link.color,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        border: `1.5px solid ${link.color}22`
                      }}
                    >
                      {link.name}
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Profile avatar button */}
        <motion.button
          onClick={() => setIsOpen(o => !o)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          animate={{ rotate: isOpen ? 360 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          style={{
            width: 60, height: 60, borderRadius: '50%', cursor: 'pointer',
            border: 'none', padding: 0, position: 'relative', display: 'block',
            boxShadow: isOpen
              ? '0 0 0 4px white, 0 0 0 7px #F72585, 0 12px 40px rgba(247,37,133,0.45)'
              : '0 0 0 4px white, 0 0 0 7px #FF6B6B, 0 8px 28px rgba(255,107,107,0.4)',
            transition: 'box-shadow 0.3s',
          }}
        >
          <img
            src="/profile.jpeg"
            alt="Lakshman Kaja"
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentNode.style.background = 'linear-gradient(135deg,#FF6B6B,#FF9F1C)';
              if (!e.target.parentNode.querySelector('.fallback-text')) {
                const span = document.createElement('span');
                span.className = 'fallback-text';
                span.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:20px;';
                span.innerText = 'LK';
                e.target.parentNode.appendChild(span);
              }
            }}
          />
          {/* Active green dot */}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute', bottom: 2, right: 2,
              width: 14, height: 14, borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid white',
              display: 'block',
            }}
          />
        </motion.button>
      </div>
    </>
  );
};

export default Navbar;
