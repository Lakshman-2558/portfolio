import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer = () => (
  <footer style={{ background: 'var(--color-bg)', borderTop: '1px solid rgba(0,0,0,0.05)', transition: 'background-color 0.8s' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'default' }}>
        <div style={{ background: 'linear-gradient(135deg,#FF6B6B,#FF9F1C)', width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 13, boxShadow: '0 4px 12px rgba(255,107,107,0.3)' }}>LK</div>
        <span style={{ fontSize: 16, fontWeight: 900, color: 'var(--color-text)' }}>Lakshman<span style={{ color: '#FF6B6B' }}>.</span>Kaja</span>
      </motion.div>

      <p style={{ fontSize: 14, color: 'var(--color-text)', opacity: 0.6, display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
        Designed & Built with <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}><Heart size={14} fill="#FF6B6B" color="#FF6B6B" /></motion.span> by Lakshman Kaja · {new Date().getFullYear()}
      </p>

      <Link to="hero" smooth duration={800} style={{ textDecoration: 'none' }}>
        <motion.button 
          whileHover={{ scale: 1.15, y: -5 }} 
          whileTap={{ scale: 0.9 }}
          title="Back to Top"
          style={{ width: 40, height: 40, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#FF6B6B,#FF9F1C)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 6px 16px rgba(255,107,107,0.4)', transition: 'box-shadow 0.3s' }}>
          <ArrowUp size={18} />
        </motion.button>
      </Link>
    </div>
  </footer>
);

export default Footer;
