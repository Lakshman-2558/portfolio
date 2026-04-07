import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Send, MessageSquare, ArrowUpRight } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';

const socials = [
  { label: 'GitHub',   href: personalDetails.socials.github,            Icon: GithubIcon,   from: '#333',    to: '#555',    bg: '#f5f5f5' },
  { label: 'LinkedIn', href: personalDetails.socials.linkedin,           Icon: LinkedinIcon, from: '#0077b5', to: '#00A0DC', bg: '#e8f4fd' },
  { label: 'Email',    href: `mailto:${personalDetails.socials.email}`,  Icon: Mail,         from: '#FF6B6B', to: '#FF9F1C', bg: '#fff5f0' },
];

const inputStyle = {
  width: '100%', background: '#fafafa', border: '2px solid #eee',
  borderRadius: 14, padding: '14px 16px', fontSize: 14, color: '#333',
  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [sent, setSent] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 3000);
  };

  const dynamicInputStyle = {
    width: '100%', 
    background: 'var(--color-bg)', 
    border: '2.5px solid rgba(0,0,0,0.05)',
    borderRadius: 16, 
    padding: '16px 20px', 
    fontSize: 15, 
    color: 'var(--color-text)',
    outline: 'none', 
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxSizing: 'border-box',
  };

  return (
    <section id="contact" style={{ background: 'var(--color-bg)', padding: '100px 0', position: 'relative', overflow: 'hidden', transition: 'background-color 0.8s' }}>
      {/* BG blobs */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(76,201,240,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(247,37,133,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="section-wrap">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 80, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="section-label" style={{ color: '#F72585' }}>
            <span style={{ width: 32, height: 3, background: 'linear-gradient(90deg,#F72585,#4CC9F0)', borderRadius: 99, display: 'inline-block' }} />
            05 — Contact
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ fontSize: 'clamp(32px,6vw,56px)', fontWeight: 900, margin: 0, color: 'var(--color-text)' }}>
            Let's <span className="text-grad-pink">Connect! 🚀</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--color-text)', opacity: 0.6, maxWidth: 450, fontSize: 16, margin: 0 }}>
            Have an opportunity, project idea, or just want to say hello? I'd love to hear from you!
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 48, maxWidth: 1100, margin: '0 auto', alignItems: 'start' }}>
          {/* Left — socials */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h3 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: 'var(--color-text)' }}>Digital Footprints</h3>
            {socials.map(({ label, href, Icon, from, to, bg }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ x: 12, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 20, 
                  padding: '24px', borderRadius: 24, 
                  background: 'var(--color-card)', 
                  textDecoration: 'none', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
                  border: '2px solid rgba(0,0,0,0.03)', 
                  transition: 'all 0.4s' 
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${from}66`; e.currentTarget.style.boxShadow = `0 15px 40px ${from}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.03)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 18, background: `linear-gradient(135deg,${from},${to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${from}44` }}>
                  <Icon className="w-6 h-6" style={{ color: 'white' }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 900, fontSize: 18, color: 'var(--color-text)' }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text)', opacity: 0.5, fontFamily: 'monospace' }}>
                    {label === 'Email' ? personalDetails.socials.email : '@lakshman-kaja'}
                  </p>
                </div>
                <ArrowUpRight size={20} style={{ marginLeft: 'auto', color: from }} />
              </motion.a>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div style={{ background: 'var(--color-card)', borderRadius: 32, padding: 40, boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '2.5px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg,#F72585,#7209B7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(247,37,133,0.3)' }}>
                  <MessageSquare size={20} color="white" />
                </div>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: 'var(--color-text)' }}>Drop a message</h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                  <div>
                    <input {...register('name', { required: true })} placeholder="Your Name" style={dynamicInputStyle}
                      onFocus={e => Object.assign(e.target.style, { borderColor: '#F72585', boxShadow: '0 0 0 5px rgba(247,37,133,0.15)', transform: 'translateY(-2px)' })}
                      onBlur={e => Object.assign(e.target.style, { borderColor: 'rgba(0,0,0,0.05)', boxShadow: 'none', transform: 'translateY(0)' })} />
                    {errors.name && <p style={{ color: '#FF6B6B', fontSize: 12, marginTop: 6, fontWeight: 600 }}>Name is required</p>}
                  </div>
                  <div>
                    <input {...register('email', { required: true })} placeholder="Email Address" type="email" style={dynamicInputStyle}
                      onFocus={e => Object.assign(e.target.style, { borderColor: '#4CC9F0', boxShadow: '0 0 0 5px rgba(76,201,240,0.15)', transform: 'translateY(-2px)' })}
                      onBlur={e => Object.assign(e.target.style, { borderColor: 'rgba(0,0,0,0.05)', boxShadow: 'none', transform: 'translateY(0)' })} />
                    {errors.email && <p style={{ color: '#FF6B6B', fontSize: 12, marginTop: 6, fontWeight: 600 }}>Email is required</p>}
                  </div>
                </div>
                <input {...register('subject')} placeholder="What's this about?" style={dynamicInputStyle}
                  onFocus={e => Object.assign(e.target.style, { borderColor: '#FF9F1C', boxShadow: '0 0 0 5px rgba(255,159,28,0.15)', transform: 'translateY(-2px)' })}
                  onBlur={e => Object.assign(e.target.style, { borderColor: 'rgba(0,0,0,0.05)', boxShadow: 'none', transform: 'translateY(0)' })} />
                <div>
                  <textarea {...register('message', { required: true })} rows={5} placeholder="Tell me about your project or opportunity..." style={{ ...dynamicInputStyle, resize: 'none' }}
                    onFocus={e => Object.assign(e.target.style, { borderColor: '#2EC4B6', boxShadow: '0 0 0 5px rgba(46,196,182,0.15)', transform: 'translateY(-2px)' })}
                    onBlur={e => Object.assign(e.target.style, { borderColor: 'rgba(0,0,0,0.05)', boxShadow: 'none', transform: 'translateY(0)' })} />
                  {errors.message && <p style={{ color: '#FF6B6B', fontSize: 12, marginTop: 6, fontWeight: 600 }}>Message is required</p>}
                </div>
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.03, boxShadow: '0 15px 35px rgba(255,107,107,0.5)' }} 
                  whileTap={{ scale: 0.97 }}
                  className="btn-coral" 
                  style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '18px', borderRadius: 18, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#FF6B6B,#FF9F1C)', color: 'white', fontWeight: 900 }}>
                  {sent ? '✅ MESSAGE SENT SUCCESSFULLY' : <><Send size={18} /> SEND MESSAGE</>}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
