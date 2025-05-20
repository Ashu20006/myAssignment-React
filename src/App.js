import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import './App.css'; // We'll create this CSS file for animations

// Glassmorphism effect styles
const glassCard = {
  background: 'rgba(18, 18, 18, 0.7)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 255, 149, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(0, 255, 149, 0.1)'
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  padding: '1rem',
  backgroundColor: 'rgba(18, 18, 18, 0.9)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backdropFilter: 'blur(10px)'
};

const activeNavLink = {
  color: '#00ff95',
  borderBottom: '2px solid #00ff95',
};

const navLinkStyle = {
  color: '#ccc',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
  paddingBottom: '0.2rem',
  transition: 'all 0.3s ease',
};

const containerStyle = {
  maxWidth: '1100px',
  margin: '3rem auto 5rem',
  padding: '0 1rem',
  fontFamily: "'Inter', sans-serif",
  color: '#f1f1f1',
  lineHeight: '1.6',
};

const headingStyle = {
  fontSize: 'clamp(2rem, 5vw, 2.8rem)',
  marginBottom: '1rem',
  fontWeight: '700',
  color: '#00ff95',
  letterSpacing: '1px',
  background: 'linear-gradient(90deg, #00ff95, #00ccff)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

const subHeadingStyle = {
  fontSize: 'clamp(1rem, 3vw, 1.3rem)',
  marginBottom: '3rem',
  color: '#8fc1a9',
};

const buttonStyle = {
  backgroundColor: '#00ff95',
  color: '#121212',
  border: 'none',
  padding: '0.8rem 1.6rem',
  fontSize: '1.1rem',
  fontWeight: '700',
  borderRadius: '30px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0, 255, 149, 0.3)',
};

const footerStyle = {
  textAlign: 'center',
  padding: '2rem 1rem',
  backgroundColor: '#121212',
  color: '#666',
  fontSize: '0.9rem',
};

const projects = [
  {
    title: 'Creative Portfolio Website',
    description: 'A modern portfolio website focused on clean design and smooth animations.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    link: '#',
  },
  {
    title: 'E-commerce Platform',
    description: 'An e-commerce platform with a focus on seamless user experience and performance.',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80',
    link: '#',
  },
  {
    title: 'Blog Website',
    description: 'A minimalist blog site with easy navigation and responsive design.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    link: '#',
  },
];

// Animated NavLink component
const AnimatedNavLink = ({ to, children }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <NavLink
        to={to}
        style={({ isActive }) =>
          isActive ? { ...navLinkStyle, ...activeNavLink } : navLinkStyle
        }
      >
        {children}
      </NavLink>
    </motion.div>
  );
};

function Navbar() {
  return (
    <motion.nav 
      style={navStyle}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedNavLink to="/" exact="true">Home</AnimatedNavLink>
      <AnimatedNavLink to="/work">Work</AnimatedNavLink>
      <AnimatedNavLink to="/about">About</AnimatedNavLink>
      <AnimatedNavLink to="/contact">Contact</AnimatedNavLink>
    </motion.nav>
  );
}

function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section 
      style={containerStyle}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
    >
      <h1 style={headingStyle}>Ashutosh Kumar</h1>
      <p style={subHeadingStyle}>
        Web Developer | Computer Science Student at NIET
      </p>
      <motion.button
        style={buttonStyle}
        onClick={() => {
          window.location.href = '#work';
        }}
        aria-label="View Projects"
        whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(0, 255, 149, 0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        See My Work
      </motion.button>
    </motion.section>
  );
}

function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section 
      style={containerStyle} 
      id="work"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      transition={{ duration: 0.6 }}
    >
      <h1 style={headingStyle}>My Projects</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: '#1a1a1a',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 3px 6px rgba(0,255,149,0.3), 0 3px 10px rgba(0,255,149,0.2)',
                color: '#f1f1f1',
                textDecoration: 'none',
                transition: 'transform 0.3s ease',
                ...glassCard
              }}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                loading="lazy"
                whileHover={{ scale: 1.05 }}
              />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{project.title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#ccc' }}>
                  {project.description}
                </p>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section 
      style={containerStyle}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.6 }}
    >
      <h1 style={headingStyle}>About Me</h1>
      <div style={{ ...glassCard, padding: '2rem', borderRadius: '15px' }}>
        <p style={{ maxWidth: '700px', marginBottom: '1.5rem' }}>
          I'm Ashutosh Kumar, a Computer Science student at Noida Institute of Engineering and Technology (NIET), 
          with a strong passion for web development and software engineering. I enjoy building real-world projects 
          and exploring both frontend and backend technologies.
        </p>
        <p style={{ maxWidth: '700px' }}>
          Skilled in JavaScript, React, CSS animations, and backend integration,
          I strive to produce clean, efficient code while pushing creative
          boundaries. When not coding, I enjoy photography and exploring latest
          design trends.
        </p>
      </div>
    </motion.section>
  );
}

function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = React.useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Thank you for reaching out! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <motion.section 
      style={containerStyle}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.6 }}
    >
      <h1 style={headingStyle}>Contact Me</h1>
      <motion.form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          ...glassCard,
          padding: '2rem',
          borderRadius: '15px'
        }}
        aria-label="Contact form"
        whileHover={{ scale: 1.01 }}
      >
        <motion.input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            padding: '0.8rem 1rem',
            borderRadius: '6px',
            border: '1px solid #444',
            backgroundColor: '#222',
            color: '#eee',
            fontSize: '1rem',
          }}
          whileFocus={{ borderColor: '#00ff95' }}
        />
        <motion.input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: '0.8rem 1rem',
            borderRadius: '6px',
            border: '1px solid #444',
            backgroundColor: '#222',
            color: '#eee',
            fontSize: '1rem',
          }}
          whileFocus={{ borderColor: '#00ff95' }}
        />
        <motion.textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          style={{
            padding: '0.8rem 1rem',
            borderRadius: '6px',
            border: '1px solid #444',
            backgroundColor: '#222',
            color: '#eee',
            fontSize: '1rem',
            resize: 'vertical',
          }}
          whileFocus={{ borderColor: '#00ff95' }}
        ></motion.textarea>
        <motion.button 
          type="submit" 
          style={buttonStyle}
          whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(0, 255, 149, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
        {status && (
          <motion.p
            style={{
              marginTop: '1rem',
              color: '#00ff95',
              fontWeight: '600',
            }}
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {status}
          </motion.p>
        )}
      </motion.form>
    </motion.section>
  );
}

function Footer() {
  return (
    <motion.footer 
      style={footerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      &copy; {new Date().getFullYear()} Ashutosh Kumar. Built with React.
    </motion.footer>
  );
}

export default function App() {
  return (
    <Router>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#121212',
          color: '#f1f1f1',
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}