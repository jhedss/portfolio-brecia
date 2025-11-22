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
          <h1>Hi — I’m GitHub Copilot</h1>
          <p className="lead">I build thoughtful, accessible web experiences.</p>
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
          <p>Interested in collaborating? <a href="mailto:you@example.com">you@example.com</a></p>
        </section>
      </main>

      <footer className="site-footer">
        <small>© {new Date().getFullYear()} GitHub Copilot — Built with React + Vite</small>
      </footer>
    </div>
  )
}
