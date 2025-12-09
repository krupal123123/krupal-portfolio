import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, Phone, ArrowUp, Menu, X } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  live: string;
  code: string;
  category: string;
  snippet: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'School Attendance System',
    description:
      'Full‑stack web app to manage student attendance with role‑based access for students, parents, and teachers.',
    tech: ['React', 'Node.js', 'MongoDB'],
    image:
      'https://images.unsplash.com/photo-1524178232363-9330dd6d150d?w=800&h=250&fit=crop',
    live: 'https://your-school-app.netlify.app', // TODO: replace with real URL
    code: 'https://github.com/youruser/school-app', // TODO: replace with real repo
    category: 'fullstack',
    snippet: `
const markAttendance = async (studentId: string, status: 'present' | 'absent') => {
  await api.post('/attendance', {
    studentId,
    status,
    date: new Date().toISOString()
  });
};
    `.trim(),
  },
  {
    id: 2,
    title: 'Grocery E‑commerce Platform',
    description:
      'Online grocery platform for local stores with inventory management, order tracking, and payment integration.',
    tech: ['React', 'Express', 'Stripe'],
    image:
      'https://images.unsplash.com/photo-1571877221981-f1fc14d758f7?w=800&h=250&fit=crop',
    live: 'https://your-grocery-app.vercel.app', // TODO: replace with real URL
    code: 'https://github.com/youruser/grocery-app', // TODO: replace with real repo
    category: 'fullstack',
    snippet: `
app.post('/api/orders', async (req, res) => {
  const { items, customer } = req.body;
  const total = calculateTotal(items);
  const order = await Order.create({ items, customer, total, status: 'PENDING' });
  res.json(order);
});
    `.trim(),
  },
  {
    id: 3,
    title: 'Advanced Portfolio v2.0',
    description:
      'Personal portfolio with custom cursor, scroll animations, and responsive UI built using React, GSAP, and Framer Motion.',
    tech: ['React', 'TypeScript', 'GSAP', 'Framer Motion'],
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=250&fit=crop',
    live: '#',
    code: '#',
    category: 'frontend',
    snippet: `
const PortfolioHero = () => (
  <motion.h1
    className="hero-title"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    Hi, I'm <span className="gradient-text">Krupal Battula</span>
  </motion.h1>
);
    `.trim(),
  },
];

const App: React.FC = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'fullstack' | 'frontend'>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnProject, setIsOnProject] = useState(false);

  // Custom Mouse Cursor
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      );

      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  // Filter Projects
  const filterProjects = useCallback((category: 'all' | 'fullstack' | 'frontend') => {
    setActiveFilter(category);
    const filtered =
      category === 'all' ? projects : projects.filter((p) => p.category === category);
    setFilteredProjects(filtered);
  }, []);

  // Scroll Top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Custom Cursor */}
      <motion.div
        className={`custom-cursor ${hovered ? 'hovered' : ''}`}
        animate={{
          x: cursor.x - 12,
          y: cursor.y - 12,
          scale: hovered ? (isOnProject ? 1.5 : 2.2) : 1,
          background: hovered
            ? 'rgba(251, 191, 36, 0.9)'
            : 'rgba(251, 191, 36, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <motion.div className="logo" whileHover={{ scale: 1.1 }}>
            <span className="logo-gradient">Krupal Battula</span>
          </motion.div>

          <ul className="nav-menu">
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <li key={item}>
                <a href={`#${item}`} className="nav-link">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <motion.div
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-content">
          <motion.h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Krupal Battula</span>
          </motion.h1>
          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Fresher Software Developer | AI & Full‑Stack
          </motion.h2>
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Fresher software engineer skilled in AI, machine learning, Python,
            modern frontend, SQL databases, and Java backend development. Completed a
            1‑year internship as an SDE at VMAX Software Sol India Pvt Ltd, building
            real‑world applications and scalable web solutions.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a href="#projects" className="btn btn-primary large">
              View My Projects
            </a>
            <a href="#contact" className="btn btn-secondary large">
              Contact Me
            </a>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <div className="about-grid">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p>
                Fresher full‑stack and AI‑focused developer based in India. Passionate
                about building clean, scalable web applications and intelligent systems
                that solve real problems.
              </p>
              <p>
                Completed a 1‑year internship as a Software Development Engineer at
                VMAX Software Sol India Pvt Ltd, gaining hands‑on experience in
                end‑to‑end feature development, debugging, and performance
                optimization.
              </p>
              <p>
                <strong>Skills:</strong> AI, Machine Learning, Python, Java, React,
                TypeScript, HTML/CSS, REST APIs, SQL databases, basic NoSQL, and
                backend development.
              </p>
            </motion.div>
            <motion.div
              className="skills-grid"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {[
                'AI & ML',
                'Python',
                'Java (Backend)',
                'React & TypeScript',
                'HTML / CSS',
                'SQL Databases',
                'REST APIs',
                'Git & GitHub',
              ].map((skill, i) => (
                <motion.div
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="filter-buttons">
            {['all', 'fullstack', 'frontend'].map((filter) => (
              <motion.button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() =>
                  filterProjects(filter as 'all' | 'fullstack' | 'frontend')
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === 'all'
                  ? 'All Projects'
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>

          <div className="projects-grid">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -20, scale: 1.02 }}
                  onHoverStart={() => {
                    setHovered(true);
                    setIsOnProject(true);
                  }}
                  onHoverEnd={() => {
                    setHovered(false);
                    setIsOnProject(false);
                  }}
                >
                  <div className="project-image">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="project-overlay">
                      <div className="project-links">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          Live Demo
                        </a>
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                        >
                          View Code
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    {project.snippet && (
                      <div className="code-snippet">
                        <SyntaxHighlighter
                          language="typescript"
                          style={oneDark}
                          showLineNumbers
                          customStyle={{
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            maxHeight: '220px',
                            marginTop: '1rem',
                          }}
                        >
                          {project.snippet}
                        </SyntaxHighlighter>
                      </div>
                    )}

                    <div className="project-tech">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p>
              Open to full‑time roles and internships in software development, AI, and
              full‑stack web development. Feel free to reach out for collaboration or
              opportunities.
            </p>
            <div className="social-links">
              <a
                href="https://github.com/krupal123123"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Github size={24} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/krupal-battula-55488a254"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Linkedin size={24} /> LinkedIn
              </a>
              <a
                href="mailto:bathulakrupal@gmail.com"
                className="social-link"
              >
                <Mail size={24} /> Email
              </a>
              <a href="tel:+91-your-number" className="social-link">
                <Phone size={24} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
