import React from 'react'

export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <h3>{project.title}</h3>
      <p className="desc">{project.description}</p>
      <div className="tags">
        {project.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
      <div className="card-actions">
        <a href={project.url} target="_blank" rel="noreferrer">View</a>
      </div>
    </article>
  )
}
