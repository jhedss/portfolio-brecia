import React from 'react'
import Header from './components/Header'
import ProjectCard from './components/ProjectCard'
import projects from './data/projects'

export default function App() {
  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="hero">
          <h1>Hi — I’m Mark Jhed Brecia</h1>
          <p className="lead">A passionate developer dedicated to building clean, modern, and responsive web experiences.</p>
        </section>

        <section className="projects">
          <h2>Projects</h2>
          <div className="grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <section className="contact">
          <h2>Contact</h2>
          <p>
            Want to collaborate or connect?  
            <a href="mailto:markjhedbrecia@example.com">markjhedbrecia@example.com</a>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <small>© {new Date().getFullYear()} Mark Jhed Brecia — Built with React + Vite</small>
      </footer>
    </div>
  )
}
