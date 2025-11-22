import React, { useEffect, useState } from 'react'
import './styles.css'

export default function App() {
  const [theme, setTheme] = useState('light')
  const [navOpen, setNavOpen] = useState(false)
  const [loaderHidden, setLoaderHidden] = useState(false)

  useEffect(() => {
    // Loader hide after load or min delay
    function onLoad() {
      setTimeout(() => setLoaderHidden(true), 800)
    }
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    // Theme setup
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
  }, [])

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    // Footer year
    const yearSpan = document.getElementById('year')
    if (yearSpan) yearSpan.textContent = new Date().getFullYear()
  }, [])

  function toggleMenu() {
    setNavOpen((s) => !s)
  }

  function handleContactSubmit(e) {
    e.preventDefault()
    const form = e.target
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const message = form.message.value.trim()
    const status = document.getElementById('form-status')
    if (!name || !email || !message) {
      if (status) { status.textContent = 'Please fill in all fields.'; status.style.color = '#e63946' }
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (status) { status.textContent = 'Please enter a valid email.'; status.style.color = '#e63946' }
      return
    }
    const btn = form.querySelector('button[type="submit"]')
    if (btn) btn.disabled = true
    if (status) { status.textContent = 'Sending...'; status.style.color = 'var(--accent-color)' }
    setTimeout(() => {
      if (status) { status.textContent = 'Thanks! Your message has been sent.'; status.style.color = 'var(--accent-color)' }
      form.reset()
      if (btn) btn.disabled = false
    }, 1000)
  }

  return (
    <div className="app">
      {/* Loader */}
      <div id="loader" className={loaderHidden ? 'hidden' : ''} aria-hidden={loaderHidden}>
        <div className="spinner" />
        <p className="loader-text">Loading...</p>
      </div>

      {/* Header / Nav */}
      <header className="site-header">
        <div className="container nav-container">
          <a href="#home" className="logo">MyPortfolio</a>
          <nav id="main-nav" className={`nav ${navOpen ? 'open' : ''}`} aria-label="Primary">
            <ul className="nav-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <div className="actions">
            <button id="theme-toggle" className="theme-toggle" aria-label="Toggle dark mode" aria-pressed={theme === 'dark'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              <span className="icon-sun" aria-hidden>☀️</span>
              <span className="icon-moon" aria-hidden>🌙</span>
            </button>
            <button id="menu-toggle" className={`menu-toggle ${navOpen ? 'active' : ''}`} aria-label="Toggle menu" aria-controls="main-nav" aria-expanded={navOpen} onClick={toggleMenu}>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>
      </header>

	   <main id="home">
        {/* Hero Section */}
        <section className="section hero">
          <div className="container hero-inner">
            <div className="hero-text">
              <h1>Hi, I'm Jhedoo</h1>
              <p className="tagline">Front-end developer who loves clean design.</p>
              <div className="hero-actions">
                <a className="btn primary" href="#projects">View Projects</a>
                <a className="btn outline" href="#contact">Hire Me</a>
              </div>
            </div>
            <div className="hero-image" aria-hidden="true">
              <img src="/jhedoo.png" alt="Profile photo" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about">
          <div className="container about-inner">
            <div className="about-photo">
              <img src="/jhedoo.png" alt="Profile photo" />
            </div>
            <div className="about-text">
              <h2>About Me</h2>
              <p>I'm a beginner-friendly developer who enjoys building simple and responsive websites. I focus on accessibility, performance, and modern UI with a clean look.</p>
              <p>When I'm not coding, I like learning new tools and improving my design sense.</p>
            </div>
          </div>
        </section>


        {/* Projects */}
        <section id="projects" className="section projects">
          <div className="container">
            <h2>Projects</h2>
            <div className="projects-grid">
              <article className="card">
                <img src="/prof.jpg" alt="Project screenshot" />
                <div className="card-content">
                  <h3>Project One</h3>
                  <p>A simple landing page with smooth scroll and responsive layout.</p>
                  <div className="tags"><span>HTML</span><span>CSS</span><span>JS</span></div>
                  <div className="card-actions"><a className="btn small outline" href="#" target="_blank" rel="noopener">GitHub</a></div>
                </div>
              </article>
              <article className="card">
                <img src="https://via.placeholder.com/640x360" alt="Project screenshot" />
                <div className="card-content">
                  <h3>Project Two</h3>
                  <p>A portfolio gallery with filterable categories and lightbox.</p>
                  <div className="tags"><span>HTML</span><span>CSS</span><span>JS</span></div>
                  <div className="card-actions"><a className="btn small outline" href="#" target="_blank" rel="noopener">GitHub</a></div>
                </div>
              </article>
              <article className="card">
                <img src="https://via.placeholder.com/640x360" alt="Project screenshot" />
                <div className="card-content">
                  <h3>Project Three</h3>
                  <p>A simple to-do app with local storage and dark mode.</p>
                  <div className="tags"><span>HTML</span><span>CSS</span><span>JS</span></div>
                  <div className="card-actions"><a className="btn small outline" href="#" target="_blank" rel="noopener">GitHub</a></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section skills">
          <div className="container">
            <h2>Skills</h2>
            <div className="skills-grid">
              <div className="skill"><span>HTML</span><div className="bar"><div className="fill" style={{ '--level': '90%' }} /></div></div>
              <div className="skill"><span>CSS</span><div className="bar"><div className="fill" style={{ '--level': '85%' }} /></div></div>
              <div className="skill"><span>JavaScript</span><div className="bar"><div className="fill" style={{ '--level': '75%' }} /></div></div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section contact">
          <div className="container contact-inner">
            <h2>Contact Me</h2>
            <form id="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="form-row"><label htmlFor="name">Name</label><input type="text" id="name" name="name" required /></div>
              <div className="form-row"><label htmlFor="email">Email</label><input type="email" id="email" name="email" required /></div>
              <div className="form-row"><label htmlFor="message">Message</label><textarea id="message" name="message" rows="4" required /></div>
              <button type="submit" className="btn primary">Send Message</button>
              <p id="form-status" role="status" aria-live="polite" />
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© <span id="year"></span> MyPortfolio</p>
          <div className="socials">
            <a href="https://www.instagram.com/hottdogzzz1/" aria-label="Instagram">📸</a>
            <a href="https://github.com/jhedss" aria-label="GitHub">🐙</a>
            <a href="https://www.facebook.com/markjhed.bricia" aria-label="Facebook">📘</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
