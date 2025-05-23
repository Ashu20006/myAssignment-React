import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';

// Glassmorphism effect styles
const glassCard = {
  background: 'rgba(18, 18, 18, 0.5)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(0, 255, 149, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(0, 255, 149, 0.15)',
  borderRadius: '16px'
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  padding: '1.5rem',
  backgroundColor: 'rgba(18, 18, 18, 0.9)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(0, 255, 149, 0.1)'
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
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 2rem',
  fontFamily: "'Inter', sans-serif",
  color: '#f1f1f1',
  lineHeight: '1.6',
};

const headingStyle = {
  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
  marginBottom: '1.5rem',
  fontWeight: '800',
  background: 'linear-gradient(90deg, #00ff95, #00ccff)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  lineHeight: '1.2'
};

const subHeadingStyle = {
  fontSize: 'clamp(1rem, 3vw, 1.4rem)',
  marginBottom: '3rem',
  color: '#8fc1a9',
  maxWidth: '700px'
};

const buttonStyle = {
  backgroundColor: '#00ff95',
  color: '#121212',
  border: 'none',
  padding: '1rem 2rem',
  fontSize: '1.1rem',
  fontWeight: '700',
  borderRadius: '50px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 20px rgba(0, 255, 149, 0.4)',
  display: 'inline-block'
};

const projects = [
  {
    title: 'Creative Portfolio',
    description: 'A modern portfolio with smooth animations and 3D effects.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    tags: ['React', 'Framer Motion', 'GSAP'],
    link: '#'
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-featured online store with cart and payment integration.',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62',
    tags: ['Node.js', 'MongoDB', 'Stripe'],
    link: '#'
  },
  {
    title: 'Blog CMS',
    description: 'Content management system with markdown support and SEO optimization.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15',
    tags: ['Next.js', 'GraphQL', 'Tailwind'],
    link: '#'
  },
  {
    title: 'Task Manager',
    description: 'Productivity app with drag-n-drop interface and team collaboration.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
    tags: ['React', 'Firebase', 'DnD'],
    link: '#'
  },
  {
    title: 'Weather App',
    description: 'Real-time weather forecasts with animated weather representations.',
    image: 'https://images.unsplash.com/photo-1560258018-c7db7645254e',
    tags: ['API', 'JavaScript', 'CSS'],
    link: '#'
  },
  {
    title: 'Social Dashboard',
    description: 'Analytics dashboard for social media metrics and insights.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    tags: ['D3.js', 'Express', 'JWT'],
    link: '#'
  }
];

const skills = [
  { name: 'JavaScript', level: 90, color: '#f0db4f' },
  { name: 'React', level: 85, color: '#61dbfb' },
  { name: 'Node.js', level: 80, color: '#68a063' },
  { name: 'CSS/SCSS', level: 95, color: '#2965f1' },
  { name: 'Java', level: 75, color: '#3776ab' },
  { name: 'SQL', level: 70, color: '#4db33d' }
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
      transition={{ duration: 0.5, type: 'spring' }}
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <section 
      ref={ref}
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden', // Prevent scrolling
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      {/* Parallax Background */}
      <motion.div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1620712943543-bcc4688e7485)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          y: yBg
        }}
      />
      
      {/* Content with parallax effect */}
      <motion.div 
        style={{
          ...containerStyle,
          position: 'relative',
          zIndex: 1,
          y: yText
        }}
      >
        <motion.h1 
          style={headingStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ashutosh Kumar
        </motion.h1>
        <motion.p 
          style={subHeadingStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Web Developer | CSE Student at NIET | Creating digital experiences that matter
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            style={buttonStyle}
            onClick={() => {
              document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="View Projects"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 6px 25px rgba(0, 255, 149, 0.5)',
              backgroundColor: '#00e68a'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section 
      style={{ 
        ...containerStyle, 
        padding: '6rem 2rem',
        position: 'relative',
        overflow: 'hidden' // Add this to prevent horizontal scrolling
      }} 
      id="work"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 }, // Changed from x to y for vertical animation
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative elements - fixed positioning */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,149,0.15) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
          pointerEvents: 'none' // Add this to prevent interaction
        }}
        animate={{
          opacity: [0.8, 0.5, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        style={{
          position: 'absolute',
          bottom: '50px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,204,255,0.1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
          pointerEvents: 'none' // Add this to prevent interaction
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <h1 style={headingStyle}>My Projects</h1>
      <p style={subHeadingStyle}>
        A collection of my recent work. Each project was an opportunity to learn and grow.
      </p>
      
      {/* Bento Grid Layout - fixed width */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
          width: '100%' // Ensure it doesn't exceed container
        }}
      >
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            style={{
              ...glassCard,
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
              gridRow: idx === 0 || idx === 3 ? 'span 2' : 'span 1'
            }}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                color: '#f1f1f1',
                textDecoration: 'none',
                height: '100%'
              }}
            >
              <motion.div
                style={{
                  width: '100%',
                  height: idx === 0 || idx === 3 ? '400px' : '200px',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                  }}
                >
                  <h3 style={{ 
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.4rem',
                    fontWeight: '600'
                  }}>
                    {project.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i}
                        style={{
                          backgroundColor: 'rgba(0, 255, 149, 0.2)',
                          color: '#00ff95',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
              <div style={{ padding: '1.5rem' }}>
                <p style={{ 
                  fontSize: '1rem',
                  color: '#ccc',
                  margin: 0
                }}>
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
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section 
      style={{
        ...containerStyle,
        padding: '6rem 2rem',
        position: 'relative'
      }}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Water text effect background */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(10rem, 20vw, 20rem)',
          fontWeight: '900',
          color: 'rgba(0, 255, 149, 0.03)',
          zIndex: -1,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}
        animate={{
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ABOUT
      </motion.div>

      <h1 style={headingStyle}>About Me</h1>
      <p style={subHeadingStyle}>
        Get to know more about my skills, experience, and what drives me
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <motion.button
          style={{
            padding: '0.8rem 1.5rem',
            borderRadius: '50px',
            border: 'none',
            background: activeTab === 'skills' ? '#00ff95' : 'rgba(255,255,255,0.1)',
            color: activeTab === 'skills' ? '#121212' : '#f1f1f1',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => setActiveTab('skills')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skills
        </motion.button>
        <motion.button
          style={{
            padding: '0.8rem 1.5rem',
            borderRadius: '50px',
            border: 'none',
            background: activeTab === 'experience' ? '#00ff95' : 'rgba(255,255,255,0.1)',
            color: activeTab === 'experience' ? '#121212' : '#f1f1f1',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => setActiveTab('experience')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Experience
        </motion.button>
      </div>

      {activeTab === 'skills' && (
        <motion.div
          style={{
            ...glassCard,
            padding: '2rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 style={{ marginTop: 0, fontSize: '1.5rem' }}>My Skills</h3>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {skills.map((skill, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '10px', 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    style={{
                      height: '100%',
                      background: skill.color,
                      borderRadius: '5px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'experience' && (
        <motion.div
          style={{
            ...glassCard,
            padding: '2rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 style={{ marginTop: 0, fontSize: '1.5rem' }}>My Journey</h3>
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div>
              <h4 style={{ 
                margin: '0 0 0.5rem 0',
                color: '#00ff95',
                fontSize: '1.2rem'
              }}>
                Computer Science Student at NIET
              </h4>
              <p style={{ margin: '0.3rem 0', color: '#8fc1a9' }}>2023 - Present</p>
              <p style={{ margin: '0.5rem 0 0 0' }}>
                Currently pursuing my degree with focus on web development, algorithms, and software engineering principles.
              </p>
            </div>
            <div>
              <h4 style={{ 
                margin: '0 0 0.5rem 0',
                color: '#00ff95',
                fontSize: '1.2rem'
              }}>
                Freelance Web Developer
              </h4>
              <p style={{ margin: '0.3rem 0', color: '#8fc1a9' }}>2022 - Present</p>
              <p style={{ margin: '0.5rem 0 0 0' }}>
                Building websites and web applications for clients, focusing on responsive design and user experience.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
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
      style={{
        ...containerStyle,
        padding: '6rem 2rem',
        position: 'relative'
      }}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Magic lines decoration */}
      <motion.div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden'
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              right: `${i * 40}px`,
              top: 0,
              width: '1px',
              height: '100%',
              backgroundColor: 'rgba(0, 255, 149, 0.1)'
            }}
            animate={{
              height: ['0%', '100%', '0%'],
              top: ['100%', '0%', '0%']
            }}
            transition={{
              duration: 2 + i,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 5
            }}
          />
        ))}
      </motion.div>

      <h1 style={headingStyle}>Get In Touch</h1>
      <p style={subHeadingStyle}>
        Have a project in mind or want to collaborate? Feel free to reach out!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        <motion.form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            ...glassCard,
            padding: '2.5rem'
          }}
          aria-label="Contact form"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name" style={{ fontWeight: '500' }}>Your Name</label>
            <motion.input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#f1f1f1',
                fontSize: '1rem',
                outline: 'none'
              }}
              whileFocus={{ 
                borderColor: '#00ff95',
                backgroundColor: 'rgba(0, 255, 149, 0.05)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email" style={{ fontWeight: '500' }}>Your Email</label>
            <motion.input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#f1f1f1',
                fontSize: '1rem',
                outline: 'none'
              }}
              whileFocus={{ 
                borderColor: '#00ff95',
                backgroundColor: 'rgba(0, 255, 149, 0.05)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="message" style={{ fontWeight: '500' }}>Your Message</label>
            <motion.textarea
              id="message"
              name="message"
              placeholder="Hello Ashutosh, I'd like to talk about..."
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#f1f1f1',
                fontSize: '1rem',
                resize: 'vertical',
                outline: 'none',
                minHeight: '150px'
              }}
              whileFocus={{ 
                borderColor: '#00ff95',
                backgroundColor: 'rgba(0, 255, 149, 0.05)'
              }}
            />
          </div>

          <motion.button 
            type="submit" 
            style={buttonStyle}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 6px 25px rgba(0, 255, 149, 0.5)',
              backgroundColor: '#00e68a'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>

          {status && (
            <motion.p
              style={{
                margin: 0,
                color: '#00ff95',
                fontWeight: '600',
                textAlign: 'center'
              }}
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {status}
            </motion.p>
          )}
        </motion.form>

        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            ...glassCard,
            padding: '2.5rem'
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <h3 style={{ 
              marginTop: 0,
              color: '#00ff95',
              fontSize: '1.3rem',
              marginBottom: '1rem'
            }}>
              Contact Information
            </h3>
            <p style={{ margin: '0.5rem 0' }}>
              <span style={{ color: '#8fc1a9' }}>Email:</span> ag8449362@gmail.com
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <span style={{ color: '#8fc1a9' }}>Phone:</span> +91 8009110068
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <span style={{ color: '#8fc1a9' }}>Location:</span> Greater Noida, India
            </p>
          </div>

          <div>
            <h3 style={{ 
              color: '#00ff95',
              fontSize: '1.3rem',
              marginBottom: '1rem'
            }}>
              Connect With Me
            </h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['GitHub', 'LinkedIn', 'Telegram', 'Instagram'].map((platform, i) => (
                <motion.a
                  key={i}
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#f1f1f1',
                    textDecoration: 'none'
                  }}
                  whileHover={{ 
                    backgroundColor: '#00ff95',
                    color: '#121212',
                    scale: 1.1
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={platform}
                >
                  <span style={{ fontSize: '1.2rem' }}>{platform[0]}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            style={{
              marginTop: 'auto',
              padding: '1.5rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 255, 149, 0.1)',
              border: '1px dashed rgba(0, 255, 149, 0.3)',
              textAlign: 'center'
            }}
            whileHover={{ scale: 1.02 }}
          >
            <p style={{ margin: 0 }}>
              Currently available for freelance work and collaborations
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <motion.footer 
      style={{
        textAlign: 'center',
        padding: '2rem 2rem',
        backgroundColor: 'rgba(18, 18, 18, 0.9)',
        color: '#666',
        fontSize: '0.9rem',
        borderTop: '1px solid rgba(0, 255, 149, 0.1)',
        backdropFilter: 'blur(10px)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <p style={{ margin: 0 }}>
        &copy; {new Date().getFullYear()} Ashutosh Kumar. All rights reserved.
      </p>
    
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