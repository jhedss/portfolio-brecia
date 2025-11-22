import React from 'react'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">GitHub Copilot</div>
        <nav>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
